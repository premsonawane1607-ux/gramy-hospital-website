# -*- coding: utf-8 -*-
# Patches ONLY the 3 overlapping "OUR SERVICES" grid cards (Surgery, Neurology,
# Anti-Ageing Nutrition Medicine) so their hrefs point to the local specialist
# pages instead of the live site. Nothing else in the file is touched.

TARGET = r"D:\ho\Gramy Hospital.html"

# (line number, old href, new href)
CHANGES = [
    (1010, 'href="https://gramyhospital.com/general-surgery"', 'href="./specialists/general-surgery.html"'),
    (1014, 'href="https://gramyhospital.com/general-surgery"', 'href="./specialists/general-surgery.html"'),
    (1046, 'href="https://gramyhospital.com/neurology"', 'href="./specialists/neurology.html"'),
    (1050, 'href="https://gramyhospital.com/neurology"', 'href="./specialists/neurology.html"'),
    (1082, 'href="https://gramyhospital.com/anti-ageing-nutrition-medicine"', 'href="./specialists/anti-ageing-nutrition-medicine.html"'),
    (1086, 'href="https://gramyhospital.com/anti-ageing-nutrition-medicine"', 'href="./specialists/anti-ageing-nutrition-medicine.html"'),
]

with open(TARGET, "r", encoding="utf-8", newline="") as f:
    lines = f.readlines()

for ln, old, new in CHANGES:
    idx = ln - 1
    assert old in lines[idx], "MISMATCH at line %d: %r" % (ln, lines[idx])
    lines[idx] = lines[idx].replace(old, new)

with open(TARGET, "w", encoding="utf-8", newline="") as f:
    f.writelines(lines)

print("Applied %d href changes to %s" % (len(CHANGES), TARGET))
for ln, old, new in CHANGES:
    print("  line %d: %s -> %s" % (ln, old, new))
