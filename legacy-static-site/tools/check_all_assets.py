# -*- coding: utf-8 -*-
# Project-wide asset check: extracts every local asset reference (css url(),
# <link href>, <script src>, <img src>) from every HTML and CSS file, resolves
# it against http://localhost:8000, and reports any that don't return 200.
import os, re, urllib.request, urllib.error

ROOT = r"D:\ho"
SERVER = "http://localhost:8000"

html_files = []
css_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    if "tools" in dirpath.split(os.sep):
        continue
    for f in filenames:
        p = os.path.join(dirpath, f)
        if f.lower().endswith(".html"):
            html_files.append(p)
        elif f.lower().endswith(".css"):
            css_files.append(p)

url_pattern_html = re.compile(r'(?:href|src)="(\./[^"]+|Gramy Hospital_files/[^"]+)"')
url_pattern_css = re.compile(r'url\((?:"|\')?(\.\./[^)\'"]+|[a-zA-Z0-9_.-]+\.(?:png|jpg|jpeg|gif|svg|woff2?|ttf|eot))(?:"|\')?\)')

def to_server_path(base_dir, ref):
    # resolve ref relative to base_dir, relative to ROOT
    if ref.startswith("./"):
        ref = ref[2:]
    abs_path = os.path.normpath(os.path.join(base_dir, ref))
    rel = os.path.relpath(abs_path, ROOT)
    rel = rel.replace("\\", "/")
    return rel

refs = set()

for hf in html_files:
    base_dir = os.path.dirname(hf)
    with open(hf, encoding="utf-8", errors="ignore") as f:
        content = f.read()
    for m in url_pattern_html.finditer(content):
        ref = m.group(1).split("?")[0].split("#")[0]
        if ref.startswith("http"):
            continue
        refs.add(to_server_path(base_dir, ref))

for cf in css_files:
    base_dir = os.path.dirname(cf)
    with open(cf, encoding="utf-8", errors="ignore") as f:
        content = f.read()
    for m in url_pattern_css.finditer(content):
        ref = m.group(1).split("?")[0].split("#")[0]
        if ref.startswith("http") or ref.startswith("data:"):
            continue
        refs.add(to_server_path(base_dir, ref))

print(f"Total unique local asset references found: {len(refs)}")

broken = []
for rel in sorted(refs):
    url = SERVER + "/" + urllib.request.quote(rel)
    try:
        req = urllib.request.Request(url, method="HEAD")
        resp = urllib.request.urlopen(req, timeout=5)
        code = resp.getcode()
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception as e:
        code = f"ERROR:{e}"
    if code != 200:
        broken.append((rel, code))

print(f"\nBroken (non-200) references: {len(broken)}")
for rel, code in broken:
    print(f"  {code}  /{rel}")
