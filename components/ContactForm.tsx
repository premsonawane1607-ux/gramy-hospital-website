"use client";

// `.contact-us-form-wrap form` — verified against hospa-main.css: 1px
// #E1E6EB border, 20px radius, 30px padding, 25px gap between fields,
// inputs are 55px-tall pill-shaped `#E1E6EB` fields (textarea: 145px min,
// 20px radius instead of a pill), 14px placeholder text. The submit button
// is the one place on the whole live site where `.default-btn` is
// overridden to `--blackColor` (not the sitewide mainColor purple) —
// `.contact-us-form-wrap form .default-btn{background-color:var(--blackColor)}`.
// This is a static rebuild with no form backend to submit to, so submission
// is a no-op rather than posting somewhere that would 404.
export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-[20px] border border-[#E1E6EB] p-5 min-[768px]:p-[30px]"
    >
      <div className="mb-[25px]">
        <label className="mb-[10px] block text-sm text-paragraph">Your Message*</label>
        <textarea
          required
          placeholder="Please write your message here"
          className="flex min-h-[145px] w-full rounded-[20px] border border-[#E1E6EB] bg-[#E1E6EB] px-5 py-[15px] text-sm text-[#687390] outline-none transition placeholder:text-[#687390] focus:border-optional focus:placeholder:text-transparent"
        />
      </div>
      <div className="mb-[25px]">
        <label className="mb-[10px] block text-sm text-paragraph">Name*</label>
        <input
          type="text"
          required
          placeholder="Please enter name"
          className="h-[55px] w-full rounded-full border border-[#E1E6EB] bg-[#E1E6EB] px-5 text-sm text-[#687390] outline-none transition placeholder:text-[#687390] focus:border-optional focus:placeholder:text-transparent"
        />
      </div>
      <div className="mb-[25px]">
        <label className="mb-[10px] block text-sm text-paragraph">Email*</label>
        <input
          type="email"
          required
          placeholder="Please enter your email address"
          className="h-[55px] w-full rounded-full border border-[#E1E6EB] bg-[#E1E6EB] px-5 text-sm text-[#687390] outline-none transition placeholder:text-[#687390] focus:border-optional focus:placeholder:text-transparent"
        />
      </div>
      <div className="mb-[25px]">
        <label className="mb-[10px] block text-sm text-paragraph">Phone*</label>
        <input
          type="number"
          required
          placeholder="Please enter your phone number"
          className="h-[55px] w-full rounded-full border border-[#E1E6EB] bg-[#E1E6EB] px-5 text-sm text-[#687390] outline-none transition placeholder:text-[#687390] focus:border-optional focus:placeholder:text-transparent"
        />
      </div>
      <div className="mb-[25px]">
        <label className="mb-[10px] block text-sm text-paragraph">Website*</label>
        <input
          type="text"
          required
          placeholder="Please enter your website"
          className="h-[55px] w-full rounded-full border border-[#E1E6EB] bg-[#E1E6EB] px-5 text-sm text-[#687390] outline-none transition placeholder:text-[#687390] focus:border-optional focus:placeholder:text-transparent"
        />
      </div>
      <div className="mb-[25px] flex items-center">
        <input
          type="checkbox"
          required
          id="contact-gdpr"
          className="h-[22px] w-[22px] rounded-[30px] border border-[#B1BDCA] outline-none"
        />
        <label htmlFor="contact-gdpr" className="ml-[10px] text-sm text-paragraph">
          I agree with the terms.
        </label>
      </div>
      <button type="submit" className="default-btn !border-none !bg-[#020D2B] hover:!bg-main">
        <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
        Send Message Now
      </button>
    </form>
  );
}
