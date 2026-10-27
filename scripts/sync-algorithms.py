"""Adapt the requested algorithm solutions from a sparse checkout of doocs/leetcode.

Only solution commentary and implementation are imported; problem statements are
excluded. Attribution and the CC BY-SA 4.0 license travel with the adapted content.
"""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT / '.tmp-resources/leetcode'


def prepare():
    if not (REPO / '.git').exists():
        subprocess.check_call(['git', 'clone', '--filter=blob:none', '--no-checkout', '--depth=1', 'https://github.com/doocs/leetcode.git', str(REPO)])
    paths = subprocess.check_output(['git', '-c', 'core.quotepath=false', 'ls-tree', '-r', '--name-only', 'HEAD'], cwd=REPO).decode('utf8').splitlines()
    paths = [p for p in paths if re.match(r'^solution/\d+-\d+/\d+\..+/README.md$', p)]
    normalize = lambda text: re.sub(r'[^a-z0-9]', '', text.lower())
    by_name = {normalize(p.split('/')[-2].split('.', 1)[1]): p for p in paths}
    by_id = {int(re.search(r'/(\d+)\.', p)[1]): p for p in paths}
    directory = json.loads((ROOT / 'lib/resources/directory-index.json').read_text(encoding='utf8'))
    aliases = json.loads((ROOT / 'content/resources/algorithm-aliases.json').read_text(encoding='utf8'))
    matches = []
    for item in directory:
        if item['collection'] != 'algorithm':
            continue
        path = by_name.get(normalize(item['url'].split('/')[-1]))
        if path is None and item['title'] in aliases:
            path = by_id[aliases[item['title']]]
        if path:
            matches.append(dict(item=item, path=path))
    patterns = '\n'.join('/' + item['path'] for item in matches) + '\n/LICENSE\n'
    subprocess.check_call(['git', 'config', 'core.longpaths', 'true'], cwd=REPO)
    subprocess.run(['git', 'sparse-checkout', 'set', '--no-cone', '--stdin'], cwd=REPO, input=patterns.encode('utf8'), check=True)
    subprocess.check_call(['git', 'checkout', 'HEAD'], cwd=REPO)
    (ROOT / '.tmp-resources/algorithm-matches.json').write_text(json.dumps(matches, ensure_ascii=False), encoding='utf8')
    license = REPO / 'LICENSE'
    (ROOT / '.tmp-resources/algorithm-license.txt').write_text(license.read_text(encoding='utf8'), encoding='utf8')


def adapt(text):
    text = text.replace('\r\n', '\n')
    title = re.search(r'^#\s+\[([^\]]+)\]', text, re.M)
    match = re.search(r'^## (?:解法|题解)\s*$', text, re.M)
    if not title or not match:
        return None
    body = text[match.start():]
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    # Keep each solution's explanation, then the front-end and Python examples.
    output = []
    for method in re.split(r'(?=^### (?:方法|解法))', body, flags=re.M):
        parts = re.split(r'(^####\s+[^\n]+\n)', method, flags=re.M)
        output.append(parts[0])
        preferred = 'TypeScript' if '\n#### TypeScript\n' in method else 'JavaScript'
        for index in range(1, len(parts), 2):
            language = parts[index].strip('# \r\n')
            if language in {preferred, 'Python3', 'Python', 'MySQL', 'SQL'}:
                output.extend(parts[index:index + 2])
    body = '\n'.join(output)
    if '```' not in body:
        return None
    # Link original discussion references to their absolute repository locations.
    body = re.sub(r'\]\((/[^)]+)\)', r'](https://github.com/doocs/leetcode/blob/main\1)', body)
    return title[1], body.strip() + '\n'


def main():
    prepare()
    matches = json.loads((ROOT / '.tmp-resources/algorithm-matches.json').read_text(encoding='utf8'))
    commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=REPO).decode().strip()
    tree = subprocess.check_output(['git', '-c', 'core.quotepath=false', 'ls-tree', '-r', 'HEAD'], cwd=REPO).decode('utf8')
    blobs = {line.split('\t', 1)[1]: line.split('\t', 1)[0].split()[-1] for line in tree.splitlines() if '\t' in line}
    entries, manifest, by_path = [], {}, {}
    for match in matches:
        if match['path'] in by_path:
            existing = by_path[match['path']]
            existing['searchAliases'].append(match['item']['title'])
            existing['aliasIds'].append(match['item']['id'])
            continue
        file = REPO / match['path']
        data = file.read_bytes()
        adapted = adapt(data.decode('utf-8'))
        if not adapted:
            continue
        title, body = adapted
        item = match['item']
        resource = dict(id=item['id'], title=title, url=f"/questions/{item['id']}",
                        source='algorithms', collection='algorithm', collections=['algorithm', 'self-check'],
                        category='算法', section='算法与数据结构', kind='knowledge',
                        description=re.sub(r'[#>*`$]', '', body.split('```')[0]).replace('\n', ' ').strip()[:145],
                        searchAliases=[item['title']], aliasIds=[])
        (ROOT / 'content/knowledge' / f"{item['id']}.md").write_text(body, encoding='utf8')
        entries.append(resource)
        by_path[match['path']] = resource
        manifest[item['id']] = dict(repository='doocs/leetcode', path=match['path'], commit=commit,
                                   blob=blobs[match['path']],
                                   license='CC-BY-SA-4.0', author='Doocs contributors', modified=True,
                                   changes='Removed problem statement and non-selected languages; adapted Markdown and references.')
    (ROOT / 'content/knowledge/algorithms-index.json').write_text(json.dumps(entries, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
    (ROOT / 'content/knowledge/algorithms-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf8')
    license = (ROOT / '.tmp-resources/algorithm-license.txt').read_text(encoding='utf8')
    (ROOT / 'public/licenses/CC-BY-SA-4.0.txt').write_text(license, encoding='utf8')
    print(f'Adapted {len(entries)} requested algorithm solutions at {commit[:12]}', flush=True)


if __name__ == '__main__':
    main()
