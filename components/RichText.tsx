import { createElement, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import type { RichNode } from "@/lib/types";

// Renders the sanitized element tree scraped from a live Elementor
// text-editor widget. Only these tags are ever emitted; everything else was
// flattened to a <span> when the data was generated.
const TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "b", "strong", "i", "em", "u", "br", "a", "span",
  "blockquote", "table", "thead", "tbody", "tr", "td", "th", "sup", "sub", "img", "div", "figure", "figcaption",
  "hr", "small",
]);

function parseStyle(style: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of style.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    const value = decl.slice(i + 1).trim();
    if (prop && value) out[prop] = value;
  }
  return out as CSSProperties;
}

function render(node: RichNode, key: number): ReactNode {
  if (typeof node === "string") return node;
  if (!TAGS.has(node.tag)) return null;
  const a = node.attrs ?? {};
  const children = node.children?.map(render);
  const props: Record<string, unknown> = { key };
  if (a.class) props.className = a.class;
  if (a.style) props.style = parseStyle(a.style);

  if (node.tag === "a") {
    const href = a.href ?? "#";
    if (href.startsWith("/")) {
      return (
        <Link key={key} href={href} className={a.class} style={props.style as CSSProperties | undefined}>
          {children}
        </Link>
      );
    }
    return createElement(
      "a",
      { ...props, href, ...(a.target ? { target: a.target, rel: "noopener noreferrer" } : {}) },
      children,
    );
  }
  if (node.tag === "img") {
    if (!a.src) return null;
    return createElement("img", {
      ...props,
      src: a.src,
      alt: a.alt ?? "",
      ...(a.width ? { width: Number(a.width) } : {}),
      ...(a.height ? { height: Number(a.height) } : {}),
      loading: "lazy",
    });
  }
  if (node.tag === "br" || node.tag === "hr") return createElement(node.tag, props);
  if (node.tag === "ol" && a.start) props.start = Number(a.start);
  return createElement(node.tag, props, children);
}

export default function RichText({ nodes }: { nodes: RichNode[] }) {
  return <>{nodes.map(render)}</>;
}
