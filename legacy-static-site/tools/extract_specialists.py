import os, re, json
from bs4 import BeautifulSoup, NavigableString

BASE = os.path.join(os.environ.get("USERPROFILE",""), "gramy_check_tmp", "specialists")

SLUGS = [
    "cosmetic-gynaecology","cosmetic-surgery","ent-surgery","general-surgery",
    "robotic-surgery","gynecology","orthopedic-surgery","neurology",
    "aesthetic-medicine","prp-cartilage-rejuvenation","neurosurgery",
    "plastic-surgery","urology","anti-ageing-nutrition-medicine",
]

WORD_JOINER = '⁠'

def clean_text(s):
    s = (s or '').replace(WORD_JOINER, '')
    return re.sub(r'\s+', ' ', s).strip()

def get_text(el):
    return clean_text(el.get_text(separator=' '))

def extract_page(slug):
    path = os.path.join(BASE, f"{slug}.html")
    soup = BeautifulSoup(open(path, encoding="utf-8", errors="ignore").read(), "html.parser")

    # Title: h1 inside page-banner-area
    banner = soup.select_one(".page-banner-area")
    h1 = banner.select_one("h1") if banner else None
    title = clean_text(h1.get_text(separator=' ')) if h1 else slug

    entry = soup.select_one(".entry-content")
    if entry is None:
        return {"slug": slug, "title": title, "error": "no entry-content found"}

    # doctor cards
    doctor_cards = entry.select(".doctor-card")
    doctors = []
    seen_names = set()
    for c in doctor_cards:
        img = c.select_one(".doctor-image img")
        name_el = c.select_one(".doctor-content h3")
        desig_el = c.select_one(".doctor-content span")
        name = clean_text(name_el.get_text(separator=' ')) if name_el else None
        if not name or name in seen_names:
            continue
        seen_names.add(name)
        doctors.append({
            "name": name,
            "designation": clean_text(desig_el.get_text(separator=' ')) if desig_el else "",
            "img": img.get("src") if img else None,
        })

    # find the "Available Doctors" heading (h2) to know where body content ends
    avail_heading = None
    for h2 in entry.find_all("h2"):
        if "available doctors" in h2.get_text(strip=True).lower():
            avail_heading = h2
            break

    # hero image = first <img> in entry-content NOT inside a .doctor-card
    hero_img = None
    for img in entry.find_all("img"):
        if img.find_parent(class_="doctor-card") is None:
            hero_img = img.get("src")
            break

    # Body content nodes: all h2/h3/p/ul/ol in doc order, before avail_heading,
    # excluding the repeated title h2 itself, excluding empty/whitespace-only.
    body_nodes = []
    content_tags = entry.find_all(["h2", "h3", "p", "ul", "ol"])
    hit_avail = False
    for tag in content_tags:
        if avail_heading is not None and tag is avail_heading:
            hit_avail = True
        if hit_avail:
            break
        # skip inside doctor-card (shouldn't happen before avail heading, but safety)
        if tag.find_parent(class_="doctor-card"):
            continue
        if tag.name == "h2":
            txt = clean_text(tag.get_text(separator=' '))
            if txt.lower() == title.lower():
                continue  # skip repeated title
            if txt:
                body_nodes.append({"type": "h2", "text": txt})
        elif tag.name == "h3":
            txt = clean_text(tag.get_text(separator=' '))
            if txt:
                body_nodes.append({"type": "h3", "text": txt})
        elif tag.name == "p":
            txt = clean_text(tag.get_text(separator=' '))
            if txt and len(txt) > 1:
                body_nodes.append({"type": "p", "text": txt})
        elif tag.name in ("ul", "ol"):
            items = [clean_text(li.get_text(separator=' ')) for li in tag.find_all("li", recursive=False)]
            items = [i for i in items if i]
            if items:
                body_nodes.append({"type": tag.name, "items": items})

    return {
        "slug": slug,
        "title": title,
        "hero_img": hero_img,
        "body_nodes": body_nodes,
        "doctors": doctors,
    }

results = {}
for slug in SLUGS:
    results[slug] = extract_page(slug)

outpath = os.path.join(os.environ.get("USERPROFILE",""), "gramy_check_tmp", "specialists_data.json")
with open(outpath, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

for slug, d in results.items():
    if "error" in d:
        print(f"{slug}: ERROR {d['error']}")
    else:
        print(f"{slug}: title={d['title']!r} hero={bool(d['hero_img'])} body_nodes={len(d['body_nodes'])} doctors={len(d['doctors'])}")
print("\nWrote", outpath)
