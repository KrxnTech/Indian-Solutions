import os
import json
from PIL import Image

with open('extracted_manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

print(f"Verifying {len(manifest)} products...")

missing_files = []
corrupted_files = []
verified_count = 0

for item in manifest:
    img_rel = item['imagePath']
    # Convert /assets/... to public/assets/...
    if img_rel.startswith('/'):
        disk_path = os.path.join('public', img_rel.lstrip('/'))
    else:
        disk_path = os.path.join('public', img_rel)
        
    if not os.path.exists(disk_path):
        missing_files.append((item['id'], disk_path))
        continue
        
    # Check readability and dimensions
    if disk_path.endswith('.webp') or disk_path.endswith('.png') or disk_path.endswith('.jpg'):
        try:
            with Image.open(disk_path) as im:
                w, h = im.size
                if w <= 0 or h <= 0:
                    corrupted_files.append((item['id'], disk_path, "Zero dimensions"))
                else:
                    verified_count += 1
        except Exception as e:
            corrupted_files.append((item['id'], disk_path, str(e)))
    elif disk_path.endswith('.svg'):
        # SVG placeholder
        if os.path.getsize(disk_path) > 0:
            verified_count += 1
        else:
            corrupted_files.append((item['id'], disk_path, "Empty SVG"))

print(f"Verification Results:")
print(f"  Verified Files: {verified_count}/{len(manifest)}")
print(f"  Missing Files: {len(missing_files)}")
print(f"  Corrupted Files: {len(corrupted_files)}")

if missing_files:
    print("Missing files:", missing_files)
if corrupted_files:
    print("Corrupted files:", corrupted_files)

assert len(missing_files) == 0, "Missing files found!"
assert len(corrupted_files) == 0, "Corrupted files found!"
print("ALL PRODUCT IMAGE ASSETS VERIFIED SUCCESSFULLY!")
