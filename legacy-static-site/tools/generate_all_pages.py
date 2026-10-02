# -*- coding: utf-8 -*-
"""
Generates local static HTML for every page discovered in the live sitemap
crawl (tools/all_pages_data.json), reusing the same shared header/footer/
head/script template blocks as the 14 hand-built specialist pages
(tools/generate_specialists.py). Output is organized by content type:

    pages/<slug>.html              generic WP "page" content (About, Contact,
                                    Gallery, treatment/department pages, ...)
    doctors/<slug>.html            individual doctor profiles
    services/<slug>.html           "services" CPT
    labtest/<slug>.html            "labtest" CPT
    career/<slug>.html             "career" CPT (job postings)
    events/<slug>.html             "event" CPT
    blog/<slug>.html               blog posts
    doctor-categories/<slug>.html  doctor taxonomy archives (filtered doctor
                                    listing pages)
    taxonomy/<slug>.html           the handful of leftover taxonomy pages
                                    (blog category/tag, services category,
                                    doctor facility)

All 14 existing hand-built specialist pages (tools/specialists_data.json)
and the homepage are left untouched.
"""
import os, re, json, html
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, "tools")
BLOCKS = os.path.join(TOOLS, "template-blocks")
IMG_DIR = os.path.join(ROOT, "Gramy Hospital_files", "site")

SPECIALIST_SLUGS = {
    "cosmetic-gynaecology", "cosmetic-surgery", "ent-surgery", "general-surgery",
    "robotic-surgery", "gynecology", "orthopedic-surgery", "neurology",
    "aesthetic-medicine", "prp-cartilage-rejuvenation", "neurosurgery",
    "plastic-surgery", "urology", "anti-ageing-nutrition-medicine",
}


def read(name):
    with open(os.path.join(BLOCKS, name), encoding="utf-8") as f:
        return f.read()


A_head = read("A_head.html")
B_body = read("B_bodyopen.html")
C_header = read("C_header.html")
D_footer = read("D_footer.html")
E_scripts = read("E_scripts.html")

DATA = json.load(open(os.path.join(TOOLS, "all_pages_data.json"), encoding="utf-8"))

# ---- reuse the exact nav link-patcher from generate_specialists.py ----
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
DESKTOP_OFFSETS = [90, 95, 100, 105, 110, 120, 125, 130, 135, 140, 150, 155, 160, 165]

MOBILE_SLUGS = [
    "cosmetic-gynaecology", "cosmetic-surgery", "ent-surgery", "general-surgery",
    "gynecology", "orthopedic-surgery", "neurosurgery", "neurology",
    "plastic-surgery", "urology",
]
MOBILE_OFFSETS = [260, 261, 262, 263, 264, 265, 266, 267, 268, 269]


# ---- category -> (out folder, slug prefix to strip, doctors-section heading) ----
CATEGORY_MAP = {
    "posts-services-1": ("services", "services-post__", "Related Doctors"),
    "posts-labtest-1": ("labtest", "labtest-post__", "Related Doctors"),
    "posts-career-1": ("career", "career-post__", None),
    "posts-event-1": ("events", "event-post__", None),
    "posts-post-1": ("blog", "", "Related Doctors"),
    "taxonomies-doctors_cat-1": ("doctor-categories", "doctors-category__", None),
    "taxonomies-category-1": ("taxonomy", "", None),
    "taxonomies-post_tag-1": ("taxonomy", "tag__", None),
    "taxonomies-doctors_facility-1": ("taxonomy", "", None),
    "taxonomies-services_cat-1": ("taxonomy", "", None),
}


def strip_prefix(slug, prefix):
    return slug[len(prefix):] if prefix and slug.startswith(prefix) else slug


# ---- build a global live-slug -> local folder map, used to patch every
# other nav/menu link in the header/footer templates (and the homepage)
# that isn't covered by the hand-picked desktop/mobile specialty patch
# above. Keyed by the single path segment WordPress used for the page
# (e.g. "about-us", "ent", "dr-jamal-akhtar-azmi").
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
        _folder, _prefix, _ = CATEGORY_MAP[_cat]
        LOCAL_SLUG_MAP[strip_prefix(_d["slug"], _prefix)] = _folder

LINK_RE = re.compile(r'href="https://gramyhospital\.com/([a-zA-Z0-9_-]+)/?"')


