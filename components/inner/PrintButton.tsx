"use client";

// Live `.info-list li button` print control (window.print()).
export default function PrintButton({ className }: { className: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Print this page"
      className="inline-block border-0 bg-transparent p-0 leading-none"
    >
      <i className={`ti ti-printer ${className}`} />
    </button>
  );
}
