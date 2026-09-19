import json

with open('scripts/final_audit_table.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total items in audit table: {len(items)}")

non_high = []
for item in items:
    correct = item.get('Likely Correct?')
    conf = item.get('Confidence')
    if correct != 'YES' or conf != 'HIGH':
        non_high.append(item)
        print(f"[{item.get('Category')}] {item.get('Product ID')}: {item.get('Product Name')}")
        print(f"    Correct? {correct} | Conf: {conf} | Page: {item.get('Page')} | Path: {item.get('Current Image Path')}")

print(f"\nTotal non-HIGH / suspect: {len(non_high)}")
