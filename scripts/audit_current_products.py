import os
import glob
import re
from PIL import Image

data_files = glob.glob('src/data/products/*.js')
products = []

for df in data_files:
    with open(df, 'r', encoding='utf-8') as f:
        txt = f.read()
    
    # Split by product object
    # Find all objects starting with { id: '...' ... }
    # A simple regex to capture individual objects:
    raw_objs = re.findall(r'\{\s*id:\s*[\'"][^\'"]+[\'"].*?\n  \},', txt, re.DOTALL)
    for obj_str in raw_objs:
        id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", obj_str)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", obj_str)
        cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", obj_str)
        sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", obj_str)
        img_m = re.search(r"image:\s*['\"]([^'\"]+)['\"]", obj_str)
        source_m = re.search(r"source:\s*['\"]([^'\"]+)['\"]", obj_str)
        
        if id_m and img_m:
            products.append({
                'id': id_m.group(1),
                'name': name_m.group(1) if name_m else '',
                'category': cat_m.group(1) if cat_m else '',
                'subcategory': sub_m.group(1) if sub_m else '',
                'image': img_m.group(1),
                'source': source_m.group(1) if source_m else '',
                'file': os.path.basename(df)
            })

print(f"Total products parsed: {len(products)}")

placeholders = [p for p in products if p['image'].endswith('.svg')]
webp_images = [p for p in products if p['image'].endswith('.webp')]
print(f"Placeholders (SVG): {len(placeholders)}")
for p in placeholders:
    print(f"  - [{p['category']}] {p['name']} ({p['id']}) -> {p['image']}")

print(f"WebP Real Images: {len(webp_images)}")

missing = []
for p in products:
    rel = p['image'].lstrip('/')
    disk_path = os.path.join('public', rel)
    if not os.path.exists(disk_path):
        missing.append((p['id'], disk_path))

print(f"Missing image files: {len(missing)}")
if missing:
    for m in missing:
        print("MISSING:", m)

# Group products by category
by_cat = {}
for p in products:
    by_cat.setdefault(p['category'], []).append(p)

print("\nProduct count per category:")
for cat, prods in sorted(by_cat.items()):
    real_c = sum(1 for p in prods if p['image'].endswith('.webp'))
    svg_c = sum(1 for p in prods if p['image'].endswith('.svg'))
    print(f"  {cat}: {len(prods)} products ({real_c} real, {svg_c} placeholders)")
