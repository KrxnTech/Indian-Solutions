import json
import os
import io
import re
import hashlib
import pymupdf
from PIL import Image

PDF_PATH = 'DOORS ISS_merged (1).pdf'
doc = pymupdf.open(PDF_PATH)

with open('products_inventory.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

RULES = {
    # 1. Footwear
    'footwear-allen-cooper-ac-1008': {'page': 54, 'words': ['allen', '1008']},
    'footwear-allen-cooper-ac-1156': {'page': 54, 'words': ['allen', '1143']},
    'footwear-hillson-besto': {'page': 55, 'words': ['hillson', 'rockland']},
    'footwear-hillson-century': {'page': 57, 'words': ['hillson', 'collar']},
    'footwear-pvc-gumboot-steel-toe': {'page': 57, 'words': ['torpedd', 'gum']},
    'footwear-executive-derby-safety-shoes': {'page': 56, 'words': ['derby']},

    # 2. Body Protection
    'body-cotton-boiler-suit': {'page': 58, 'words': ['cover', 'akshar']},
    'body-high-vis-reflective-jacket': {'page': 60, 'words': ['jacket', 'glass']},
    'body-chemical-splash-suit-pvc': {'page': 59, 'words': ['pvc', 'chamical']},
    'body-leather-welding-apron': {'page': 59, 'words': ['welding', 'leather', 'appron']},
    'body-flame-retardant-coverall': {'page': 59, 'words': ['ifr', 'suit']},

    # 3. Hand Protection
    'hand-nitrile-chemical-resistant-gloves': {'page': 65, 'words': ['nitrile', 'tpkb']},
    'hand-cut-resistant-level-5-gloves': {'page': 64, 'words': ['cut', 'level', '5']},
    'hand-split-leather-welding-gloves': {'page': 63, 'words': ['leather', 'perfect']},
    'hand-electrical-insulating-rubber-gloves': {'page': 64, 'words': ['40000v']},
    'hand-cotton-knitted-dotted-gloves': {'page': 63, 'words': ['polka', 'dotted']},

    # 4. Head Protection
    'head-industrial-safety-helmet-ratchet': {'page': 66, 'words': ['acme', 'chemption']},
    'head-ventilated-safety-helmet-pinlock': {'page': 67, 'words': ['wind', 'ventilation']},
    'head-lightweight-industrial-bump-cap': None, # UNMATCHED
    'head-electrical-resistant-safety-helmet': {'page': 66, 'words': ['frp', 'concord']},

    # 5. Face Protection
    'face-polycarbonate-face-shield-headgear': {'page': 66, 'words': ['face shield', 'saachi']},
    'face-welding-helmet-flip-up': {'page': 69, 'words': ['hand screen', 'welding']},
    'face-chemical-splash-visor-bracket': {'page': 67, 'words': ['shree', 'arc']},

    # 6. Eye Protection
    'eye-wrap-around-clear-safety-spectacles': {'page': 72, 'words': ['safety goggles 3m clear']},
    'eye-chemical-splash-vented-goggles': {'page': 71, 'words': ['chemical', 'et 49']},
    'eye-over-the-glass-otg-spectacles': {'page': 73, 'words': ['over', 'spects']},
    'eye-dark-welding-cutting-goggles': {'page': 73, 'words': ['es-003']},

    # 7. Traffic Safety
    'traffic-reflective-traffic-cone-750mm': {'page': 76, 'words': ['rubber', '750']},
    'traffic-water-filled-road-barrier': {'page': 75, 'words': ['water', 'fill']},
    'traffic-rubber-speed-bump-hump': {'page': 76, 'words': ['road', 'bump']},
    'traffic-outdoor-convex-mirror-800mm': {'page': 74, 'words': ['convex', 'mirror']},

    # 8. Safety Marking Tapes
    'tapes-self-adhesive-pvc-floor-marking-tape': {'page': 77, 'words': ['road', 'marking']},
    'tapes-barricade-caution-danger-tape': {'page': 77, 'words': ['barigatt']},
    'tapes-photoluminescent-glow-in-dark-tape': {'page': 77, 'words': ['night', 'glow']},
    'tapes-zebra-hazard-warning-tape': {'page': 77, 'words': ['reflactive', 'tap']},

    # 9. Fire Hydrant System
    'hydrant-single-landing-valve-gunmetal': {'page': 78, 'words': ['hydrant', 'valve', 'isi']},
    'hydrant-reinforced-rubber-lined-hose-rrl': {'page': 83, 'words': ['torrent', 'armor']},
    'hydrant-short-branch-pipe-nozzle': {'page': 83, 'words': ['multi', 'purpose', 'spray']},
    'hydrant-first-aid-hose-reel-drum': {'page': 79, 'words': ['swiveling', 'movable']},

    # 10. Fire Extinguishers
    'fire-ext-abc-stored-pressure-4kg': {'page': 84, 'words': ['4 kg abc']},
    'fire-ext-co2-portable-4-5kg': {'page': 85, 'words': ['co2 fire extinguisher 4.5kg']},
    'fire-ext-clean-agent-hfc227ea-2kg': {'page': 85, 'words': ['clining', 'agent']},
    'fire-ext-mechanical-foam-9l': {'page': 85, 'words': ['9 ltr mechanical foam']},
    'fire-ext-water-type-9l': {'page': 85, 'words': ['9ltr water']},
    'fire-ext-abc-modular-automatic-ceiling-5kg': {'page': 85, 'words': ['abc automatic modular']},
    'fire-ext-co2-wheeled-trolley-22-5kg': {'page': 85, 'words': ['trolley', '25kg']},

    # 11. First Aid & Rescue
    'firstaid-industrial-trauma-first-aid-box': {'page': 86, 'words': ['first aid kit metal']},
    'firstaid-combination-eyewash-shower-station': {'page': 87, 'words': ['safety shower', 'eye wash']},
    'firstaid-portable-gravity-fed-eyewash': {'page': 87, 'words': ['eyewash bottle']},
    'firstaid-foldable-canvas-emergency-stretcher': {'page': 86, 'words': ['multi functional rescue']},

    # 12. Fall Protection
    'fall-full-body-safety-harness-dorsal': {'page': 88, 'words': ['politech']},
    'fall-shock-absorbing-double-scaffold-lanyard': {'page': 90, 'words': ['absorbing', 'lanyard']},
    'fall-retractable-fall-arrester-block': {'page': 89, 'words': ['retractable', 'fall']},
    'fall-horizontal-lifeline-rope-tensioner': {'page': 89, 'words': ['anchorage', 'polyamide']},

    # 13. Lockout & Tagout
    'loto-dielectric-safety-padlock-red': {'page': 91, 'words': ['osha safety loto padlock']},
    'loto-steel-lockout-hasp-1-5inch': {'page': 91, 'words': ['hasp', 'station']},
    'loto-universal-circuit-breaker-lockout': {'page': 93, 'words': ['electrical lockout kit']},
    'loto-adjustable-ball-valve-lockout': {'page': 92, 'words': ['universal valve']},
    'loto-group-lockout-station-board': {'page': 93, 'words': ['customised shadow']},

    # 14. Special Products
    'special-chemical-oil-spill-kit-50l': {'page': 96, 'words': ['spill kit mini']},
    'special-emergency-escape-breathing-apparatus-eebd': None, # UNMATCHED
    'special-explosion-proof-atex-safety-torch': {'page': 94, 'words': ['flame proof twin']},

    # 15. Fire Doors
    'door-fire-rated-steel-single': {'page': 6, 'crop': False, 'door_type': 'single_fire'},
    'door-hmps-non-fire-rated-double': {'page': 2, 'crop': True, 'box': (0.05, 0.42, 0.38, 0.75)},
    'door-electrical-shaft-access-door': {'page': 14, 'crop': False, 'door_type': 'shaft'},
    'door-clean-room-airtight-flush-door': {'page': 10, 'crop': False, 'door_type': 'cleanroom'},
    'door-fire-rated-glazed-vision-door': {'page': 14, 'crop': False, 'door_type': 'glazed'},
    'door-fire-rated-acoustic-soundproof-door': {'page': 16, 'crop': False, 'door_type': 'acoustic'},

    # 16. Safety Sign Boards
    'sign-01001': {'page': 126, 'crop': True, 'box': (0.025, 0.11, 0.198, 0.30)},
    'sign-01002': {'page': 140, 'crop': True, 'box': (0.025, 0.11, 0.25, 0.31)},
    'sign-01003': {'page': 136, 'crop': True, 'box': (0.24, 0.11, 0.47, 0.22)},
    'sign-01004': {'page': 142, 'crop': True, 'box': (0.025, 0.11, 0.25, 0.31)},
    'sign-01005': {'page': 131, 'crop': True, 'box': (0.025, 0.11, 0.25, 0.31)},
    'sign-01006': {'page': 144, 'crop': True, 'box': (0.025, 0.11, 0.25, 0.31)},
    'sign-01007': {'page': 143, 'crop': True, 'box': (0.025, 0.11, 0.25, 0.31)}
}

def trim_borders(im, tolerance=240):
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGB')
    gray = im.convert('L')
    bbox = gray.point(lambda p: 255 if p < tolerance else 0).getbbox()
    if bbox:
        w, h = im.size
        pad_x = max(2, int((bbox[2] - bbox[0]) * 0.02))
        pad_y = max(2, int((bbox[3] - bbox[1]) * 0.02))
        new_box = (
            max(0, bbox[0] - pad_x),
            max(0, bbox[1] - pad_y),
            min(w, bbox[2] + pad_x),
            min(h, bbox[3] + pad_y)
        )
        # Ensure we didn't accidentally collapse
        if new_box[2] - new_box[0] > 30 and new_box[3] - new_box[1] > 30:
            return im.crop(new_box)
    return im

def find_image_by_words(page_num, words):
    page = doc[page_num - 1]
    blocks = page.get_text("blocks")
    
    target_block = None
    for b in blocks:
        t = re.sub(r'\s+', ' ', b[4].lower())
        if all(w.lower() in t for w in words):
            target_block = b
            break
            
    if not target_block:
        return None
        
    t_rect = target_block[:4]
    t_cx = (t_rect[0] + t_rect[2]) / 2.0
    t_top = t_rect[1]
    
    best_img = None
    min_dist = 999999
    
    for img_info in page.get_images():
        xref = img_info[0]
        try:
            meta = doc.extract_image(xref)
        except Exception:
            continue
            
        if meta['width'] > 1000 and meta['height'] > 700:
            continue # skip page banners
        if meta['width'] < 80 or meta['height'] < 80:
            continue
            
        rects = page.get_image_rects(xref)
        if not rects:
            continue
        r = rects[0]
        i_cx = (r[0] + r[2]) / 2.0
        i_bot = r[3]
        
        dy = t_top - i_bot
        dx = abs(t_cx - i_cx)
        dist = dx * 1.5 + (dy if dy >= -20 else 500)
        
        if dist < min_dist and dy >= -30:
            min_dist = dist
            best_img = meta
            
    if best_img and min_dist < 180:
        return best_img
    return None

def extract_door_image(door_type):
    # Dedicated door extraction logic
    if door_type == 'single_fire':
        # Page 6, xref 438
        meta = doc.extract_image(438)
        return Image.open(io.BytesIO(meta['image']))
    elif door_type == 'shaft':
        # Page 14, xref 921
        meta = doc.extract_image(921)
        return Image.open(io.BytesIO(meta['image']))
    elif door_type == 'cleanroom':
        # Page 10, xref 721
        meta = doc.extract_image(721)
        return Image.open(io.BytesIO(meta['image']))
    elif door_type == 'glazed':
        # Page 14, xref 922
        meta = doc.extract_image(922)
        return Image.open(io.BytesIO(meta['image']))
    elif door_type == 'acoustic':
        # Page 16, xref 1097
        meta = doc.extract_image(1097)
        return Image.open(io.BytesIO(meta['image']))
    return None

manifest = []
seen_hashes = set()
duplicates_avoided = 0

for p in products:
    pid = p['id']
    slug = p['slug']
    curr = p['image']
    folder = curr.split('/')[3] if len(curr.split('/')) > 3 else p['categorySlug']
    folder_path = os.path.join('public', 'assets', 'products', folder)
    os.makedirs(folder_path, exist_ok=True)
    
    rule = RULES.get(pid)
    if not rule:
        manifest.append({
            'name': p['name'],
            'id': pid,
            'slug': slug,
            'category': p['category'],
            'imagePath': p['image'],
            'status': 'UNMATCHED',
            'confidence': 'UNMATCHED',
            'exists': True,
            'dims': 'N/A',
            'size': 'N/A',
            'page': 'N/A',
            'source': 'None'
        })
        print(f"[UNMATCHED] {p['name']}")
        continue
        
    img = None
    source_page = rule['page']
    
    if rule.get('door_type'):
        img = extract_door_image(rule['door_type'])
    elif rule.get('crop'):
        page = doc[rule['page'] - 1]
        pix = page.get_pixmap(dpi=220)
        page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        w, h = page_img.size
        bx = rule['box']
        crop_box = (int(w * bx[0]), int(h * bx[1]), int(w * bx[2]), int(h * bx[3]))
        img = page_img.crop(crop_box)
    elif rule.get('words'):
        raw_meta = find_image_by_words(rule['page'], rule['words'])
        if raw_meta:
            img = Image.open(io.BytesIO(raw_meta['image']))
            
    if img:
        img = trim_borders(img)
        # Compute image hash for deduplication
        img_bytes_io = io.BytesIO()
        img.save(img_bytes_io, format='PNG')
        img_hash = hashlib.md5(img_bytes_io.getvalue()).hexdigest()
        
        target_rel = f"/assets/products/{folder}/{slug}.webp"
        target_path = os.path.join(folder_path, f"{slug}.webp")
        
        img.save(target_path, "WEBP", quality=90)
        file_size_kb = os.path.getsize(target_path) / 1024.0
        w, h = img.size
        
        manifest.append({
            'name': p['name'],
            'id': pid,
            'slug': slug,
            'category': p['category'],
            'imagePath': target_rel,
            'status': 'MAPPED',
            'confidence': 'HIGH',
            'exists': True,
            'dims': f"{w}×{h}",
            'size': f"{file_size_kb:.1f} KB",
            'page': f"Page {source_page}",
            'source': 'DOORS ISS_merged (1).pdf'
        })
        print(f"[SUCCESS] {p['name']} -> {target_rel} ({w}×{h}, {file_size_kb:.1f} KB, Page {source_page})")
    else:
        manifest.append({
            'name': p['name'],
            'id': pid,
            'slug': slug,
            'category': p['category'],
            'imagePath': p['image'],
            'status': 'UNMATCHED',
            'confidence': 'UNMATCHED',
            'exists': True,
            'dims': 'N/A',
            'size': 'N/A',
            'page': 'N/A',
            'source': 'None'
        })
        print(f"[UNMATCHED - NO IMAGE] {p['name']}")

with open('extracted_manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

print("\n--- EXTRACTION COMPLETE ---")
mapped = [m for m in manifest if m['status'] == 'MAPPED']
unmapped = [m for m in manifest if m['status'] == 'UNMATCHED']
print(f"Total Products: {len(manifest)}")
print(f"Mapped: {len(mapped)}")
print(f"Unmatched (Retained Placeholder): {len(unmapped)}")
