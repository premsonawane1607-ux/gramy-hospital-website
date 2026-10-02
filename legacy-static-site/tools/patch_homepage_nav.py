# -*- coding: utf-8 -*-
# Patches ONLY the 14 desktop "Specialities" dropdown hrefs and the 10 matching
# mobile "Top Pages" flyout hrefs in the existing Gramy Hospital.html, changing
# them from the live gramyhospital.com URLs to local ./specialists/<slug>.html
# links. Nothing else in the file is touched.

TARGET = r"D:\ho\Gramy Hospital.html"

DESKTOP_SLUGS = [
    ("cosmetic-gynaecology", "cosmetic-gynaecology"),
    ("cosmetic-surgery", "cosmetic-surgery"),
    ("ent-surgery", "ent-surgery"),
    ("general-surgery", "general-surgery"),
    ("robotic-surgery", "robotic-surgery"),
    ("gynecology", "gynecology"),
    ("orthopedic-surgery", "orthopedic-surgery"),
    ("neurology", "neurology"),
    ("aesthetic-medicine", "aesthetic-medicine"),
    ("prp-cartilage-rejuvenation", "%e2%81%a0prp-cartilage-rejuvenation"),
    ("neurosurgery", "neurosurgery"),
    ("plastic-surgery", "plastic-surgery"),
    ("urology", "urology"),
    ("anti-ageing-nutrition-medicine", "anti-ageing-nutrition-medicine"),
]
DESKTOP_LINES = [366, 371, 376, 381, 386, 396, 401, 406, 411, 416, 426, 431, 436, 441]

MOBILE_SLUGS = [
    "cosmetic-gynaecology", "cosmetic-surgery", "ent-surgery", "general-surgery",
    "gynecology", "orthopedic-surgery", "neurosurgery", "neurology",
    "plastic-surgery", "urology",
]
MOBILE_LINES = [536, 537, 538, 539, 540, 541, 542, 543, 544, 545]

with open(TARGET, "r", encoding="utf-8", newline="") as f:
    lines = f.readlines()

changes = []

for (slug, encoded), ln in zip(DESKTOP_SLUGS, DESKTOP_LINES):
    idx = ln - 1
    old = 'href="https://gramyhospital.com/' + encoded + '/"'
    new = 'href="./specialists/' + slug + '.html"'
    assert old in lines[idx], "DESKTOP MISMATCH at line %d: %r" % (ln, lines[idx])
    lines[idx] = lines[idx].replace(old, new)
    changes.append((ln, old, new))

for slug, ln in zip(MOBILE_SLUGS, MOBILE_LINES):
    idx = ln - 1
    old = 'href="https://gramyhospital.com/' + slug + '/"'
    new = 'href="./specialists/' + slug + '.html"'
    assert old in lines[idx], "MOBILE MISMATCH at line %d: %r" % (ln, lines[idx])
    lines[idx] = lines[idx].replace(old, new)
    changes.append((ln, old, new))

with open(TARGET, "w", encoding="utf-8", newline="") as f:
    f.writelines(lines)

print("Applied %d href changes to %s" % (len(changes), TARGET))
for ln, old, new in changes:
    print("  line %d: %s -> %s" % (ln, old, new))
