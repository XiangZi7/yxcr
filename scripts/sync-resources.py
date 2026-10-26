"""Build a metadata-only index from public sitemaps, links and table-of-contents.

Run: python -X utf8 scripts/sync-resources.py
Requires: beautifulsoup4 (pip install beautifulsoup4).
Original article bodies, authentication and member-only content are not imported.
"""

from __future__ import annotations

import hashlib
import html
import json
import re
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, unquote, urljoin, urlsplit, urlunsplit

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".tmp-resources"
CONFIG = json.loads((ROOT / "content/resources/sources.json").read_text(encoding="utf-8"))
SOURCES = {source["id"]: source for source in CONFIG["sources"]}
COLLECTIONS = CONFIG["collections"]
BASE = SOURCES["poetries"]["url"]
CACHE.mkdir(exist_ok=True)


def fetch(url: str, alias: str | None = None) -> str:
    name = alias or hashlib.sha256(url.encode()).hexdigest()[:20] + ".html"
    target = CACHE / name
    if target.exists():
        return target.read_text(encoding="utf-8")
    parsed = urlsplit(url)
    safe = urlunsplit((parsed.scheme, parsed.netloc, quote(unquote(parsed.path), safe="/:-_.,()"), parsed.query, ""))
    request = urllib.request.Request(safe, headers={"User-Agent": "YXCR-OS-Resource-Index/1.0 (+https://yxcr.top)"})
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
    target.write_text(body, encoding="utf-8")
    time.sleep(0.25)
    return body


def clean_title(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"^[#\s\u200b]+|[\s\u200b]+$", "", value)
    value = re.sub(r"^\d+[.、\-\s]+", "", value)
    return re.sub(r"\s+", " ", value).strip()


def canonical_url(value: str) -> str:
    parsed = urlsplit(unquote(value))
    path = parsed.path.removesuffix(".html")
    return urlunsplit((parsed.scheme, parsed.netloc, quote(path, safe="/:-_.,()"), "", quote(parsed.fragment, safe="-_.,()")))


def collection_for(url: str) -> dict | None:
    path = unquote(urlsplit(url).path)
    candidates = [(len(prefix), collection) for collection in COLLECTIONS if collection["source"] == "poetries" for prefix in collection["prefixes"] if path.startswith(prefix)]
    return max(candidates, key=lambda item: item[0])[1] if candidates else None


items: dict[str, dict] = {}


def add(title: str, url: str, collection: dict, section: str = "", kind: str = "document", featured: bool = False) -> None:
    title = clean_title(title)
    if not title or len(title) < 2:
        return
    url = canonical_url(url)
    if urlsplit(url).scheme != "https":
        return
    item_id = "res-" + hashlib.sha256(url.encode()).hexdigest()[:16]
    existing = items.get(item_id)
    item = {"id": item_id, "title": title, "url": url, "source": collection["source"], "collection": collection["id"], "section": clean_title(section) or collection["title"], "kind": kind}
    if featured:
        item["featured"] = True
    # More precise table-of-contents labels replace filename-derived labels.
    if existing and existing.get("featured"):
        item["featured"] = True
    items[item_id] = item


def headings_from_rsc(soup: BeautifulSoup) -> list[dict]:
    """Read only public heading metadata, never article HTML or answer payloads."""
    headings: dict[str, dict] = {}

    def walk(value):
        if isinstance(value, dict):
            if isinstance(value.get("level"), int) and isinstance(value.get("title"), str) and str(value.get("link", "")).startswith("#"):
                headings[value["link"]] = {key: value[key] for key in ("level", "title", "link")}
            for key, child in value.items():
                if key not in ("html", "content", "markdown", "rawContent"):
                    walk(child)
        elif isinstance(value, list):
            for child in value:
                walk(child)

    for script in soup.find_all("script"):
        text = script.get_text()
        if not text.startswith("self.__next_f.push("):
            continue
        try:
            frame = json.loads(text[text.index("(") + 1:text.rfind(")")])
            if len(frame) < 2 or not isinstance(frame[1], str):
                continue
            for line in frame[1].splitlines():
                payload = line.partition(":")[2]
                if payload.startswith(("[", "{")):
                    try:
                        walk(json.loads(payload))
                    except json.JSONDecodeError:
                        pass
        except (ValueError, IndexError):
            continue
    return list(headings.values())


