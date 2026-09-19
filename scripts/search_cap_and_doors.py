import pymupdf
import sys

# force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

doc = pymupdf.open('DOORS ISS_merged (1).pdf')

print("--- SEARCH FOR BUMP CAP & HEAD PROTECTION ---")
for i, page in enumerate(doc):
    txt = (page.get_text() or '').lower()
    if 'bump' in txt or 'baseball' in txt or 'cap' in txt:
        lines = [l.strip() for l in txt.split('\n') if any(k in l.lower() for k in ['bump', 'baseball', 'cap', 'hat'])]
        if lines:
            print(f"Page {i+1}: {lines}")

print("\n--- SEARCH FOR HMPS & DOORS ---")
for i, page in enumerate(doc):
    txt = (page.get_text() or '').lower()
    if any(k in txt for k in ['hmps', 'double leaf', 'pressed steel', 'utility door', 'double door', 'flush door', 'steel door']):
        lines = [l.strip() for l in txt.split('\n') if any(k in l.lower() for k in ['hmps', 'double', 'leaf', 'pressed', 'utility', 'flush'])]
        if lines:
            print(f"Page {i+1}: {lines[:5]}")
