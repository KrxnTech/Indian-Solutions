import pymupdf

doc = pymupdf.open('DOORS ISS_merged (1).pdf')

for p in [58, 59, 60, 61]:
    page = doc[p - 1]
    print(f"\n================ PAGE {p} ================")
    text = page.get_text()
    for line in text.split('\n'):
        if line.strip():
            print("  ", line.strip())
    images = page.get_images()
    print(f"IMAGES COUNT: {len(images)}")
    for img_idx, img in enumerate(images):
        xref = img[0]
        base_img = doc.extract_image(xref)
        w, h = base_img["width"], base_img["height"]
        ext = base_img["ext"]
        print(f"  Img #{img_idx} (xref {xref}): {w}x{h} ({ext})")