def patch_generic_links(text, base_prefix):
    def repl(m):
        slug = m.group(1)
        folder = LOCAL_SLUG_MAP.get(slug)
        if not folder:
            return m.group(0)
        return 'href="%s%s/%s.html"' % (base_prefix, folder, slug)
    return LINK_RE.sub(repl, text)


def build_header(base_prefix):
    lines = C_header.split("\n")

    def target(slug):
        return "../specialists/" + slug + ".html"

    for (slug, encoded), ln in zip(DESKTOP_SLUGS, DESKTOP_OFFSETS):
        idx = ln - 1
        old = 'href="https://gramyhospital.com/' + encoded + '/"'
        new = 'href="' + target(slug) + '"'
        if old in lines[idx]:
            lines[idx] = lines[idx].replace(old, new)

    for slug, ln in zip(MOBILE_SLUGS, MOBILE_OFFSETS):
        idx = ln - 1
        old = 'href="https://gramyhospital.com/' + slug + '/"'
        new = 'href="' + target(slug) + '"'
        if old in lines[idx]:
            lines[idx] = lines[idx].replace(old, new)

    text = "\n".join(lines)
    text = patch_generic_links(text, "../")
    text = text.replace("./Gramy Hospital_files/", base_prefix + "Gramy Hospital_files/")
    return text


HEADER_HTML = build_header("../")

_local_files = set(os.listdir(IMG_DIR)) if os.path.isdir(IMG_DIR) else set()


def local_img(url):
    if not url:
        return None
    fname = os.path.basename(urlparse(url).path).replace(" ", "-")
    return fname if fname in _local_files else None


def esc(s):
    return html.escape(s or "", quote=True)


# ---- name -> local doctor profile slug, for cross-linking doctor cards ----
DOCTOR_SLUG_BY_NAME = {}
for key, d in DATA.items():
    if d.get("category") == "posts-doctors-1" and d.get("name"):
        DOCTOR_SLUG_BY_NAME[d["name"].strip()] = strip_prefix(d["slug"], "doctors-post__")


def render_body_nodes(nodes):
    out = []
    for n in nodes:
        if n["type"] in ("h2", "h3", "h4"):
            out.append("<%s>%s</%s>" % (n["type"], esc(n["text"]), n["type"]))
        elif n["type"] == "p":
            out.append("<p>%s</p>" % esc(n["text"]))
        elif n["type"] in ("ul", "ol"):
            items = "".join("<li>%s</li>" % esc(i) for i in n["items"])
            out.append("<%s>%s</%s>" % (n["type"], items, n["type"]))
    return "\n".join(out)


def render_images_grid(image_urls, alt):
    imgs = []
    for u in image_urls:
        f = local_img(u)
        if f:
            imgs.append(f)
    if not imgs:
        return ""
    cells = "".join(
        '<div class="col-lg-4 col-md-6 mb-4"><img decoding="async" loading="lazy" '
        'src="../Gramy Hospital_files/site/%s" alt="%s" '
        'style="width:100%%;height:220px;object-fit:cover;border-radius:10px;"></div>' % (f, esc(alt))
        for f in imgs
    )
    return '<div class="row">%s</div>' % cells


DOCTOR_CARD_TMPL = """
            <div class="doctor-card">
                <div class="doctor-image">
                    %(img_tag)s
                    <div class="doctor-btn">
                        <a class="default-btn" href="tel:02235347300"><i class="ti ti-circle-arrow-right-filled"></i>Book an appointment</a>
                    </div>
                </div>
                <div class="doctor-content">
                    <h3>%(name_html)s</h3>
                    <span>%(designation)s</span>
                </div>
            </div>"""

DOCTORS_SECTION_TMPL = """
<div class="ptb-100" style="background-color:#F7F8FC;">
  <div class="container">
    <div class="doctor-slider-inner">
      <h2>%(heading)s</h2>
      <style>
        .doctor-slider.owl-loaded{display:flex;flex-wrap:wrap;gap:24px;}
        .doctor-slider.owl-loaded .doctor-card{flex:1 1 260px;max-width:300px;margin-bottom:0;}
        @media (max-width:767px){.doctor-slider.owl-loaded .doctor-card{flex:1 1 100%%;max-width:100%%;}}
      </style>
      <div class="slider-middle">
        <div class="doctor-slider ser-doctor-slider owl-carousel owl-theme owl-loaded">
          %(cards)s
        </div>
      </div>
    </div>
  </div>
</div>"""


