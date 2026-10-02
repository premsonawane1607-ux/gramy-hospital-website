# -*- coding: utf-8 -*-
# Broken-asset / broken-internal-link check for the newly generated page
# trees (pages/, doctors/, services/, labtest/, career/, events/, blog/,
# doctor-categories/, taxonomy/) plus the existing specialists/ pages,
# resolved against a local http.server instance.
import os, re, urllib.request, urllib.error

ROOT = r"D:\ho"
SERVER = "http://localhost:8000"
NEW_DIRS = ["pages", "doctors", "services", "labtest", "career", "events",
            "blog", "doctor-categories", "taxonomy", "specialists"]

url_pattern = re.compile(r'(?:href|src)="(\.\.?/[^"]+)"')

html_files = []
for d in NEW_DIRS:
    dpath = os.path.join(ROOT, d)
    if not os.path.isdir(dpath):
        continue
    for f in os.listdir(dpath):
        if f.lower().endswith(".html"):
            html_files.append(os.path.join(dpath, f))

print("Checking", len(html_files), "HTML files")

refs = {}  # rel path -> example referencing file
for hf in html_files:
    base_dir = os.path.dirname(hf)
    with open(hf, encoding="utf-8", errors="ignore") as f:
        content = f.read()
    for m in url_pattern.finditer(content):
        ref = m.group(1).split("?")[0].split("#")[0]
        if ref.startswith("http"):
            continue
        abs_path = os.path.normpath(os.path.join(base_dir, ref))
        rel = os.path.relpath(abs_path, ROOT).replace("\\", "/")
        refs.setdefault(rel, hf)

print("Total unique local refs:", len(refs))

broken = []
for rel, src in sorted(refs.items()):
    url = SERVER + "/" + urllib.request.quote(rel)
    try:
        req = urllib.request.Request(url, method="HEAD")
        resp = urllib.request.urlopen(req, timeout=5)
        code = resp.getcode()
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception as e:
        code = "ERROR:%s" % e
    if code != 200:
        broken.append((rel, code, src))

print("\nBroken (non-200) references:", len(broken))
by_ext = {}
for rel, code, src in broken:
    ext = os.path.splitext(rel)[1].lower()
    by_ext.setdefault(ext, []).append((rel, code, src))

for ext, items in sorted(by_ext.items(), key=lambda kv: -len(kv[1])):
    print("\n== %s (%d) ==" % (ext, len(items)))
    for rel, code, src in items[:15]:
        print("  %s  /%s   (from %s)" % (code, rel, os.path.relpath(src, ROOT)))
    if len(items) > 15:
        print("  ... and %d more" % (len(items) - 15))
