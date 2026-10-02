# -*- coding: utf-8 -*-
import json, os, re, html
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOCKS = os.path.join(ROOT, "tools", "template-blocks")
TOOLS = os.path.join(ROOT, "tools")


def read(name):
    with open(os.path.join(BLOCKS, name), encoding="utf-8") as f:
        return f.read()


A_head = read("A_head.html")
B_body = read("B_bodyopen.html")
C_header = read("C_header.html")
D_footer = read("D_footer.html")
E_scripts = read("E_scripts.html")

data = json.load(open(os.path.join(TOOLS, "specialists_data.json"), encoding="utf-8"))

# nav-order slug list with the exact encoded href fragment used on the live/local site
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


def build_header(base_prefix, page_context):
    """page_context: 'root' (homepage) or 'specialist' (inside /specialists/)"""
    lines = C_header.split("\n")

    def target(slug):
        if page_context == "root":
            return "./specialists/" + slug + ".html"
        else:
            return "./" + slug + ".html"

    for (slug, encoded), ln in zip(DESKTOP_SLUGS, DESKTOP_OFFSETS):
        idx = ln - 1
        old = 'href="https://gramyhospital.com/' + encoded + '/"'
        new = 'href="' + target(slug) + '"'
        assert old in lines[idx], "desktop mismatch at %d: %r" % (ln, lines[idx])
        lines[idx] = lines[idx].replace(old, new)

    for slug, ln in zip(MOBILE_SLUGS, MOBILE_OFFSETS):
        idx = ln - 1
        old = 'href="https://gramyhospital.com/' + slug + '/"'
        new = 'href="' + target(slug) + '"'
        assert old in lines[idx], "mobile mismatch at %d: %r" % (ln, lines[idx])
        lines[idx] = lines[idx].replace(old, new)

    text = "\n".join(lines)
    text = text.replace("./Gramy Hospital_files/", base_prefix + "Gramy Hospital_files/")
    return text


# sanity check both contexts build without assertion errors
_ = build_header("", "root")
_ = build_header("../", "specialist")
print("Header link-patching verified OK for both contexts.")

img_dir = os.path.join(ROOT, "Gramy Hospital_files", "specialists")
local_files = set(os.listdir(img_dir))


def local_img(url):
    if not url:
        return None
    fname = os.path.basename(urlparse(url).path).replace(" ", "-")
    return fname if fname in local_files else None


def esc(s):
    return html.escape(s or "", quote=True)


def render_body_nodes(nodes):
    out = []
    for n in nodes:
        if n["type"] in ("h2", "h3"):
            out.append("<%s>%s</%s>" % (n["type"], esc(n["text"]), n["type"]))
        elif n["type"] == "p":
            out.append("<p>%s</p>" % esc(n["text"]))
        elif n["type"] in ("ul", "ol"):
            items = "".join("<li>%s</li>" % esc(i) for i in n["items"])
            out.append("<%s>%s</%s>" % (n["type"], items, n["type"]))
    return "\n".join(out)


DOCTOR_CARD_TMPL = """
            <div class="doctor-card">
                <div class="doctor-image">
                    %(img_tag)s
                    <div class="doctor-btn">
                        <a class="default-btn" href="tel:02235347300"><i class="ti ti-circle-arrow-right-filled"></i>Book an appointment</a>
                    </div>
                </div>
                <div class="doctor-content">
                    <h3>%(name)s</h3>
                    <span>%(designation)s</span>
                </div>
            </div>"""

DOCTORS_SECTION_TMPL = """
<div class="ptb-100" style="background-color:#F7F8FC;">
  <div class="container">
    <div class="doctor-slider-inner">
      <h2>Available Doctors under %(title)s</h2>
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


def render_doctors(doctors, title):
    if not doctors:
        return ""
    cards = []
    for d in doctors:
        img = local_img(d.get("img"))
        img_tag = ""
        if img:
            img_tag = '<img decoding="async" src="../Gramy Hospital_files/specialists/%s" alt="%s">' % (img, esc(d["name"]))
        cards.append(DOCTOR_CARD_TMPL % {
            "img_tag": img_tag,
            "name": esc(d["name"]),
            "designation": esc(d["designation"]),
        })
    return DOCTORS_SECTION_TMPL % {"title": esc(title), "cards": "".join(cards)}


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
            </div>
        </div>
    </div>
</div>"""


def render_content(d):
    title = d["title"]
    hero = local_img(d.get("hero_img"))
    hero_html = ""
    if hero:
        hero_html = ('<div class="text-center mb-4">'
                     '<img decoding="async" src="../Gramy Hospital_files/specialists/%s" '
                     'alt="%s" style="max-width:100%%;height:auto;border-radius:10px;">'
                     '</div>') % (hero, esc(title))

    banner = BANNER_TMPL % {"title": esc(title)}
    body = BODY_TMPL % {"hero_html": hero_html, "body_nodes": render_body_nodes(d["body_nodes"])}
    doctors = render_doctors(d["doctors"], title)

    return banner + body + doctors


def build_page(slug):
    d = data[slug]
    title = d["title"]
    head = A_head.replace("./Gramy Hospital_files/", "../Gramy Hospital_files/")
    head = head.replace("<title>Gramy Hospital</title>", "<title>%s – Gramy Hospital</title>" % esc(title))
    head = head.replace(
        '<link rel="canonical" href="https://gramyhospital.com/">',
        '<link rel="canonical" href="https://gramyhospital.com/%s/">' % slug,
    )

    body_open = B_body
    header = build_header("../", "specialist")
    content = render_content(d)
    footer = D_footer.replace("./Gramy Hospital_files/", "../Gramy Hospital_files/")
    scripts = E_scripts.replace("./Gramy Hospital_files/", "../Gramy Hospital_files/")

    return head + "\n" + body_open + "\n" + header + "\n" + content + "\n" + footer + "\n" + scripts


out_dir = os.path.join(ROOT, "specialists")
os.makedirs(out_dir, exist_ok=True)
for slug in data:
    page_html = build_page(slug)
    out_path = os.path.join(out_dir, slug + ".html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(page_html)
    print("Wrote", out_path, len(page_html), "bytes")