def render_doctor_cards(cards, heading):
    if not cards:
        return ""
    rendered = []
    for d in cards:
        img = local_img(d.get("img"))
        img_tag = ""
        if img:
            img_tag = '<img decoding="async" src="../Gramy Hospital_files/site/%s" alt="%s">' % (img, esc(d["name"]))
        slug = DOCTOR_SLUG_BY_NAME.get(d["name"].strip())
        name_html = esc(d["name"])
        if slug:
            name_html = '<a href="../doctors/%s.html">%s</a>' % (slug, esc(d["name"]))
        rendered.append(DOCTOR_CARD_TMPL % {
            "img_tag": img_tag,
            "name_html": name_html,
            "designation": esc(d["designation"]),
        })
    return DOCTORS_SECTION_TMPL % {"heading": esc(heading), "cards": "".join(rendered)}


BANNER_TMPL = """
<div class="page-banner-area">
    <div class="container-fluid">
        <div class="page-banner-inner without-image" style="margin:40px auto 0;">
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-8 col-md-12">
                    <div class="content">
                        <h1>%(title)s</h1>
                        <ul class="list">
                            <li><a href="../Gramy Hospital.html">Home</a></li>
                            <li>%(title)s</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <ul class="information">
                        <li>
                            <div class="phone-btn">
                                <div class="icon"><i class="ti ti-phone-call"></i></div>
                                <span>CALL: <a href="tel:022-35347300">+91 22-35347300</a></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>"""

BODY_TMPL = """
<div class="page-area ptb-100">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                %(hero_html)s
                %(body_nodes)s
                %(images_grid)s
            </div>
        </div>
    </div>
</div>"""

NO_CONTENT_NOTE = (
    '<p style="color:#888;font-style:italic;">'
    "This page is interactive/dynamic on the live site (a form, account, or cart flow) "
    "and has no static content to reproduce here. See the "
    '<a href="tel:022-35347300">phone contact</a> options instead.</p>'
)


def render_page_content(d, heading_for_doctors="Related Doctors"):
    title = d.get("title") or d["slug"]
    hero = local_img(d.get("hero_img"))
    hero_html = ""
    if hero:
        hero_html = ('<div class="text-center mb-4">'
                     '<img decoding="async" src="../Gramy Hospital_files/site/%s" '
                     'alt="%s" style="max-width:100%%;height:auto;border-radius:10px;">'
                     '</div>') % (hero, esc(title))

    body_nodes_html = render_body_nodes(d.get("body_nodes") or [])
    images_grid = render_images_grid(d.get("images") or [], title)

    if not hero_html and not body_nodes_html and not images_grid and not d.get("doctor_cards"):
        body_nodes_html = NO_CONTENT_NOTE

    banner = BANNER_TMPL % {"title": esc(title)}
    body = BODY_TMPL % {"hero_html": hero_html, "body_nodes": body_nodes_html, "images_grid": images_grid}
    doctors = render_doctor_cards(d.get("doctor_cards") or [], heading_for_doctors)

    return banner + body + doctors


# ---- doctor profile (bespoke) ----

DOCTOR_INFO_ORDER = ["qualifications", "experience", "phone", "location", "affiliated hospitals"]
DOCTOR_INFO_ICONS = {
    "qualifications": "ti-files",
    "experience": "ti-calendar-stats",
    "phone": "ti-phone-call",
    "location": "ti-map-pin",
    "affiliated hospitals": "ti-building-hospital",
}

DOCTOR_PROFILE_TMPL = """
<div class="page-area ptb-100">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 mb-4">
                %(img_html)s
                <ul class="list" style="list-style:none;padding:0;margin-top:20px;">
                    %(info_items)s
                </ul>
                <a class="default-btn" href="tel:02235347300" style="display:inline-block;margin-top:10px;">
                    <i class="ti ti-circle-arrow-right-filled"></i>Book an appointment</a>
            </div>
            <div class="col-lg-8 col-md-12">
                <h1>%(name)s</h1>
                <p style="color:#0B55E5;font-weight:600;">%(tags_line)s</p>
                %(about_html)s
                %(expertise_html)s
            </div>
        </div>
    </div>
</div>"""


