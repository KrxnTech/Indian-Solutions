import re
import os
import json

# Extract CATALOGUE_CATEGORIES from src/data/products.js
with open('src/data/products.js', 'r', encoding='utf-8') as f:
    products_js = f.read()

# Let's inspect products in src/data/products/*.js
products_dir = 'src/data/products'
all_products = []

for jf in os.listdir(products_dir):
    if not jf.endswith('.js'):
        continue
    fp = os.path.join(products_dir, jf)
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract product objects: id, category, categorySlug, subCategory
    # Using regex to extract fields
    prod_blocks = content.split('  {\n    id:')
    for b in prod_blocks[1:]:
        pid_m = re.search(r"^\s*['\"]([^'\"]+)['\"]", b)
        cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", b)
        catslug_m = re.search(r"categorySlug:\s*['\"]([^'\"]+)['\"]", b)
        subcat_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", b)
        img_m = re.search(r"image:\s*['\"]([^'\"]+)['\"]", b)
        
        all_products.append({
            'file': jf,
            'id': pid_m.group(1) if pid_m else '',
            'category': cat_m.group(1) if cat_m else '',
            'categorySlug': catslug_m.group(1) if catslug_m else '',
            'subCategory': subcat_m.group(1) if subcat_m else '',
            'image': img_m.group(1) if img_m else ''
        })

print(f"Total parsed products: {len(all_products)}")

# Check categorySlugs
cat_slugs = set(p['categorySlug'] for p in all_products)
print("Unique categorySlugs in products:")
for cs in sorted(cat_slugs):
    count = sum(1 for p in all_products if p['categorySlug'] == cs)
    print(f"  {cs:30} : {count} products")

# Check CATALOGUE_CATEGORIES in products.js
cat_matches = re.findall(r"name:\s*['\"]([^'\"]+)['\"],\s*slug:\s*['\"]([^'\"]+)['\"]", products_js)
print("\nCategories in CATALOGUE_CATEGORIES:")
for name, slug in cat_matches:
    prod_count = sum(1 for p in all_products if p['categorySlug'] == slug)
    print(f"  {slug:30} ({name}): {prod_count} products")
