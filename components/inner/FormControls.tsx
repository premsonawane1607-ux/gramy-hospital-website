import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

// `.doctor-search-form / .find-location-search-form / .contact-us-form-wrap
// .form-control` (hospa-main.css): 55px #E1E6EB pill, 14px #687390 text,
// optionalColor border on focus, placeholder cleared on focus. Labels are
// 14px paragraph-colored with 10px spacing.
const BASE =
  "w-full border bg-[#E1E6EB] px-5 text-sm text-[#687390] outline-none transition duration-[600ms] placeholder:text-[#687390] focus:border-optional focus:placeholder:text-transparent";
const borderFor = (invalid?: boolean) => (invalid ? "border-optional-two" : "border-[#E1E6EB]");

export function FormGroup({
  label,
  htmlFor,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-[10px] block text-sm text-paragraph">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-[6px] pl-5 text-[13px] leading-normal text-optional-two">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ invalid, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`h-[55px] rounded-full py-[15px] ${BASE} ${borderFor(invalid)} ${className}`}
    />
  );
}

export function TextAreaField({
  invalid,
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={`flex min-h-[145px] rounded-[20px] py-[15px] ${BASE} ${borderFor(invalid)} ${className}`}
    />
  );
}

export function SelectField({
  invalid,
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={invalid || undefined}
        className={`h-[55px] cursor-pointer appearance-none rounded-full py-0 pr-[45px] ${BASE} ${borderFor(invalid)} ${className}`}
      >
        {children}
      </select>
      <i
        className="ti ti-chevron-down pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2 text-base text-[#687390]"
        aria-hidden="true"
      />
    </div>
  );
}