def render_doctor_profile(d):
    name = d.get("name") or d["slug"]
    img = local_img(d.get("img"))
    img_html = ""
    if img:
        img_html = ('<img decoding="async" src="../Gramy Hospital_files/site/%s" alt="%s" '
                    'style="width:100%%;border-radius:10px;">') % (img, esc(name))

    info = d.get("info") or {}
    info_items = []
    for key in DOCTOR_INFO_ORDER:
        val = info.get(key)
        if not val:
            continue
        icon = DOCTOR_INFO_ICONS.get(key, "ti-info-circle")
        label = key.title()
        info_items.append(
            '<li style="margin-bottom:10px;"><i class="ti %s"></i> <strong>%s:</strong> %s</li>'
            % (icon, esc(label), esc(val))
        )

    about_html = ""
    about = d.get("about") or []
    if about:
        about_html = "<h3>About</h3>" + "".join("<p>%s</p>" % esc(p) for p in about)

    expertise_html = ""
    expertise = d.get("expertise") or []
    if expertise:
        expertise_html = "<h3>Areas of Expertise</h3><ul>" + "".join(
            "<li>%s</li>" % esc(e) for e in expertise
        ) + "</ul>"

    banner = BANNER_TMPL % {"title": esc(name)}
    body = DOCTOR_PROFILE_TMPL % {
        "img_html": img_html,
        "info_items": "".join(info_items),
        "name": esc(name),
        "tags_line": esc(d.get("tags_line") or ""),
        "about_html": about_html,
        "expertise_html": expertise_html,
    }
    return banner + body


def build_page(title_for_head, slug, content_html):
    head = A_head.replace("./Gramy Hospital_files/", "../Gramy Hospital_files/")
    head = head.replace("<title>Gramy Hospital</title>", "<title>%s – Gramy Hospital</title>" % esc(title_for_head))
    head = head.replace(
        '<link rel="canonical" href="https://gramyhospital.com/">',
        '<link rel="canonical" href="https://gramyhospital.com/%s/">' % slug,
    )
    body_open = B_body
    footer = patch_generic_links(D_footer, "../")
    footer = footer.replace("./Gramy Hospital_files/", "../Gramy Hospital_files/")
    scripts = E_scripts.replace("./Gramy Hospital_files/", "../Gramy Hospital_files/")
    return head + "\n" + body_open + "\n" + HEADER_HTML + "\n" + content_html + "\n" + footer + "\n" + scripts


def write_page(out_dir, out_slug, title, content_html):
    os.makedirs(out_dir, exist_ok=True)
    page_html = build_page(title, out_slug, content_html)
    out_path = os.path.join(out_dir, out_slug + ".html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(page_html)
    return len(page_html)


def main():
    counts = {}
    skipped = 0
    for key, d in DATA.items():
        category = d["category"]

        if category == "posts-doctors-1":
            out_slug = strip_prefix(d["slug"], "doctors-post__")
            out_dir = os.path.join(ROOT, "doctors")
            content = render_doctor_profile(d)
            write_page(out_dir, out_slug, d.get("name") or out_slug, content)
            counts["doctors"] = counts.get("doctors", 0) + 1
            continue

        if category == "posts-page-1":
            slug = d["slug"]
            if slug == "__home__" or slug in SPECIALIST_SLUGS:
                skipped += 1
                continue
            out_dir = os.path.join(ROOT, "pages")
            content = render_page_content(d)
            write_page(out_dir, slug, d.get("title") or slug, content)
            counts["pages"] = counts.get("pages", 0) + 1
            continue

        if category in CATEGORY_MAP:
            folder, prefix, doc_heading = CATEGORY_MAP[category]
            out_slug = strip_prefix(d["slug"], prefix) if prefix else d["slug"]
            out_dir = os.path.join(ROOT, folder)
            heading = doc_heading if doc_heading else "Related Doctors"
            content = render_page_content(d, heading_for_doctors=heading)
            write_page(out_dir, out_slug, d.get("title") or out_slug, content)
            counts[folder] = counts.get(folder, 0) + 1
            continue

        print("UNMAPPED category:", category, key)

    print("Skipped (already built / homepage):", skipped)
    for folder, n in sorted(counts.items()):
        print(folder, ":", n, "pages")
    print("Total written:", sum(counts.values()))


if __name__ == "__main__":
    main()
