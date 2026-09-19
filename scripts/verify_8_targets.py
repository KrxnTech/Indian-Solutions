import json

with open('scripts/final_audit_table.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

targets = [
    'body-cotton-boiler-suit',
    'body-high-vis-reflective-jacket',
    'body-chemical-splash-suit-pvc',
    'body-leather-welding-apron',
    'body-flame-retardant-coverall',
    'head-lightweight-industrial-bump-cap',
    'special-emergency-escape-breathing-apparatus-eebd',
    'door-hmps-non-fire-rated-double'
]

for it in items:
    if it['Product ID'] in targets:
        print(f"[{it['Category']}] {it['Product ID']}: {it['Product Name']}")
        print(f"   Path: {it['Current Image Path']}")
        print(f"   Exists: {it['Image Exists']}, Dims: {it['Dims']}, Type: {it['Image Type']}")
