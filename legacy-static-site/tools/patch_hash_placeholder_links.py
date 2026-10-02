# -*- coding: utf-8 -*-
# Fixes the navigation bug where placeholder anchors (dropdown toggles, the
# "skip to content" link, doctor-tab anchor, social icons, and footer
# compliance links) were saved with an ABSOLUTE href pointing at the live
# site's own "#" fragment, e.g. href="https://gramyhospital.com/#". Clicking
# any of these navigates away to the live site instead of staying on the
# local page. The fix replaces only the domain prefix on these hash-fragment
# hrefs with a plain local "#", leaving every other href (real destination
# links like /privacy-policy/, /about-us/, the ./specialists/*.html links,
# etc.) completely untouched, since those don't match this exact pattern.

TARGET = r"D:\ho\Gramy Hospital.html"
OLD_PREFIX = 'href="https://gramyhospital.com/#'
NEW_PREFIX = 'href="#'

with open(TARGET, "r", encoding="utf-8", newline="") as f:
    lines = f.readlines()

changed_lines = []
total_replacements = 0
for i, line in enumerate(lines):
    count = line.count(OLD_PREFIX)
    if count:
        lines[i] = line.replace(OLD_PREFIX, NEW_PREFIX)
        changed_lines.append((i + 1, count))
        total_replacements += count

with open(TARGET, "w", encoding="utf-8", newline="") as f:
    f.writelines(lines)

print("Total replacements: %d across %d lines" % (total_replacements, len(changed_lines)))
for ln, count in changed_lines:
    print("  line %d: %d occurrence(s)" % (ln, count))
