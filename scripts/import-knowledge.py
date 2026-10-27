"""Import licensed Markdown into local knowledge pages; never scrape gated bodies.

Run with Python 3.11+. Upstream blob hashes are verified before importing.
Source/license records are kept separately from the reading interface.
"""
from __future__ import annotations

import base64
import concurrent.futures
import hashlib
import html
import json
import posixpath
import re
import time
import urllib.parse
import urllib.request
import unicodedata
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / '.tmp-resources' / 'markdown'
DEST = ROOT / 'content' / 'knowledge'
CACHE.mkdir(parents=True, exist_ok=True)
DEST.mkdir(parents=True, exist_ok=True)

SOURCES = [
    ('aifuture', 'gouxinjie/gouxinjie.github.io', 'Apache-2.0'),
    ('bingkele', 'hcer1999/vitepress_blog', 'MIT'),
]
GROUPS = {
    'Vue', 'JS', 'React', 'Network', '前端进阶', 'AIFuture', 'TS',
    'Node', 'Python', 'Linux', '数据库', 'Docker', 'CommonSense', 'Git', 'Nginx',
    'Angular', 'Next', 'Aliyun', 'ProblemNotes', 'Ecology', 'Interview',
}
LABELS = {'JS': 'JavaScript', 'TS': 'TypeScript', 'Network': '计算机网络',
          'AIFuture': 'AI 工程', 'CommonSense': '计算机基础', '前端进阶': '前端工程',
          'ProblemNotes': '开发实践', 'Aliyun': '云服务', 'Ecology': '前端生态', 'Interview': '知识复习'}


def snapshot(source, repo, kind):
    file = ROOT / '.tmp-resources' / f'{source}-{kind}.json'
    if not file.exists():
        suffix = 'git/trees/main?recursive=1' if kind == 'tree' else 'license'
        request = urllib.request.Request(f'https://api.github.com/repos/{repo}/{suffix}', headers={'User-Agent': 'YXCR-knowledge-import'})
        file.write_bytes(urllib.request.urlopen(request, timeout=35).read())
    return json.loads(file.read_text(encoding='utf8'))


def selected(source, p):
    if not p.endswith('.md'):
        return False
    if source == 'aifuture':
        parts = p.split('/')
        return len(parts) > 3 and parts[:2] == ['docs', 'column'] and parts[2] in GROUPS
    return p.startswith(('docs/interview/', 'docs/fe/', 'docs/html2canvas/',
                         'docs/notes/', 'docs/workflow/', 'docs/pit/', 'docs/analysis/')) and '/lxy/' not in p


def fetch_blob(repo, item):
    file = CACHE / (item['sha'] + '.md')
    if file.exists():
        data = file.read_bytes()
    else:
        url = f'https://raw.githubusercontent.com/{repo}/main/' + urllib.parse.quote(item['path'])
        for attempt in range(3):
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'YXCR-knowledge-import'})
                data = urllib.request.urlopen(req, timeout=35).read()
                break
            except Exception:
                if attempt == 2:
                    raise
                time.sleep(attempt + 1)
        file.write_bytes(data)
    actual = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
    if actual != item['sha']:
        raise ValueError(f"Upstream changed: refresh the tree snapshot for {item['path']}")
    return data.decode('utf-8-sig')


def clean(text):
    text = text.replace('\r\n', '\n')
    text = re.sub(r'\A---\s*\n.*?\n---\s*\n', '', text, flags=re.S)
    text = re.sub(r'<!--.*?-->', '', text, flags=re.S)
    text = re.sub(r'<script\b[^>]*>.*?</script>', '', text, flags=re.S | re.I)
    text = re.sub(r'<style\b[^>]*>.*?</style>', '', text, flags=re.S | re.I)
    # Only transform prose; leave fenced examples intact.
    lines, fence = [], None
    for line in text.splitlines():
        marker = re.match(r'^\s*(`{3,}|~{3,})', line)
        if marker:
            if fence is None:
                fence = marker[1][0]
            elif marker[1][0] == fence:
                fence = None
            lines.append(line)
            continue
        if fence is None:
            if re.match(r'^\s*\[\[toc\]\]', line, re.I):
                continue
            if re.match(r'^\s*:::', line):
                label = re.sub(r'^\s*:::\s*(tip|warning|danger|info|details|code-group)?\s*', '', line)
                if label:
                    lines.append(f'\n**{label}**\n')
                continue
            line = re.sub(r'\s*\{#[^}]+\}\s*$', '', line)
            line = re.sub(r'<(?:ArticleMetadata|CopyMarkdown|BackToTop)\b[^>]*/>', '', line)
            line = re.sub(r'<img\b[^>]*src=["\']([^"\']+)["\'][^>]*>', r'![示意图](\1)', line)
        lines.append(line)
    return '\n'.join(lines).strip()


