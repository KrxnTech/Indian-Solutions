import json

with open('scripts/final_audit_table.json', 'r', encoding='utf-8') as f:
    audit = json.load(f)

for p in audit:
    if p.get('Product ID') == 'door-hmps-non-fire-rated-double':
        p['Current Image Path'] = '/assets/products/fire-doors/hmps-door.svg'
        p['Image Type'] = 'Vector SVG Placeholder (Reverted from about-page)'
        p['Likely Correct?'] = 'YES (Placeholder)'
        p['Confidence'] = 'HIGH (Placeholder)'
        p['Notes'] = 'Reverted to placeholder: Company about page graphic quarantined and removed.'

with open('scripts/final_audit_table.json', 'w', encoding='utf-8') as f:
    json.dump(audit, f, indent=2)

print("Updated scripts/final_audit_table.json successfully!")
