"""Track the full public inventory against real local articles and topic aliases."""
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
directory = json.loads((ROOT / 'lib/resources/directory-index.json').read_text(encoding='utf8'))
catalog = json.loads((ROOT / 'lib/resources/catalog.json').read_text(encoding='utf8'))
local = {id: item for item in catalog for id in [item['id'], *item.get('aliasIds', [])]}
remaining = [item for item in directory if item['id'] not in local]
by_collection = Counter(item['collection'] for item in directory)
pending = Counter(item['collection'] for item in remaining)
report = {
    'complete': not remaining,
    'scope': 'Public directory entries. An entry is linked only when a real local article or explicit topic alias exists. Related topic guides are not copies of the source article.',
    'directoryEntries': len(directory),
    'localArticles': len(catalog) + 12,
    'linkedDirectoryEntries': len(directory) - len(remaining),
    'remainingEntries': len(remaining),
    'collections': {id: {'directoryEntries': total, 'linkedEntries': total - pending[id], 'remainingEntries': pending[id]} for id, total in by_collection.items()},
}
(ROOT / 'content/resources/coverage.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
(ROOT / 'content/resources/remaining-knowledge.json').write_text(json.dumps(remaining, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf8')
print(json.dumps({key: value for key, value in report.items() if key != 'collections'}, ensure_ascii=False, indent=2))