def heading_parts(text, depth=2):
    """Split question collections at the specified level, excluding fenced examples."""
    cuts, fence = [], None
    for match in re.finditer(r'^.*$', text, re.M):
        line = match[0]
        marker = re.match(r'^\s*(`{3,}|~{3,})', line)
        if marker:
            fence = None if fence == marker[1][0] else marker[1][0]
        elif fence is None and re.match(r'^' + '#' * depth + r'\s+\S', line):
            cuts.append(match.start())
    if len(cuts) < 3:
        return [text]
    return [text[start:end].strip() for start, end in zip(cuts, cuts[1:] + [len(text)])]


def title_for(text, p):
    match = re.search(r'^#{1,3}\s+(.+)', text, re.M)
    title = match[1] if match else Path(p).stem
    return re.sub(r'^[一二三四五六七八九十百\d]+[.、．]\s*', '', re.sub(r'[*`#]', '', title)).strip()


def excerpt(body):
    for paragraph in body.split('\n\n'):
        if re.match(r'^\s*(?:#{1,6}\s|!\[|```|~~~|\||---|:::)', paragraph):
            continue
        text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', paragraph)
        text = re.sub(r'[`*#>!]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        if len(text) >= 30:
            return text[:145]
    return ''


def collections_for(p, title, source):
    group = p.split('/')[2] if source == 'aifuture' else ''
    core = {'AIFuture': 'ai', 'Network': 'network-interview', 'Docker': 'docker', 'Node': 'node',
            'CommonSense': 'computer', 'Linux': 'computer', '数据库': 'advanced',
            '前端进阶': 'frontend-system', 'Git': 'tools', 'Nginx': 'http',
            'Next': 'frontend-system', 'Aliyun': 'advanced', 'ProblemNotes': 'scenarios',
            'Ecology': 'tools', 'Interview': 'frequent'}.get(group, 'base')
    if '/miniProgram/' in p: core = 'weapp'
    if source == 'bingkele':
        core = 'frequent' if '/interview/' in p else 'base'
        if 'network/' in p or p.endswith('/http.md'):
            core = 'network-interview'
        elif '/coding/' in p:
            core = 'handwritten'
        elif '/html2canvas/' in p:
            core = 'canvas'
        elif 'big-business' in p:
            core = 'experience'
        elif p.startswith(('docs/workflow/', 'docs/pit/', 'docs/analysis/')):
            core = 'frontend-system'
    tags = {core}
    if group == 'AIFuture': tags.add('ai-future')
    if re.search(r'HTTP|HTTPS|缓存|Cookie|跨域|WebSocket|SSE', title, re.I): tags.add('http')
    if re.search(r'浏览器|渲染|DOM|BOM|回流|重绘|事件循环', title, re.I): tags.add('browser')
    if re.search(r'原理|实现|底层|机制', title): tags.add('principles')
    if re.search(r'手写|防抖|节流|深拷贝|call|apply|bind', title, re.I): tags.add('handwritten')
    if re.search(r'设计模式|单例|工厂|观察者|发布订阅', title): tags.add('patterns')
    if re.search(r'npm|pnpm|yarn', title, re.I): tags.add('npm')
    if re.search(r'算法|排序|二叉树|链表|复杂度|递归', title): tags.add('algorithm')
    if re.search(r'实战|方案|优化', title): tags.add('scenarios')
    if re.search(r'原理|性能|架构|源码|工程化|泛型', title): tags.add('advanced')
    if group in {'Vue', 'React', 'JS', 'TS', '前端进阶', 'Next', 'Angular', 'ProblemNotes'}: tags.add('comprehensive')
    if source == 'bingkele' and '/interview/' in p:
        tags.update(['daily', 'self-check'])
    if group in {'AIFuture', 'Network', 'Vue', 'React'} and re.search(r'基础|核心|入门|原理', title): tags.add('curated')
    if source == 'aifuture': tags.add('blog')
    return core, sorted(tags)


def main():
    jobs = []
    for source, repo, license_id in SOURCES:
        tree = snapshot(source, repo, 'tree')
        snapshot(source, repo, 'license')
        jobs += [(source, repo, license_id, item) for item in tree['tree'] if selected(source, item['path'])]
    raw = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(fetch_blob, repo, item): (source, repo, lic, item) for source, repo, lic, item in jobs}
        for index, future in enumerate(concurrent.futures.as_completed(futures), 1):
            source, repo, lic, item = futures[future]
            raw[(source, item['path'])] = (clean(future.result()), repo, lic, item['sha'])
            if index % 40 == 0: print(f'Downloaded {index}/{len(jobs)}', flush=True)

    entries, bodies, manifest, link_map = [], {}, {}, {}
    for (source, p), (text, repo, lic, blob) in sorted(raw.items()):
        if len(text) < 180 or Path(p).stem == 'index' and len(text) < 600:
            continue
        parts = heading_parts(text) if source == 'bingkele' and '/interview/' in p else heading_parts(text, 3) if '/column/Interview/' in p else [text]
        first_id = None
        for index, part in enumerate(parts):
            if len(part) < 100: continue
            title = title_for(part, p)
            origin = f'https://github.com/{repo}/blob/main/{p}'
            stable = origin + (f'#section-{index}' if len(parts) > 1 else '')
            id = 'res-' + hashlib.sha256(stable.encode()).hexdigest()[:16]
            first_id = first_id or id
            core, tags = collections_for(p, title, source)
            if len(part) < 1000 and len(parts) > 1: tags.append('flashcards')
            group = p.split('/')[2] if source == 'aifuture' else ''
            category = 'AI / LLM' if group == 'AIFuture' else '后端' if group in {'Python', 'Node', '数据库', 'Docker', 'Linux', 'Nginx', 'Aliyun'} else '计算机网络' if core == 'network-interview' else '前端'
            section = LABELS.get(group, group) or {'network-interview': '计算机网络', 'frequent': '知识复习'}.get(core, '前端基础')
            body = re.sub(r'\A#{1,3}\s+[^\n]+\n*', '', part).strip()
            description = excerpt(body)
            entries.append(dict(id=id, title=title, url=f'/questions/{id}', source=source, collection=core, collections=tags, section=section, category=category, kind='knowledge' if len(parts) > 1 else 'document', description=description))
            bodies[id] = (body, source, p, repo)
            manifest[id] = dict(repository=repo, path=p, blob=blob, license=lic, author='gouxinjie' if source == 'aifuture' else '冰可乐', modified=True)
        if first_id: link_map[(source, p)] = first_id

    def rewrite(body, source, p, repo):
        def destination(match):
            prefix, target, suffix = match.groups()
            target = html.unescape(target)
            parsed = urllib.parse.urlsplit(target)
            own_host = 'gouxinjie.github.io' if source == 'aifuture' else 'bingkele.cc'
            local_absolute = parsed.hostname == own_host
            if parsed.scheme and not local_absolute or target.startswith(('#', '//')): return match[0]
            file = urllib.parse.unquote(parsed.path)
            resolved = posixpath.normpath('docs/' + file.lstrip('/') if file.startswith('/') else posixpath.join(posixpath.dirname(p), file))
            options = [resolved, resolved.removesuffix('.html') + '.md', resolved.rstrip('/') + '/index.md']
            related = next((link_map[(source, option)] for option in options if (source, option) in link_map), None)
            if related and not prefix.startswith('!'):
                url = '/questions/' + related
                # Source-generated heading IDs differ: open the correct local chapter.
            elif prefix.startswith('!'):
                url = f'https://raw.githubusercontent.com/{repo}/main/' + urllib.parse.quote(resolved)
            elif local_absolute:
                return match[0]
            else:
                base = 'https://gouxinjie.github.io/' if source == 'aifuture' else 'https://bingkele.cc/'
                url = urllib.parse.urljoin(base + p.removeprefix('docs/'), target).replace('.md', '.html')
            return prefix + url + suffix
        return re.sub(r'(!?\[[^\]\n]*\]\()([^\s)]+)(\s*\))', destination, body)

    for id, (body, source, p, repo) in bodies.items():
        (DEST / f'{id}.md').write_text(rewrite(body, source, p, repo) + '\n', encoding='utf8')
    guides = {
        'agent-harness': ('ai', ['ai', 'ai-future', 'advanced', 'principles'], 'AI 工程'),
        'mini-program': ('weapp', ['weapp', 'self-check'], '小程序'),
        'learning-route': ('roadmaps', ['roadmaps', 'mindmaps', 'experience', 'yearly'], '学习方法'),
        'npm-workflow': ('npm', ['npm', 'tools', 'frontend-system'], '前端工程'),
    }
    for slug, (core, tags, section) in guides.items():
        text = (ROOT / 'content/guides' / f'{slug}.md').read_text(encoding='utf8')
        id = 'res-' + hashlib.sha256(f'yxcr:guide:{slug}'.encode()).hexdigest()[:16]
        title = title_for(text, slug)
        body = re.sub(r'\A#\s+[^\n]+\n*', '', text).strip()
        description = body.split('\n\n')[0]
        entries.append(dict(id=id, title=title, url=f'/questions/{id}', source='yxcr', collection=core, collections=tags, section=section, category='AI / LLM' if core == 'ai' else '前端', kind='document', description=description, featured=slug == 'agent-harness'))
        (DEST / f'{id}.md').write_text(body + '\n', encoding='utf8')
    entries.sort(key=lambda item: (item['collection'] != 'ai', item['collection'] != 'network-interview', item['title']))
    extra_index = ROOT / 'content/knowledge/algorithms-index.json'
    if extra_index.exists():
        entries.extend(json.loads(extra_index.read_text(encoding='utf8')))
        manifest.update(json.loads((ROOT / 'content/knowledge/algorithms-manifest.json').read_text(encoding='utf8')))
    authored = ROOT / 'content/authored/network.md'
    if authored.exists():
        directory = {item['id']: item for item in json.loads((ROOT / 'lib/resources/directory-index.json').read_text(encoding='utf8'))}
        parts = re.split(r'^## (res-[a-f0-9]{16})\s*\n', authored.read_text(encoding='utf8'), flags=re.M)
        for index in range(1, len(parts), 2):
            id, body = parts[index], parts[index + 1].strip()
            if id not in directory:
                raise ValueError(f'Unknown authored question: {id}')
            item = directory[id]
            entries.append(dict(id=id, title=item['title'], url=f'/questions/{id}', source='yxcr', collection='network-interview', collections=['network-interview', 'http', 'frequent'], category='计算机网络', section='计算机网络', kind='knowledge', description=excerpt(body)))
            (DEST / f'{id}.md').write_text(body + '\n', encoding='utf8')
    handbook = ROOT / 'content/authored/handwritten.md'
    if handbook.exists():
        directory_items = json.loads((ROOT / 'lib/resources/directory-index.json').read_text(encoding='utf8'))
        topics = json.loads((ROOT / 'content/authored/handwritten-topics.json').read_text(encoding='utf8'))
        parts = re.split(r'^## ([a-z0-9-]+) \| ([^\n]+)\n', handbook.read_text(encoding='utf8'), flags=re.M)
        for index in range(1, len(parts), 3):
            slug, title, body = parts[index], parts[index + 1], parts[index + 2].strip()
            topic = topics[slug]
            aliases = topic['aliases'].split('|')
            matching = [item for item in directory_items if (not topic.get('scope') or item['collection'] in topic['scope']) and (item['title'] in aliases or (item['collection'] in {'base', 'advanced', 'frequent', 'curated', 'handwritten', 'algorithm'} and re.search(topic['pattern'], item['title'], re.I)))]
            id = 'res-' + hashlib.sha256(f'yxcr:handwritten:{slug}'.encode()).hexdigest()[:16]
            body = re.sub(r'^### ', '## ', body, flags=re.M)
            entries.append(dict(id=id, title=title, url=f'/questions/{id}', source='yxcr', collection=topic.get('collection', 'handwritten'), collections=['handwritten', 'algorithm', 'principles'], category=topic.get('category', '前端'), section='算法与数据结构' if topic.get('category') == '算法' else '手写与原理', kind='document', description=excerpt(body), searchAliases=sorted(set(aliases + [item['title'] for item in matching])), aliasIds=[item['id'] for item in matching]))
            (DEST / f'{id}.md').write_text(body + '\n', encoding='utf8')
    directory_file = ROOT / 'lib/resources/directory-index.json'
    if directory_file.exists():
        directory_items = json.loads(directory_file.read_text(encoding='utf8'))
        def normalized_path(url):
            return urllib.parse.unquote(urllib.parse.urlsplit(url).path).removesuffix('.html').removesuffix('.md').removesuffix('/index').rstrip('/')
        def normalized_title(title):
            title = re.sub(r'^\d+[.、\s]+', '', title)
            return re.sub(r'[^a-z0-9\u4e00-\u9fff]', '', unicodedata.normalize('NFKC', title).lower())
        by_url = {(item['source'], normalized_path(item['url'])): item for item in directory_items if not urllib.parse.urlsplit(item['url']).fragment}
        by_title = {normalized_title(item['title']): item for item in entries if len(normalized_title(item['title'])) >= 8}
        for id, origin in manifest.items():
            source = 'aifuture' if origin['repository'].startswith('gouxinjie/') else 'bingkele' if origin['repository'].startswith('hcer1999/') else None
            if source:
                target = by_url.get((source, normalized_path('/' + origin['path'].removeprefix('docs/'))))
                resource = next((item for item in entries if item['id'] == id), None)
                if target and resource: resource.setdefault('aliasIds', []).append(target['id'])
        used = {id for item in entries for id in [item['id'], *item.get('aliasIds', [])]}
        for item in directory_items:
            title = normalized_title(item['title'])
            if item['id'] not in used and title in by_title:
                by_title[title].setdefault('aliasIds', []).append(item['id'])
                used.add(item['id'])
        for item in entries: item['aliasIds'] = sorted(set(item.get('aliasIds', [])))
    (ROOT / 'lib/resources/catalog.json').write_text(json.dumps(entries, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
    counts = Counter(tag for item in entries for tag in item['collections'])
    (ROOT / 'lib/resources/summary.json').write_text(json.dumps(dict(total=len(entries), syncedAt=datetime.now(timezone.utc).isoformat(), collections=dict(counts), categories=dict(Counter(item['category'] for item in entries))), ensure_ascii=False, indent=2), encoding='utf8')
    (ROOT / 'content/knowledge/manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf8')
    notices = ROOT / 'public' / 'licenses'
    notices.mkdir(parents=True, exist_ok=True)
    for source, repo, lic in SOURCES:
        data = json.loads((ROOT / '.tmp-resources' / f'{source}-license.json').read_text(encoding='utf8'))
        (notices / f'{lic}.txt').write_bytes(base64.b64decode(data['content']))
    (notices / 'NOTICE.txt').write_text('YXCR OS adapted Markdown content\n\n' + '\n'.join(f'{repo} — {lic}' for _, repo, lic in SOURCES) + '\n\nModified: layout, Markdown normalization, local links, chapter extraction.\nPer-document provenance: content/knowledge/manifest.json\n', encoding='utf8')
    if extra_index.exists():
        with (notices / 'NOTICE.txt').open('a', encoding='utf8') as notice:
            notice.write('\nAlgorithm solutions: Doocs contributors, https://github.com/doocs/leetcode\nLicense: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/\nChanges: removed problem statements and non-selected code languages; adapted Markdown and references. Adapted algorithm content remains under CC BY-SA 4.0.\n')
    (notices / 'knowledge-attribution.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf8')
    print(f'Imported {len(entries)} complete knowledge pages from {len(jobs)} Markdown files.', flush=True)


if __name__ == '__main__':
    main()
