import type { ReactNode } from "react";

// `center` = the sitewide `.section-title` block (doctor-area, find-location-area).
// `left` = `.patients-visitors-desc .content/.inner-content` heading: 12px/700
// optionalColor sub (10px mobile), 40px h2 (25px mobile) with an 800-weight <b>.
export default function SectionHeading({
  sub,
  children,
  description,
  align = "center",
  as: Tag = "h2",
}: {
  sub?: string;
  children: ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h2" | "h3";
}) {
  if (align === "center") {
    return (
      <div className="section-title">
        {sub && <span className="sub">{sub}</span>}
        <Tag className="[&_b]:font-extrabold">{children}</Tag>
        {description && <p className="mt-[15px]">{description}</p>}
      </div>
    );
  }
  return (
    <div>
      {sub && (
        <span className="mb-[10px] block text-[10px] font-bold tracking-[1.2px] text-optional min-[768px]:mb-[12px] min-[768px]:text-xs">
          {sub}
        </span>
      )}
      <Tag className="mb-[12px] text-[25px] min-[768px]:mb-[15px] min-[768px]:text-[40px] [&_b]:font-extrabold">{children}</Tag>
    </div>
  );
}
