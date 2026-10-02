// Class strings reproducing the live site's Bootstrap 5 + hospa-main.css
// primitives exactly, for the pages rebuilt 1:1 from gramyhospital.com.

// Bootstrap `.container`: 12px gutters, 540/720/960/1140/1320 steps.
export const BS_CONTAINER =
  "mx-auto w-full px-[12px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px]";

// Bootstrap `.row` (24px gutter) and a full-width column.
export const BS_ROW = "mx-[-12px] flex flex-wrap";
export const BS_COL = "w-full max-w-full shrink-0 px-[12px]";

// `.ptb-100` (50px at <=767px). Live body text stays 16px on mobile, while
// globals.css drops it to 15px, so these sections pin it back.
export const PTB_100 = "py-[100px] max-[767px]:py-[50px] max-[767px]:text-[16px]";

// hospa-main.css `.default-btn` (10px 20px 10px 55px, 25px icon pinned 20px
// from the left) — the global .default-btn in globals.css uses different
// padding, so these pages apply the live metrics explicitly.
export const LIVE_BTN =
  "relative inline-flex items-center justify-center rounded-[50px] py-[10px] pl-[55px] pr-[20px] text-[15px] font-medium transition-colors duration-[600ms]";
export const LIVE_BTN_ICON = "absolute left-[20px] top-1/2 -translate-y-1/2 text-[25px]";

// `.form-group label` + `.form-control` as used by the live search forms.
export const LIVE_LABEL = "mb-[10px] block text-[14px] leading-[21px] text-paragraph";
export const LIVE_CONTROL =
  "inline-block h-[55px] w-full rounded-[50px] border border-[#E1E6EB] bg-[#E1E6EB] px-[20px] py-[15px] text-[14px] leading-[21px] text-[#687390] shadow-none outline-none transition duration-[600ms] placeholder:text-[#687390] placeholder:transition focus:border-optional focus:placeholder:text-transparent";

// Bootstrap `.form-select` chevron.
export const LIVE_SELECT_STYLE = {
  appearance: "none" as const,
  backgroundImage:
    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right .75rem center",
  backgroundSize: "16px 12px",
};
