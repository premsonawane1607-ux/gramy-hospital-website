# -*- coding: utf-8 -*-
import os, re
from bs4 import BeautifulSoup

ROOT = r"D:\ho"
SPEC_DIR = os.path.join(ROOT, "specialists")
SLUGS = [f[:-5] for f in os.listdir(SPEC_DIR) if f.endswith(".html")]

errors = []
warnings = []

for slug in SLUGS:
    path = os.path.join(SPEC_DIR, slug + ".html")
    with open(path, encoding="utf-8") as f:
        content = f.read()
    soup = BeautifulSoup(content, "html.parser")

    # 1. Every <img src="../Gramy Hospital_files/..."> must resolve to a real file
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if src.startswith("../Gramy Hospital_files/") or src.startswith("./Gramy Hospital_files/"):
            rel = src.replace("../", "").replace("./", "")
            fpath = os.path.join(ROOT, rel.replace("/", os.sep))
            if not os.path.isfile(fpath):
                errors.append(f"{slug}: BROKEN IMAGE {src}")

    # 2. Every internal specialist link (./xxx.html) must point to a real sibling file
    for a in soup.find_all("a"):
        href = a.get("href", "")
        if href.startswith("./") and href.endswith(".html") and "/" not in href[2:]:
            target = href[2:-5]
            if target not in SLUGS:
                errors.append(f"{slug}: BROKEN INTERNAL LINK {href}")

    # 3. Home link must resolve
    for a in soup.find_all("a"):
        href = a.get("href", "")
        if href == "../Gramy Hospital.html":
            if not os.path.isfile(os.path.join(ROOT, "Gramy Hospital.html")):
                errors.append(f"{slug}: BROKEN HOME LINK")

    # 4. Must have exactly one <h1>, a title tag, canonical link
    h1s = soup.find_all("h1")
    if len(h1s) != 1:
        warnings.append(f"{slug}: found {len(h1s)} <h1> tags (expected 1)")
    if not soup.title or not soup.title.get_text(strip=True):
        errors.append(f"{slug}: missing <title>")

    # 5. head/header/footer must be present
    if not soup.select_one("header#masthead"):
        errors.append(f"{slug}: missing header#masthead")
    if not soup.select_one("footer#colophon"):
        errors.append(f"{slug}: missing footer#colophon")

    # 6. CSS/JS asset link/script tags must resolve
    for tag in soup.find_all(["link", "script"]):
        attr = "href" if tag.name == "link" else "src"
        src = tag.get(attr, "")
        if src.startswith("../Gramy Hospital_files/"):
            rel = src.replace("../", "")
            fpath = os.path.join(ROOT, rel.replace("/", os.sep))
            if not os.path.isfile(fpath):
                errors.append(f"{slug}: BROKEN ASSET {attr}={src}")

print(f"Checked {len(SLUGS)} pages.")
print(f"\n=== ERRORS ({len(errors)}) ===")
for e in errors:
    print(" -", e)
print(f"\n=== WARNINGS ({len(warnings)}) ===")
for w in warnings:
    print(" -", w)

# 7. Cross-check homepage patched links resolve too
home_path = os.path.join(ROOT, "Gramy Hospital.html")
with open(home_path, encoding="utf-8") as f:
    home = f.read()
home_soup = BeautifulSoup(home, "html.parser")
home_errors = []
for a in home_soup.find_all("a"):
    href = a.get("href", "")
    if href.startswith("./specialists/"):
        target = href[len("./specialists/"):-5]
        if target not in SLUGS:
            home_errors.append(f"homepage: BROKEN LINK {href}")
        else:
            fpath = os.path.join(SPEC_DIR, target + ".html")
            if not os.path.isfile(fpath):
                home_errors.append(f"homepage: FILE MISSING for {href}")
print(f"\n=== HOMEPAGE LINK CHECK ({len(home_errors)} errors) ===")
for e in home_errors:
    print(" -", e)

total_bad = len(errors) + len(home_errors)
print(f"\nTOTAL ERRORS: {total_bad}")
