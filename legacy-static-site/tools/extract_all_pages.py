# -*- coding: utf-8 -*-
"""
Generic content extractor for the full gramyhospital.com sitemap crawl.
Reads raw HTML cached in the scratchpad raw_cache/ tree and produces one
structured JSON file (tools/all_pages_data.json) describing every page's
title, hero image, metadata list (qualifications/date/phone-style ul.list),
body content nodes, and any doctor-card listings found on the page.

Doctor CPT pages (posts-doctors-1) get a richer, purpose-built extraction
(tags line, qualifications/experience/phone/location/hospital, areas of
expertise, About bio) because they carry a fixed, well-structured layout.
"""
import os, re, json, glob
from bs4 import BeautifulSoup
from urllib.parse import urlparse

RAW_CACHE = r"C:\Users\Prem\AppData\Local\Temp\claude\d--ho\03f1bcc4-1e33-4cfc-b4fd-d1e99a407a7e\scratchpad\raw_cache"
OUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "all_pages_data.json")

WORD_JOINER = '\u2060'


def clean_text(s):
    s = (s or '').replace(WORD_JOINER, '')
    return re.sub(r'\s+', ' ', s).strip()


def content_root(soup):
    """Return (banner, root) - banner is the .page-banner-area if present,
    root is .entry-content if present else the first top-level Elementor
    content div sandwiched between header and footer."""
    page = soup.select_one('#page') or soup
    banner = page.select_one('.page-banner-area')
    entry = page.select_one('.entry-content')
    if entry is not None:
        return banner, entry
    for div in page.find_all('div', recursive=False):
        cls = div.get('class') or []
        if 'preloader-area' in cls or 'page-banner-area' in cls:
            continue
        return banner, div
    return banner, None


def extract_title(soup, banner):
    if banner is not None:
        h1 = banner.select_one('h1')
        if h1:
            t = clean_text(h1.get_text(' '))
            if t:
                return t
    if soup.title:
        t = clean_text(soup.title.get_text())
        t = re.sub(r'\s*[\u2013\u2011-]\s*Gramy Hospital\s*$', '', t)
        if t:
            return t
    return None


def extract_images(root, exclude_srcs):
    """All meaningful, non-icon image srcs in the content root, in document
    order, excluding ones already used elsewhere (e.g. as hero or in a
    doctor-card)."""
    if root is None:
        return []
    out = []
    seen = set(exclude_srcs)
    for img in root.find_all('img'):
        if img.find_parent(class_='doctor-card'):
            continue
        src = img.get('src') or ''
        if not src or 'data:image' in src or src in seen:
            continue
        name = os.path.basename(urlparse(src).path).lower()
        if any(tok in name for tok in ('icon', 'logo', 'award', 'flaticon')):
            continue
        seen.add(src)
        out.append(src)
    return out


def extract_doctor_cards(root):
    if root is None:
        return []
    doctors = []
    seen = set()
    for c in root.select('.doctor-card'):
        img = c.select_one('.doctor-image img')
        name_el = c.select_one('.doctor-content h3')
        desig_el = c.select_one('.doctor-content span')
        name = clean_text(name_el.get_text(' ')) if name_el else None
        if not name or name in seen:
            continue
        seen.add(name)
        doctors.append({
            'name': name,
            'designation': clean_text(desig_el.get_text(' ')) if desig_el else '',
            'img': img.get('src') if img else None,
        })
    return doctors


SKIP_TEXT_PATTERNS = re.compile(
    r'^(send message|quick contact)$', re.I
)


def extract_hero_img(root):
    if root is None:
        return None
    for img in root.find_all('img'):
        if img.find_parent(class_='doctor-card'):
            continue
        src = img.get('src') or ''
        if not src or 'data:image' in src:
            continue
        # skip tiny icon-ish images (svg icons, award badges) heuristically by filename
        name = os.path.basename(urlparse(src).path).lower()
        if any(tok in name for tok in ('icon', 'logo', 'award', 'flaticon')):
            continue
        return src
    return None


