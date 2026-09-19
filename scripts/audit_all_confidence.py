import json

with open('scripts/final_audit_table.json', 'r', encoding='utf-8') as f:
    audit = json.load(f)

print(f"Total audit items: {len(audit)}")
non_high = [p for p in audit if p.get('Confidence') != 'HIGH']
print(f"Total non-HIGH items: {len(non_high)}")
for p in non_high:
    print(f"- {p.get('Product ID')} | {p.get('Category')} | {p.get('Confidence')} | {p.get('Image Type')} | {p.get('Current Image Path')}")
