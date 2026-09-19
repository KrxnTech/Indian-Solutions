import urllib.request

urls = [
    'http://localhost:5173/assets/products/body-protection/heavy-cotton-industrial-boiler-suit.webp',
    'http://localhost:5173/assets/products/body-protection/high-visibility-reflective-jacket.webp',
    'http://localhost:5173/assets/products/body-protection/chemical-splash-protective-pvc-suit.webp',
    'http://localhost:5173/assets/products/body-protection/leather-welding-apron.webp',
    'http://localhost:5173/assets/products/body-protection/flame-retardant-fr-cotton-coverall.webp',
    'http://localhost:5173/assets/products/head-protection/lightweight-industrial-bump-cap.webp',
    'http://localhost:5173/assets/products/special-products/emergency-escape-breathing-apparatus-eebd.webp',
    'http://localhost:5173/assets/products/fire-doors/hmps-non-fire-rated-double-door.webp'
]

for u in urls:
    try:
        resp = urllib.request.urlopen(u)
        ct = resp.headers.get("Content-Type")
        length = len(resp.read())
        print(f"[{resp.getcode()}] {ct} ({length} bytes) : {u}")
    except Exception as e:
        print(f"ERROR {u} -> {e}")
