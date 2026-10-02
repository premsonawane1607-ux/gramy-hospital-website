# -*- coding: utf-8 -*-
import os, re

ROOT = r"D:\ho"
CSS_DIR = os.path.join(ROOT, "Gramy Hospital_files")

BROKEN = [
    "../assets/images/blog/blog1.jpg", "../assets/images/blog/blog3.jpg", "../assets/images/blog/blog9.jpg",
    "../assets/images/calendar-bg.jpg",
    "Gramy Hospital_files/default-skin.png", "Gramy Hospital_files/default-skin.svg",
    "Gramy Hospital_files/owl.video.play.png", "Gramy Hospital_files/preloader.gif",
    "assets/img/arrow.png",
    "fonts/WooCommerce.ttf", "fonts/WooCommerce.woff", "fonts/WooCommerce.woff2",
    "fonts/eicons.eot", "fonts/eicons.svg", "fonts/eicons.ttf", "fonts/eicons.woff", "fonts/eicons.woff2",
    "fonts/fontawesome-webfont.eot", "fonts/fontawesome-webfont.svg", "fonts/fontawesome-webfont.ttf",
    "fonts/fontawesome-webfont.woff", "fonts/fontawesome-webfont.woff2",
    "fonts/tabler-icons.eot",
    "images/child-care-hospital/banner/bg.jpg", "images/child-care-hospital/cta-bg.jpg",
    "images/dental-clinic/banner-bg.jpg",
    "images/general-hospital/banner-bg1.jpg", "images/general-hospital/banner-bg2.jpg",
    "images/icons/credit-cards/amex.svg", "images/icons/credit-cards/diners.svg",
    "images/icons/credit-cards/discover.svg", "images/icons/credit-cards/jcb.svg",
    "images/icons/credit-cards/laser.svg", "images/icons/credit-cards/maestro.svg",
    "images/icons/credit-cards/mastercard.svg", "images/icons/credit-cards/visa.svg",
    "images/icons/loader.svg",
    "images/lab-test/lab-test.jpg", "images/map.jpg", "images/medical-center/banner-bg.jpg",
    "images/solution/solution.jpg",
    "img/cross-btn.png",
    "webfonts/fa-brands-400.eot", "webfonts/fa-brands-400.svg", "webfonts/fa-brands-400.ttf",
    "webfonts/fa-brands-400.woff", "webfonts/fa-brands-400.woff2",
    "webfonts/fa-solid-900.eot", "webfonts/fa-solid-900.svg", "webfonts/fa-solid-900.ttf",
    "webfonts/fa-solid-900.woff", "webfonts/fa-solid-900.woff2",
]

# search every css file for the basename of each broken url, report file + a chunk of context
def basename(p):
    return p.split("/")[-1]

css_files = [f for f in os.listdir(CSS_DIR) if f.lower().endswith(".css")]

results = {}
for b in BROKEN:
    bn = basename(b)
    hits = []
    for cf in css_files:
        path = os.path.join(CSS_DIR, cf)
        with open(path, encoding="utf-8", errors="ignore") as f:
            content = f.read()
        idx = content.find(bn)
        if idx == -1:
            continue
        # grab selector context: look backwards for the nearest '}' before this url, then forward to '}'
        start = content.rfind("}", 0, idx)
        start = start + 1 if start != -1 else max(0, idx - 200)
        end = content.find("}", idx)
        end = end + 1 if end != -1 else idx + 100
        snippet = content[start:end].strip()
        # also grab the selector before this rule (previous '{')
        rule_start = content.rfind("{", 0, idx)
        sel_start = content.rfind("}", 0, rule_start)
        sel_start = sel_start + 1 if sel_start != -1 else max(0, rule_start - 150)
        selector = content[sel_start:rule_start].strip()
        hits.append((cf, selector[-200:], snippet[:250]))
    results[b] = hits

for b, hits in results.items():
    print("=" * 70)
    print("BROKEN:", b)
    if not hits:
        print("  NOT FOUND in any linked CSS file (basename search failed)")
    for cf, selector, snippet in hits:
        print(f"  in {cf}")
        print(f"    selector: {selector}")
        print(f"    rule: {snippet}")
