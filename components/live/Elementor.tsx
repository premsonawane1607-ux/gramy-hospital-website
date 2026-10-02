import type { ReactNode } from "react";

// The live About Us page and the blog articles are Elementor documents. These
// reproduce Elementor's own wrappers (section > container > column >
// widget-wrap > widget > widget-container) with the live element ids, so the
// live frontend and per-element rules in about-blog-live.css apply unchanged.

export function ElDocument({ id, children }: { id: string; children: ReactNode }) {
  return <div className={`lv-elementor lv-elementor-${id}`}>{children}</div>;
}

export function ElSection({
  id,
  boxed = false,
  className,
  children,
}: {
  id: string;
  /** `elementor-section-boxed` (centred container, 10px column padding) instead of full width. */
  boxed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      data-id={id}
      className={`lv-elementor-section lv-elementor-top-section lv-elementor-element lv-elementor-element-${id}${className ? ` ${className}` : ""} ${boxed ? "lv-elementor-section-boxed" : "lv-elementor-section-full_width"}`}
    >
      <div className={`lv-elementor-container ${boxed ? "lv-elementor-column-gap-default" : "lv-elementor-column-gap-no"}`}>
        {children}
      </div>
    </section>
  );
}

export function ElColumn({ id, size, children }: { id: string; size: 33 | 100; children: ReactNode }) {
  return (
    <div
      data-id={id}
      className={`lv-elementor-column lv-elementor-col-${size} lv-elementor-top-column lv-elementor-element lv-elementor-element-${id}`}
    >
      <div className="lv-elementor-widget-wrap lv-elementor-element-populated">{children}</div>
    </div>
  );
}

export function ElWidget({
  id,
  type,
  className,
  children,
}: {
  id: string;
  /** Live widget type, e.g. `text-editor` or `Hospa_Overview_Card`. */
  type: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-id={id}
      className={`lv-elementor-element lv-elementor-element-${id}${className ? ` ${className}` : ""} lv-elementor-widget lv-elementor-widget-${type}`}
    >
      <div className="lv-elementor-widget-container">{children}</div>
    </div>
  );
}
