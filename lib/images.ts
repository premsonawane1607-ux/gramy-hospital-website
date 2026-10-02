import fs from "fs";
import path from "path";

function listDir(dir: string): Set<string> {
  try {
    return new Set(fs.readdirSync(path.join(process.cwd(), "public", dir)));
  } catch {
    return new Set();
  }
}

const siteImages = listDir("images/site");
const specialistImages = listDir("images/specialists");

function basename(url: string): string {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname.split("/").pop() || "").replace(/ /g, "-");
  } catch {
    return url.split("/").pop() || url;
  }
}

/** Resolve a live gramyhospital.com image URL to a local /public path, or null if not downloaded. */
export function localImage(url: string | null | undefined): string | null {
  if (!url) return null;
  const name = basename(url);
  if (siteImages.has(name)) return `/images/site/${name}`;
  if (specialistImages.has(name)) return `/images/specialists/${name}`;
  return null;
}
