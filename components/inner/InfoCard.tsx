import type { ReactNode } from "react";

// `.contact-us-information .item` (as in ContactInfoCards): pastel tile, 40px
// radius, 50px padding (30px mobile), 40px black glyph beside a 14px/700
// uppercase title with 1.4px tracking, paragraph text at 1.8 line-height.
export default function InfoCard({
  icon,
  title,
  bg = "bg-[#D7ECE4]",
  children,
  className = "",
}: {
  icon: string;
  title: string;
  bg?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[40px] p-[30px] leading-[1.8] text-paragraph min-[768px]:p-[50px] ${bg} ${className}`}>
      <div className="mb-[15px] flex items-center">
        <i className={`ti ${icon} mr-[15px] text-[40px] leading-none text-black`} aria-hidden="true" />
        <h3 className="text-sm font-bold uppercase tracking-[1.4px] text-black">{title}</h3>
      </div>
      {children}
    </div>
  );
}
