import pymupdf

doc = pymupdf.open('DOORS ISS_merged (1).pdf')
print(f"Total pages: {len(doc)}")

keywords = [
    'bump cap', 'baseball', 
    'eebd', 'escape breathing', 'breathing apparatus', 
    'hmps', 'double leaf', 'utility door', 'pressed steel',
    'boiler suit', 'coverall', 'reflective jacket', 'vest', 
    'chemical splash', 'pvc suit', 'welding apron', 'apron', 'flame retardant'
]

results = {}
for i, page in enumerate(doc):
    text = page.get_text() or ''
    text_lower = text.lower()
    for kw in keywords:
        if kw in text_lower:
            results.setdefault(kw, []).append(i + 1)

for kw, pages in sorted(results.items()):
    print(f"Keyword '{kw}': found on pages {pages}")
