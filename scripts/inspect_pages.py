import pymupdf

doc = pymupdf.open('DOORS ISS_merged (1).pdf')

def print_page_info(page_num):
    page = doc[page_num - 1]
    print(f"\n================ PAGE {page_num} ================")
    text = page.get_text()
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    print("TEXT PREVIEW (first 25 lines):")
    for l in lines[:25]:
        print("  ", l)
    images = page.get_images()
    print(f"IMAGES COUNT: {len(images)}")
    for img_idx, img in enumerate(images):
        xref = img[0]
        base_img = doc.extract_image(xref)
        w, h = base_img["width"], base_img["height"]
        ext = base_img["ext"]
        print(f"  Img #{img_idx} (xref {xref}): {w}x{h} ({ext})")

for p in [58, 59, 60, 61, 73, 98, 2, 6, 10, 14, 16]:
    print_page_info(p)
