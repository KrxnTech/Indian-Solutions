import re
import os
import json

with open('src/data/products.js', 'r', encoding='utf-8') as f:
    products_js = f.read()

products_dir = 'src/data/products'
all_products = []

for jf in os.listdir(products_dir):
    if not jf.endswith('.js'):
        continue
    fp = os.path.join(products_dir, jf)
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    prod_blocks = content.split('  {\n    id:')
    for b in prod_blocks[1:]:
        pid_m = re.search(r"^\s*['\"]([^'\"]+)['\"]", b)
        cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", b)
        catslug_m = re.search(r"categorySlug:\s*['\"]([^'\"]+)['\"]", b)
        subcat_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", b)
        
        all_products.append({
            'file': jf,
            'id': pid_m.group(1) if pid_m else '',
            'category': cat_m.group(1) if cat_m else '',
            'categorySlug': catslug_m.group(1) if catslug_m else '',
            'subCategory': subcat_m.group(1) if subcat_m else ''
        })

# Parse CATALOGUE_CATEGORIES with subcategories
cat_blocks = re.findall(r"{\s*name:\s*['\"]([^'\"]+)['\"],\s*slug:\s*['\"]([^'\"]+)['\"],(?:\s*subCategories:\s*\[(.*?)\])?", products_js, re.DOTALL)

for name, slug, subcats_raw in cat_blocks:
    if slug == 'all':
        continue
    defined_subcats = [s.strip(" '\"") for s in subcats_raw.split(',') if s.strip()] if subcats_raw else []
    actual_subcats = set(p['subCategory'] for p in all_products if p['categorySlug'] == slug)
    
    print(f"\nCategory: {name} ({slug})")
    print(f"  Defined in CATALOGUE_CATEGORIES: {defined_subcats}")
    print(f"  Actual in products:              {sorted(actual_subcats)}")
    
    # Check if any actual product subCategory is missing from defined_subcats
    missing_from_defined = [s for s in actual_subcats if s not in defined_subcats]
    if missing_from_defined:
        print(f"  --> MISMATCH! Products have subcategories NOT in CATALOGUE_CATEGORIES: {missing_from_defined}")
    
    # Check if any defined subcategory has 0 products
    empty_defined = [s for s in defined_subcats if s not in actual_subcats]
    if empty_defined:
        print(f"  --> EMPTY defined subcategories with 0 products: {empty_defined}")
