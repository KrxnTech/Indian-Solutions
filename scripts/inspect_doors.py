import json
with open('scripts/final_audit_table.json', 'r', encoding='utf-8') as f:
    audit = json.load(f)

for p in audit:
    if p.get('Category') == 'Fire Doors':
        print(f"{p.get('Product ID')}: {p.get('Product Name')}")
        print(f"  Path: {p.get('Current Image Path')}")
        print(f"  Type: {p.get('Image Type')}")
        print(f"  Page: {p.get('Page')}")
        print(f"  Confidence: {p.get('Confidence')}")
        print(f"  Dims: {p.get('Dims')}")
