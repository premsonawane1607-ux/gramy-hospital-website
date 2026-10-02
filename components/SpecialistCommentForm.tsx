"use client";

// Live Contact Form 7 form inside `.question-wrap`: Your Message, Name, Email,
// Phone (tel) — or Website on the pages whose live form uses that field — and
// the "I agree with the terms." acceptance, then the black "Send Message Now"
// button. Field metrics are the live `.question-wrap form`
// rules (see specialist-live.css). This is a static rebuild with no form
// backend to submit to, so submission is a no-op rather than posting
// somewhere that would 404.
export default function SpecialistCommentForm({ id, website = false }: { id: string; website?: boolean }) {
  return (
    <div data-wid={id} data-wtype="form" className="gh-w">
      <form data-a="q-form" onSubmit={(e) => e.preventDefault()}>
        <div className="gh-question__group">
          <label htmlFor={`${id}-message`}>Your Message*</label>
          <textarea
            id={`${id}-message`}
            data-a="q-ta"
            required
            cols={40}
            rows={10}
            maxLength={2000}
            placeholder="Please write your message here"
            className="gh-question__control"
          />
        </div>
        <div className="gh-question__group">
          <label htmlFor={`${id}-name`}>Name*</label>
          <input
            id={`${id}-name`}
            data-a="q-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Please enter name"
            className="gh-question__control"
          />
        </div>
        <div className="gh-question__group">
          <label htmlFor={`${id}-email`}>Email*</label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            placeholder="Please enter your email address"
            className="gh-question__control"
          />
        </div>
        {website ? (
          <div className="gh-question__group">
            <label htmlFor={`${id}-website`}>Website*</label>
            <input
              id={`${id}-website`}
              type="text"
              required
              autoComplete="url"
              placeholder="Please enter your website"
              className="gh-question__control"
            />
          </div>
        ) : (
          <div className="gh-question__group">
            <label htmlFor={`${id}-phone`}>Phone*</label>
            <input
              id={`${id}-phone`}
              type="tel"
              required
              autoComplete="tel"
              placeholder="Please enter your phone"
              className="gh-question__control"
            />
          </div>
        )}
        <div className="gh-question__group">
          <span data-a="q-accept" className="gh-question__accept">
            <label>
              <input type="checkbox" required />
              <span>I agree with the terms.</span>
            </label>
          </span>
        </div>
        <button data-a="q-btn" type="submit" className="gh-live-btn gh-live-btn--black">
          <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
          Send Message Now
        </button>
      </form>
    </div>
  );
}
