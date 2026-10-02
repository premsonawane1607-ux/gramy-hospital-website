"use client";

import { useState, type FormEvent } from "react";
import { FormGroup, SelectField, TextAreaField, TextField } from "./FormControls";
import { HOSPITAL } from "@/lib/hospital-info";

// Wording from the live homepage card: "Contact our team for appointments,
// support, feedback, and general healthcare enquiries."
const REASONS = ["Appointment", "Support", "Feedback", "General Healthcare Enquiry"];

type Field = "name" | "email" | "phone" | "reason" | "subject" | "message" | "consent";
type Values = Record<Exclude<Field, "consent">, string> & { consent: boolean };

const EMPTY: Values = { name: "", email: "", phone: "", reason: "", subject: "", message: "", consent: false };

function validate(v: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s()-]*$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 13)
    errors.phone = "Please enter a valid phone number (10–13 digits).";
  if (!v.reason) errors.reason = "Please choose a reason for contacting us.";
  if (!v.subject.trim()) errors.subject = "Please enter a subject.";
  if (!v.message.trim()) errors.message = "Please write your message.";
  else if (v.message.trim().length < 10) errors.message = "Please add a little more detail (at least 10 characters).";
  if (!v.consent) errors.consent = "Please agree to the terms to continue.";
  return errors;
}

// Same shell as the live `.contact-us-form-wrap form` (1px #E1E6EB border,
// 20px radius, 30px padding — 20px mobile, 25px field spacing, blackColor
// submit). There is no form backend in this project, so a valid submission
// hands the message to the visitor's own email app, addressed to the
// hospital, instead of pretending it was delivered.
export default function ConnectForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Field[]).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`connect-${firstInvalid}`)?.focus();
      return;
    }
    const body = [
      values.message.trim(),
      "",
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Reason: ${values.reason}`,
    ].join("\n");
    window.location.href = `mailto:${HOSPITAL.email}?subject=${encodeURIComponent(
      `[${values.reason}] ${values.subject.trim()}`,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const describe = (f: Field) => (errors[f] ? `connect-${f}-error` : undefined);

  if (submitted) {
    return (
      <div role="status" className="rounded-[20px] border border-[#E1E6EB] p-5 min-[768px]:p-[30px]">
        <div className="mb-[15px] flex items-center">
          <span className="mr-[15px] flex h-[45px] w-[45px] flex-none items-center justify-center rounded-full bg-[#D7ECE4] text-[25px] text-optional-three">
            <i className="ti ti-checks" aria-hidden="true" />
          </span>
          <h3 className="text-[20px] min-[768px]:text-[25px]">Your message is ready to send</h3>
        </div>
        <p className="mb-[15px]">
          We opened your email app with your message addressed to{" "}
          <a href={HOSPITAL.emailHref} className="font-semibold text-optional hover:text-main">
            {HOSPITAL.email}
          </a>
          . Please press send there to deliver it to our team.
        </p>
        <p className="mb-[25px]">
          If your email app did not open, write to us directly or call{" "}
          <a href={HOSPITAL.phoneHref} className="font-semibold text-optional hover:text-main">
            {HOSPITAL.phoneLabel}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
          className="default-btn !border-none !bg-[#020D2B] hover:!bg-main"
        >
          <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
          Write Another Message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[20px] border border-[#E1E6EB] p-5 min-[768px]:p-[30px]">
      {errorCount > 0 && (
        <div role="alert" className="mb-[25px] rounded-[20px] border border-optional-two/30 bg-optional-two/5 px-5 py-[15px] text-sm text-optional-two">
          Please correct the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
        </div>
      )}
      <div className="grid grid-cols-1 gap-x-6 min-[768px]:grid-cols-2">
        <FormGroup label="Name*" htmlFor="connect-name" error={errors.name} className="mb-[25px]">
          <TextField
            id="connect-name"
            name="name"
            autoComplete="name"
            placeholder="Please enter name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            invalid={!!errors.name}
            aria-describedby={describe("name")}
            required
          />
        </FormGroup>
        <FormGroup label="Email*" htmlFor="connect-email" error={errors.email} className="mb-[25px]">
          <TextField
            id="connect-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Please enter your email address"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            invalid={!!errors.email}
            aria-describedby={describe("email")}
            required
          />
        </FormGroup>
        <FormGroup label="Phone*" htmlFor="connect-phone" error={errors.phone} className="mb-[25px]">
          <TextField
            id="connect-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Please enter your phone number"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            required
          />
        </FormGroup>
        <FormGroup label="Reason For Contact*" htmlFor="connect-reason" error={errors.reason} className="mb-[25px]">
          <SelectField
            id="connect-reason"
            name="reason"
            value={values.reason}
            onChange={(e) => set("reason", e.target.value)}
            invalid={!!errors.reason}
            aria-describedby={describe("reason")}
            required
          >
            <option value="">Select A Reason</option>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </SelectField>
        </FormGroup>
      </div>
      <FormGroup label="Subject*" htmlFor="connect-subject" error={errors.subject} className="mb-[25px]">
        <TextField
          id="connect-subject"
          name="subject"
          placeholder="Please enter a subject"
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          invalid={!!errors.subject}
          aria-describedby={describe("subject")}
          required
        />
      </FormGroup>
      <FormGroup label="Your Message*" htmlFor="connect-message" error={errors.message} className="mb-[25px]">
        <TextAreaField
          id="connect-message"
          name="message"
          placeholder="Please write your message here"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          invalid={!!errors.message}
          aria-describedby={describe("message")}
          required
        />
      </FormGroup>
      <div className="mb-[25px]">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="connect-consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent || undefined}
            aria-describedby={describe("consent")}
            className="h-[22px] w-[22px] flex-none rounded-[30px] border border-[#B1BDCA] accent-optional"
          />
          <label htmlFor="connect-consent" className="ml-[10px] text-sm text-paragraph">
            I agree with the terms.
          </label>
        </div>
        {errors.consent && (
          <p id="connect-consent-error" className="mt-[6px] text-[13px] text-optional-two">
            {errors.consent}
          </p>
        )}
      </div>
      <button type="submit" className="default-btn !border-none !bg-[#020D2B] hover:!bg-main">
        <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
        Send Message Now
      </button>
    </form>
  );
}
