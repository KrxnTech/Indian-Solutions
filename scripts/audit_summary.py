import json

with open('scripts/final_audit_table.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total audited products: {len(items)}")

# Count by Likely Correct
stats = {}
for it in items:
    k = (it.get('Likely Correct?'), it.get('Confidence'))
    stats[k] = stats.get(k, 0) + 1

for k, count in sorted(stats.items()):
    print(f"Status: {k} -> {count}")

# Print any item with 'Sign' or 'Door' or other categories that might be suspicious
print("\nChecking all 75 items:")
for it in items:
    print(f"[{it['Category']}] {it['Product ID']}: {it['Likely Correct?']} | {it['Confidence']} | {it['Current Image Path']}")
