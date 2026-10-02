import Link from "next/link";
import Counter from "@/components/about/Counter";
import TestimonialSlider from "./TestimonialSlider";
import DoctorTabs from "./DoctorTabs";

// The widgets of the live About Overview page (the page the three home
// "Why choose Gramy" cards link to), with their live markup and text. Classes
// are the live ones prefixed `lv-` (see about-overview-live.css); the page
// wraps each one in its Elementor section.
//
// The live page is still largely the theme's demo content, and most of its
// images point at a development host that no longer serves them, so the live
// page shows a broken image with its alt text in those places. That is
// reproduced as is: `BROKEN_SRC` fails to load the same way without
// requesting a third-party host, and nothing is substituted.
const BROKEN_SRC = "data:,";

/** `Hospa_About_Area` — `.about-area`. */
export function OverviewAbout() {
  return (
    <div className="lv-about-area lv-pt-100">
      <div className="lv-container">
        <div className="lv-row lv-justify-content-center lv-align-items-center">
          <div className="lv-col-xl-6 lv-col-md-12">
            <div className="lv-about-image lv-wrap-one">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BROKEN_SRC} alt="image" />
              <div className="lv-counter-wrap">
                <div className="lv-item">
                  <div className="lv-d-flex lv-align-items-center lv-justify-content-center">
                    <Counter value={22} className="lv-counter" />
                  </div>
                  <p>
                    DIFFERENT <span>SECTIONS</span>
                  </p>
                </div>
              </div>
              <div className="lv-counter-wrap lv-wrap-two">
                <div className="lv-item">
                  <div className="lv-d-flex lv-align-items-center lv-justify-content-center">
                    <Counter value={5} className="lv-counter" />
                    <h3 className="lv-sub">K+</h3>
                  </div>
                  <p>
                    PATIENT&apos;S <span>REVIEWS</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lv-col-xl-6 lv-col-md-12">
            <div className="lv-about-content lv-wrap-two">
              <span className="lv-sub">ABOUT HOSPA</span>
              <h2>
                We Provide Finnest Patient&apos;s <b>Care &amp; Amenities</b>
              </h2>
              <p>
                Embrace a world of comprehensive healthcare where your well-being takes center stage. At Meca, we&apos;re
                dedicated to providing you with personalized and compassionate medical services.
              </p>
              <div className="lv-row lv-justify-content-center">
                {[
                  ["Seamless Care", "Warm and Welcoming Environment", "Comprehensive Care", "Expert Doctors"],
                  ["Patient-Centered Care", "Personalized Approach", "Cutting-Edge Technology", "Positive Reviews"],
                ].map((items) => (
                  <div key={items[0]} className="lv-col-lg-6 lv-col-md-6">
                    <ul className="lv-list">
                      {items.map((item) => (
                        <li key={item}>
                          <i className="ti ti-checks" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p>
                Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper turet suscipit lobortis
                nisl ut aliquip erat volutpat autem vel eum iriure dolor in hendrerit in vulputate velit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "JANE RONAN", role: "Cardio Patient" },
  { name: "Walter White", role: "Head of Cardiology Department" },
  { name: "Victor James", role: "Head of Health Department" },
];

/** `Hospa_FeedbackArea` — `.testimonial-area` with the Owl testimonial slider. */
export function OverviewTestimonials() {
  return (
    <div className="lv-testimonial-area lv-ptb-100">
      <div className="lv-container">
        <div className="lv-testimonial-top-content">
          <span className="lv-sub">YOUR HEALTH IS OUR TOP PRIORITY</span>
          <h2>
            Our track record speaks for itself. Many individuals have chosen{" "}
            <span>our medical center and have had positive, transformative experiences.</span>
          </h2>
        </div>
        <div className="lv-row lv-justify-content-center lv-align-items-center">
          <div className="lv-col-lg-6 lv-col-md-12">
            <div className="lv-testimonial-lft-content">
              <div className="lv-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BROKEN_SRC} alt=" Image" />
              </div>
              <TestimonialSlider>
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="lv-testimonial-card">
                    <div className="lv-quote">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={BROKEN_SRC} alt="Quote Image" draggable={false} />
                    </div>
                    <p>
                      “I had a great experience at this healthcare clinic. I was seen quickly, and the doctor was able
                      to diagnose and treat my condition very patiently.
                    </p>
                    <div className="lv-info">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={BROKEN_SRC} className="lv-rounded-circle" alt="user Image" draggable={false} />
                      <div className="lv-title">
                        <h3>{t.name}</h3>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TestimonialSlider>
            </div>
          </div>
          <div className="lv-col-lg-6 lv-col-md-12">
            <div className="lv-testimonial-rght-content">
              <div className="lv-rating-box">
                <span>AVERAGE GOOGLE RATINGS</span>
                <div className="lv-rating">
                  <i className="ti ti-star-filled" /> <b>4.9</b>
                </div>
              </div>
              <div className="lv-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BROKEN_SRC} alt=" image 2" />
              </div>
              <div className="lv-info-box">
                <div className="lv-icon">
                  <i className="flaticon-caduceus" />
                </div>
                <div className="lv-title">
                  <span>HIPAA COMPLIANT</span>
                  <h3>Hospa provides award-winning quality care</h3>
                  <Link href="/contact-us" className="lv-link-btn">
                    <i className="ti ti-arrow-right" />
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lv-testimonial-shape">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BROKEN_SRC} alt=" Shape" />
      </div>
    </div>
  );
}

/** `HospaAboutThree` — `.about-more-area`. */
export function OverviewMoreAbout() {
  return (
    <div className="lv-about-more-area lv-pb-100">
      <div className="lv-container">
        <div className="lv-row lv-justify-content-center lv-align-items-center">
          <div className="lv-col-lg-5 lv-col-md-12">
            <div className="lv-about-more-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/site/about4.jpg" alt="image" />
            </div>
          </div>
          <div className="lv-col-lg-7 lv-col-md-12">
            <div className="lv-about-more-content">
              <span className="lv-sub">MORE ABOUT US</span>
              <h2>
                We Are A Clinic, <b>Provide Excellence</b> In Personalized Care
              </h2>
              <p className="lv-wrap">
                We are a private, independent practice constantly striving to provide excellence in personalized,
                compassionate care that is consistent, quality-driven and choice-conscious for all of our patients.
              </p>
              <div className="lv-inner-more-content">
                <div className="lv-row lv-justify-content-center lv-align-items-center">
                  <div className="lv-col-lg-4 lv-col-md-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/site/about5.jpg" alt="image2" />
                  </div>
                  <div className="lv-col-lg-4 lv-col-md-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/site/about6.jpg" alt="image3" />
                  </div>
                  <div className="lv-col-lg-4 lv-col-md-12">
                    <p>
                      We welcome advances in learning and technology in an effort to achieve efficient and
                      quality-driven patient care.
                    </p>
                    <p>
                      Together our team of doctors bring a broad spectrum of experience and professional expertise and
                      continually undertake professional development education to remain up to date with the latest in
                      medical treatment options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const WHY_CARDS = [
  "Not Just Better Care, But A Better Experience",
  "Serving All People Through Exemplary Care",
  "Specialty Medicine with Compassion and Care",
];

/** `HospaChooseArea` — `.why-choose-us-area`. */
export function OverviewWhyChoose() {
  return (
    <div className="lv-why-choose-us-area lv-pb-75">
      <div className="lv-container">
        <div className="lv-section-title">
          <span className="lv-sub">WHY CHOOSE HOSPA</span>
          <h2>
            We Are Different To <b>Protect Your Health</b>
          </h2>
        </div>
        <div className="lv-row lv-justify-content-center">
          {WHY_CARDS.map((title) => (
            <div key={title} className="lv-col-lg-4 lv-col-sm-6">
              <div className="lv-why-choose-us-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BROKEN_SRC} alt="image" />
                <h3>{title}</h3>
                <p>
                  At our medical center, we believe in providing not just better care but a better experience overall.
                  We understand that your journey to health.
                </p>
                <Link href="/contact-us" className="lv-link-btn">
                  <i className="ti ti-arrow-right" /> Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** `HospaHealthcare_Area` — `.solution-area`. The live background photo is one of the missing files. */
export function OverviewSolution() {
  return (
    <div className="lv-solution-area">
      <div className="lv-container">
        <div className="lv-solution-inner" style={{ backgroundImage: "none" }}>
          <div className="lv-content">
            <span className="lv-sub">HEALTHCARE SOLUTION</span>
            <h2>
              Your Health Is Our <b>Top Priority</b>
            </h2>
            <Link href="/contact-us" className="lv-default-btn">
              <i className="ti ti-circle-arrow-right-filled" /> Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const PRINCIPLES = [
  {
    icon: "ti-shield",
    title: "OUR MISSION",
    text: "Our mission is to care for our patients and their families when it matters most.",
    shape: "/images/site/shape-4.png",
    className: "lv-about-overview-card",
  },
  {
    icon: "ti-eye-plus",
    title: "OUR VISION",
    text: "Our vision is to invent the future of health care technologies.",
    shape: "/images/site/shape2.png",
    className: "lv-about-overview-card lv-bg-D7ECE4",
  },
  {
    icon: "ti-hearts",
    title: "OUR VALUES",
    text: "Our values are: excellence, collaboration, accountability, respect and engagement.",
    shape: "/images/site/shape3.png",
    className: "lv-about-overview-card lv-bg-D6D2F1",
  },
];

/** `Hospa_FeaturesFour` — `.about-overview-area` (Mission / Vision / Values). */
export function OverviewPrinciples() {
  return (
    <div className="lv-about-overview-area lv-pt-100">
      <div className="lv-container">
        <div className="lv-row lv-justify-content-center">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="lv-col-lg-4 lv-col-sm-6">
              <div className={p.className}>
                <i className={`ti ${p.icon}`} />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="lv-wrap-shape">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.shape} alt="shape" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** `Hospa_DoctorsTab` — `.doctor-area`. */
export function OverviewDoctors() {
  return (
    <div className="lv-doctor-area lv-pt-100 lv-pb-75">
      <div className="lv-container">
        <div className="lv-section-title">
          <span className="lv-sub">DOCTORS</span>
          <h2>
            Our Experts Doctors <b>For The Patients</b>
          </h2>
        </div>
        <DoctorTabs />
      </div>
    </div>
  );
}

/** `hospa_Partner_Two` — `.partner-area` (all four logos are missing on live). */
export function OverviewInsurance() {
  return (
    <div className="lv-partner-area lv-pb-100">
      <div className="lv-container">
        <div className="lv-row lv-justify-content-center lv-align-items-center">
          <div className="lv-col-lg-3 lv-col-md-12">
            <div className="lv-partner-content">
              <span className="lv-sub">INSURANCE</span>
              <h2>
                Our Accepted <b>Insurance</b>
              </h2>
            </div>
          </div>
          <div className="lv-col-lg-9 lv-col-md-12">
            <div className="lv-partner-inner">
              <div className="lv-row lv-justify-content-center">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="lv-col-lg-3 lv-col-sm-3 lv-col-6">
                    <div className="lv-partner-item">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={BROKEN_SRC} alt="Image" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
