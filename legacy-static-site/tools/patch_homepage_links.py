# -*- coding: utf-8 -*-
"""
Patches every remaining https://gramyhospital.com/<slug>/ href in the
homepage (Gramy Hospital.html and index.html, byte-identical) to point at
the corresponding local page, using the same slug -> local-folder map built
by generate_all_pages.py from tools/all_pages_data.json. Only hrefs whose
slug matches a page that actually exists locally are touched; anything else
(live-only endpoints, WordPress admin links, etc.) is left as-is.

Does NOT touch the 14 specialty dropdown links, which were already patched
by patch_homepage_nav.py in an earlier session.
"""
import os, re, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, "tools")

SPECIALIST_SLUGS = {
    "cosmetic-gynaecology", "cosmetic-surgery", "ent-surgery", "general-surgery",
    "robotic-surgery", "gynecology", "orthopedic-surgery", "neurology",
    "aesthetic-medicine", "prp-cartilage-rejuvenation", "neurosurgery",
    "plastic-surgery", "urology", "anti-ageing-nutrition-medicine",
}

CATEGORY_MAP = {
    "posts-services-1": ("services", "services-post__"),
    "posts-labtest-1": ("labtest", "labtest-post__"),
    "posts-career-1": ("career", "career-post__"),
    "posts-event-1": ("events", "event-post__"),
    "posts-post-1": ("blog", ""),
    "taxonomies-doctors_cat-1": ("doctor-categories", "doctors-category__"),
    "taxonomies-category-1": ("taxonomy", ""),
    "taxonomies-post_tag-1": ("taxonomy", "tag__"),
    "taxonomies-doctors_facility-1": ("taxonomy", ""),
    "taxonomies-services_cat-1": ("taxonomy", ""),
}


def strip_prefix(slug, prefix):
    return slug[len(prefix):] if prefix and slug.startswith(prefix) else slug


DATA = json.load(open(os.path.join(TOOLS, "all_pages_data.json"), encoding="utf-8"))

LOCAL_SLUG_MAP = {}
for slug in SPECIALIST_SLUGS:
    LOCAL_SLUG_MAP[slug] = "specialists"
for _key, _d in DATA.items():
    _cat = _d["category"]
    if _cat == "posts-doctors-1":
        LOCAL_SLUG_MAP[strip_prefix(_d["slug"], "doctors-post__")] = "doctors"
    elif _cat == "posts-page-1":
        if _d["slug"] not in ("__home__",) and _d["slug"] not in SPECIALIST_SLUGS:
            LOCAL_SLUG_MAP[_d["slug"]] = "pages"
    elif _cat in CATEGORY_MAP:
        _folder, _prefix = CATEGORY_MAP[_cat]
        LOCAL_SLUG_MAP[strip_prefix(_d["slug"], _prefix)] = _folder

LINK_RE = re.compile(r'href="https://gramyhospital\.com/([a-zA-Z0-9_-]+)/?"')


def patch(text):
    n = 0

    def repl(m):
        nonlocal n
        slug = m.group(1)
        folder = LOCAL_SLUG_MAP.get(slug)
        if not folder:
            return m.group(0)
        n += 1
        return 'href="./%s/%s.html"' % (folder, slug)
    new_text = LINK_RE.sub(repl, text)
    return new_text, n


for fname in ["Gramy Hospital.html", "index.html"]:
    path = os.path.join(ROOT, fname)
    with open(path, encoding="utf-8") as f:
        text = f.read()
    new_text, n = patch(text)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_text)
    print("Patched", n, "links in", fname)
