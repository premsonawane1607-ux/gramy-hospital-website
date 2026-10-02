"use client";

// Live Contact Form 7 appointment form inside `.mc-appointment-form`: NAME,
// EMAIL, PHONE and the three selects exactly as the live form lists them, then
// "Book Appointment Now". This is a static rebuild with no form backend to
// submit to, so submission is a no-op (after the browser's own required-field
// checks) rather than posting somewhere that would 404.
const SELECTS = [
  { name: "doctors", options: ["DERMATOLOGIST", "ACNE TREATMENT", "LASER TREATMENTS", "SKIN CANCER SCREENING"] },
  { name: "appoinmentDate", options: ["APPOINTMENT DATE", "JANUARY 22, 2025", "JANUARY 28, 2025", "JANUARY 30, 2025"] },
  { name: "appoinmentTime", options: ["APPOINTMENT TIME", "1:30 PM", "10:00 PM", "7:00 AM"] },
];

export default function AppointmentForm() {
  return (
    <div className="lv-wpcf7">
      <form className="lv-wpcf7-form lv-init" aria-label="Contact form" onSubmit={(e) => e.preventDefault()}>
        <div className="lv-row lv-justify-content-center">
          <div className="lv-col-lg-6 lv-col-md-12">
            <div className="lv-form-group">
              <span className="lv-wpcf7-form-control-wrap">
                <input
                  size={40}
                  maxLength={400}
                  className="lv-wpcf7-form-control lv-form-control"
                  placeholder="NAME"
                  type="text"
                  name="your-name"
                  aria-label="Name"
                  required
                />
              </span>
            </div>
          </div>
          <div className="lv-col-lg-6 lv-col-md-12">
            <div className="lv-form-group">
              <span className="lv-wpcf7-form-control-wrap">
                <input
                  size={40}
                  maxLength={400}
                  className="lv-wpcf7-form-control lv-form-control"
                  placeholder="EMAIL"
                  type="email"
                  name="your-email"
                  aria-label="Email"
                  required
                />
              </span>
            </div>
          </div>
          <div className="lv-col-lg-6 lv-col-md-12">
            <div className="lv-form-group">
              <span className="lv-wpcf7-form-control-wrap">
                <input
                  className="lv-wpcf7-form-control lv-form-control"
                  placeholder="PHONE"
                  type="number"
                  name="your-phone"
                  aria-label="Phone"
                  required
                />
              </span>
            </div>
          </div>
          {SELECTS.map((s) => (
            <div key={s.name} className="lv-col-lg-6 lv-col-md-12">
              <div className="lv-form-group">
                <span className="lv-wpcf7-form-control-wrap">
                  <select
                    className="lv-wpcf7-form-control lv-form-select lv-form-control"
                    name={s.name}
                    aria-label={s.options[0]}
                    required
                  >
                    {s.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </div>
          ))}
          <div className="lv-col-lg-12 lv-col-md-12">
            <button type="submit" className="lv-default-btn lv-extra-gap">
              <i className="ti ti-calendar-plus" /> Book Appointment Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