def parse_collection(collection: dict) -> tuple[dict, BeautifulSoup]:
    source = SOURCES[collection["source"]]
    origin = urlsplit(source["url"])
    origin_url = f"{origin.scheme}://{origin.netloc}"
    url = urljoin(origin_url, collection["path"])
    aliases = {"base": "base.html", "ai": "ai.html", "weapp": "weapp.html", "network-interview": "bingkele.html", "ai-future": "aifuture.html"}
    return collection, BeautifulSoup(fetch(url, aliases.get(collection["id"])), "html.parser")


def main() -> None:
    aliases = {"coreInterviewArticles": "core.xml", "interviewArticles": "articles.xml", "flashcardNodes": "flashcards.xml", "algorithmProblems": "algorithm.xml"}
    for name, alias in aliases.items():
        xml = ET.fromstring(fetch(f"{BASE}/api/{name}.xml", alias))
        for location in xml.iter():
            if not location.tag.endswith("}loc") or not location.text:
                continue
            url = location.text
            collection = collection_for(url)
            if not collection:
                continue
            path = unquote(urlsplit(url).path)
            filename = path.rstrip("/").split("/")[-1]
            # Opaque question IDs do not make useful or verifiable resource titles.
            if re.fullmatch(r"[a-f0-9]{20,}", filename):
                continue
            title = filename.replace("-", " ").removesuffix(".html")
            section = path.rstrip("/").split("/")[-2] if path.count("/") > 3 else collection["title"]
            add(title, url, collection, section)

    # One landing per category guarantees every requested menu remains reachable.
    for collection in COLLECTIONS:
        source = SOURCES[collection["source"]]
        add(collection["title"], urljoin(source["url"], collection["path"]), collection, collection["title"], "collection")

    with ThreadPoolExecutor(max_workers=3) as executor:
        for collection, soup in executor.map(parse_collection, COLLECTIONS):
            source = SOURCES[collection["source"]]
            url = urljoin(source["url"], collection["path"])
            if collection["source"] == "poetries":
                headings = headings_from_rsc(soup)
                section = collection["title"]
                for heading in headings:
                    if heading["level"] == 2:
                        section = clean_title(heading["title"])
                    if heading["level"] in (2, 3):
                        add(heading["title"], url + heading["link"], collection, section, "knowledge")
                # Public document links refine the labels of sibling sitemap entries.
                for anchor in soup.select("aside.sidebar a[href]"):
                    href = anchor["href"]
                    if not href.startswith("/docs/"):
                        continue
                    target = urljoin(BASE, href)
                    target_collection = collection_for(target)
                    if target_collection and target_collection["id"] == collection["id"]:
                        add(anchor.get_text(" ", strip=True), target, target_collection)
            elif collection["source"] == "bingkele":
                for heading in soup.select(".vp-doc h2[id], .vp-doc h3[id]"):
                    add(heading.get_text(" ", strip=True), url + "#" + heading["id"], collection, "计算机网络", "knowledge")
            else:
                for anchor in soup.select("a[href]"):
                    href = anchor["href"]
                    if "/column/AIFuture/" not in href:
                        continue
                    path = unquote(urlsplit(href).path)
                    if path.rstrip("/").endswith("/index"):
                        continue
                    parts = path.split("/")
                    section = parts[3] if len(parts) > 4 else collection["title"]
                    add(anchor.get_text(" ", strip=True), urljoin("https://gouxinjie.github.io", href), collection, section)
            print(f"Indexed {collection['title']}", flush=True)

    ai = next(collection for collection in COLLECTIONS if collection["id"] == "ai")
    add("从提示工程到 Graph 工程：Agent Harness 工程", BASE + "/blog/ai-agent-harness-engineering#从提示工程到-graph-工程-工程师的手能伸多远", ai, "Agent 工程实践", "knowledge", True)
    add("AI Agent 系统学习指南：Harness 工程、上下文与评估", BASE + "/blog/ai-agent-harness-engineering", ai, "Agent 工程实践", "document", True)
    snapshot = sorted(items.values(), key=lambda item: (not item.get("featured", False), next(index for index, collection in enumerate(COLLECTIONS) if collection["id"] == item["collection"]), item["title"]))
    summary = {"syncedAt": datetime.now(timezone.utc).isoformat(), "total": len(snapshot), "collections": {collection["id"]: sum(item["collection"] == collection["id"] for item in snapshot) for collection in COLLECTIONS}, "sources": {source: sum(item["source"] == source for item in snapshot) for source in SOURCES}}
    output = ROOT / "lib/resources"
    output.mkdir(parents=True, exist_ok=True)
    (output / "directory-index.json").write_text(json.dumps(snapshot, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    (output / "directory-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
