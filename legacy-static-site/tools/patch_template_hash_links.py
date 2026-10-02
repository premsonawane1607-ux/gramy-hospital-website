# -*- coding: utf-8 -*-
# Applies the same fix as patch_hash_placeholder_links.py, but to the source
# template blocks under tools/template-blocks/ (used by generate_specialists.py
# to build the 14 specialist pages). Without this, regenerating the specialist
# pages would keep reintroducing the href="https://gramyhospital.com/#..."
# placeholder-link bug that was already fixed on the homepage. The one
# harmless exception is the inert "saved from url" HTML comment in
# A_head.html, which is left alone since comments cannot cause navigation.

import os

BLOCKS_DIR = r"D:\ho\tools\template-blocks"
OLD_PREFIX = 'href="https://gramyhospital.com/#'
NEW_PREFIX = 'href="#'

total = 0
for fname in sorted(os.listdir(BLOCKS_DIR)):
    if not fname.endswith(".html"):
        continue
    path = os.path.join(BLOCKS_DIR, fname)
    with open(path, "r", encoding="utf-8", newline="") as f:
        content = f.read()
    count = content.count(OLD_PREFIX)
    if count:
        content = content.replace(OLD_PREFIX, NEW_PREFIX)
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(content)
        print("%s: %d replacement(s)" % (fname, count))
        total += count

print("Total: %d replacements" % total)