def extract_body_nodes(root):
    if root is None:
        return []
    nodes = []
    nested_lists = set()
    # ul/ol nested inside another ul/ol we've already captured shouldn't be
    # captured again as a separate top-level node.
    for outer in root.find_all(['ul', 'ol']):
        for inner in outer.find_all(['ul', 'ol']):
            nested_lists.add(id(inner))

    for tag in root.find_all(['h2', 'h3', 'h4', 'p', 'ul', 'ol']):
        if tag.find_parent(class_='doctor-card'):
            continue
        if tag.find_parent('form'):
            continue
        txt = clean_text(tag.get_text(' '))
        if tag.name in ('h2', 'h3', 'h4'):
            if txt and not SKIP_TEXT_PATTERNS.match(txt):
                nodes.append({'type': tag.name, 'text': txt})
                # Some theme widgets (e.g. contact-info "item" cards) put a
                # heading plus plain text/span content with no wrapping <p>.
                # Recover that trailing text as a synthetic paragraph.
                wrapper = tag.find_parent('div', class_=lambda c: c and 'item' in c.split())
                if wrapper is not None and not wrapper.find('p') and wrapper.find(['h2', 'h3', 'h4']) is tag:
                    full = clean_text(wrapper.get_text(' '))
                    if full.startswith(txt):
                        remainder = full[len(txt):].strip()
                        if remainder and len(remainder) > 1:
                            nodes.append({'type': 'p', 'text': remainder})
        elif tag.name == 'p':
            if txt and len(txt) > 1 and not SKIP_TEXT_PATTERNS.match(txt):
                nodes.append({'type': 'p', 'text': txt})
        elif tag.name in ('ul', 'ol'):
            if id(tag) in nested_lists:
                continue
            cls = tag.get('class') or []
            if 'qua-info-list' in cls:
                items = [clean_text(h5.get_text(' ')) for h5 in tag.select('li h5')]
                items = [i for i in items if i]
                if items:
                    nodes.append({'type': 'ul', 'items': items})
                continue
            if 'list' in cls:
                items = []
                for li in tag.find_all('li', recursive=False):
                    t = clean_text(li.get_text(' '))
                    if not t or SKIP_TEXT_PATTERNS.match(t):
                        continue
                    if ':' in t:
                        label, _, value = t.partition(':')
                        items.append(clean_text(label) + ': ' + clean_text(value))
                    else:
                        items.append(t)
                if items:
                    nodes.append({'type': 'ul', 'items': items})
                continue
            items = [clean_text(li.get_text(' ')) for li in tag.find_all('li', recursive=False)]
            items = [i for i in items if i and not SKIP_TEXT_PATTERNS.match(i)]
            if items:
                nodes.append({'type': tag.name, 'items': items})
    return nodes


# ---- doctor CPT specialized extraction ----

def extract_doctor_profile(soup):
    page = soup.select_one('#page') or soup
    root = None
    for div in page.find_all('div', recursive=False):
        cls = div.get('class') or []
        if 'elementor' in cls:
            root = div
            break
    if root is None:
        return {'error': 'no content root'}

    h2 = root.find('h2')
    name = clean_text(h2.get_text(' ')) if h2 else None

    tags_line = ''
    if h2:
        p = h2.find_next('p')
        if p:
            tags_line = clean_text(p.get_text(' '))

    img = root.find('img')
    img_src = img.get('src') if img else None

    info = {}
    for ul in root.select('ul.list'):
        for li in ul.find_all('li'):
            txt = clean_text(li.get_text(' '))
            if ':' in txt:
                label, _, value = txt.partition(':')
                info[clean_text(label).lower()] = clean_text(value)
        break

    expertise = [clean_text(h5.get_text(' ')) for h5 in root.select('ul.qua-info-list li h5')]
    expertise = [e for e in expertise if e]

    about_paragraphs = []
    about_heading = root.find(lambda t: t.name in ('h2', 'h3', 'h4') and clean_text(t.get_text(' ')).lower() == 'about')
    if about_heading:
        sect = about_heading.find_parent(class_='elementor-element')
        nxt = sect.find_next_sibling() if sect else None
        if nxt:
            about_paragraphs = [clean_text(p.get_text(' ')) for p in nxt.find_all('p')]
            about_paragraphs = [p for p in about_paragraphs if p]

    return {
        'name': name,
        'tags_line': tags_line,
        'img': img_src,
        'info': info,
        'expertise': expertise,
        'about': about_paragraphs,
    }


def slug_from_filename(fname):
    return os.path.splitext(fname)[0]


def process_file(category, path):
    fname = os.path.basename(path)
    slug = slug_from_filename(fname)
    try:
        soup = BeautifulSoup(open(path, encoding='utf-8', errors='ignore').read(), 'html.parser')
    except Exception as e:
        return {'category': category, 'slug': slug, 'error': str(e)}

    if category == 'posts-doctors-1':
        d = extract_doctor_profile(soup)
        d['category'] = category
        d['slug'] = slug
        return d

    banner, root = content_root(soup)
    title = extract_title(soup, banner)
    hero = extract_hero_img(root)
    doctor_cards = extract_doctor_cards(root)
    exclude = {hero} if hero else set()
    exclude |= {d['img'] for d in doctor_cards if d.get('img')}
    entry = {
        'category': category,
        'slug': slug,
        'title': title,
        'hero_img': hero,
        'body_nodes': extract_body_nodes(root),
        'doctor_cards': doctor_cards,
        'images': extract_images(root, exclude),
    }
    if root is None:
        entry['error'] = 'no content root found'
    return entry


def main():
    results = {}
    cat_dirs = sorted(glob.glob(os.path.join(RAW_CACHE, '*')))
    total = 0
    errors = 0
    for cat_dir in cat_dirs:
        if not os.path.isdir(cat_dir):
            continue
        category = os.path.basename(cat_dir)
        for path in sorted(glob.glob(os.path.join(cat_dir, '*.html'))):
            total += 1
            entry = process_file(category, path)
            key = category + '/' + entry['slug']
            results[key] = entry
            if entry.get('error'):
                errors += 1
                print('ERROR', key, entry['error'])

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=1, ensure_ascii=False)
    print('Processed', total, 'pages,', errors, 'errors.')
    print('Wrote', OUT_PATH)


if __name__ == '__main__':
    main()
