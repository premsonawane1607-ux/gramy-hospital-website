import Link from "next/link";
import Counter from "./Counter";
import ServicesSlider from "./ServicesSlider";
import AppointmentForm from "./AppointmentForm";
import { HOSPITAL } from "@/lib/hospital-info";
import { blogPostHref, blogPosts, getBlogCategory } from "@/lib/blog";

// The widgets of the live About Us page (Hospa "maternity"/"psychiatric"
// Elementor widgets), with their live markup, text and images. Classes are the
// live ones prefixed `lv-` (see about-blog-live.css); the page wraps each one
// in its Elementor section.

const CALL_HREF = "tel:02235347300";

// Rounded-corner cut-out used by the service cards and the blog date badge.
function CornerShape({ className }: { className: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z" />
      </svg>
    </div>
  );
}

/** `Hospa_Maternity_About_Content` — `.mc-about-area`. */
export function AboutIntro() {
  return (
    <div className="lv-mc-about-area lv-ptb-100">
      <div className="lv-container">
        <div className="lv-row lv-justify-content-center">
          <div className="lv-col-lg-8 lv-col-md-12">
            <div className="lv-mc-about-content">
              <span className="lv-sub">ABOUT GRAMY</span>
              <h2>
                We are dedicated to <strong>supporting you through every stage</strong> of your pregnancy journey with
                compassionate care and expert guidance.
              </h2>
              <div className="lv-inner">
                <div className="lv-row lv-justify-content-center">
                  <div className="lv-col-lg-4 lv-col-md-12">
                    <div className="lv-image" style={{ backgroundImage: "url(/images/live/2026/06/newimg13.jpeg)" }} />
                  </div>
                  <div className="lv-col-lg-8 lv-col-md-12">
                    <div className="lv-content">
                      <p>
                        Delivering expert healthcare with compassion, innovation, and excellence at every step of your
                        wellness journey
                      </p>
                      <p>
                        Gramy Hospital is committed to delivering comprehensive healthcare through advanced medical
                        technology, experienced specialists, and a patient-first approach. We provide trusted care across
                        multiple specialties, ensuring comfort, safety, and excellence at every stage of treatment.
                        Whether you need preventive care, diagnostics, specialist consultations, or emergency services,
                        our dedicated team is here to support your health and well-being with compassion and expertise.
                      </p>
                      <div className="lv-info">
                        <div className="lv-about-btn">
                          <a href={CALL_HREF} className="lv-default-btn lv-extra-gap">
                            <i className="ti ti-circle-arrow-right-filled" />
                            Call Us Now
                          </a>
                        </div>
                        <div className="lv-call">
                          <b>For emergency, Call Now</b>{" "}
                          <span>
                            <i className="ti ti-phone-call" /> <a href={CALL_HREF}>{HOSPITAL.phoneLabel}</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lv-col-lg-4 lv-col-md-12">
            <div
              className="lv-mc-about-image"
              style={{ backgroundImage: "url(/images/live/2026/07/WhatsApp-Image-2026-07-29-at-10.13.34-AM.jpeg)" }}
            >
              <div className="lv-counter-wrap">
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
        </div>
      </div>
    </div>
  );
}

/** Elementor hosted video widget: autoplay, loop, controls, no download button. */
export function AboutVideo() {
  return (
    <div className="lv-e-hosted-video lv-elementor-wrapper lv-elementor-open-inline">
      <video
        className="lv-elementor-video"
        src="/videos/2026/08/WhatsApp-Video-2026-08-19-at-11.35.31-PM.mp4"
        poster="/images/site/WhatsApp-Image-2026-08-20-at-10.07.22-PM.jpeg"
        autoPlay
        loop
        controls
        playsInline
        controlsList="nodownload"
      />
    </div>
  );
}

/** `Hospa_Feature_Card_Maternity` — `.mc-features-card`. */
export function FeatureCard({ icon, title, text, href }: { icon: string; title: string; text: string; href: string }) {
  return (
    <div className="lv-mc-features-card">
      <div className="lv-title">
        <i className={`ti ${icon}`} />
        <h3>{title}</h3>
      </div>
      <p>{text}</p>
      <Link href={href} className="lv-features-btn">
        <i className="ti ti-arrow-right" />
        Learn More
      </Link>
    </div>
  );
}

const SERVICES = [
  {
    title: "Radiology",
    href: "/services/radiology",
    img: "/images/site/pro-img3.png",
    text: "Advanced imaging services including X-rays, CT scans, and MRI for accurate diagnosis and treatment planning.",
  },
  {
    title: "Sonography",
    href: "/services/sonography",
    img: "/images/site/pro-img6.png",
    text: "Safe and precise ultrasound imaging for diagnosing conditions and monitoring overall health.",
  },
  {
    title: "Microbiology",
    href: "/services/microbiology",
    img: "/images/site/pro-img4.png",
    text: "Comprehensive testing to identify infections and support effective, and targeted treatment.",
  },
  {
    title: "Surgery",
    href: "/general-surgery",
    img: "/images/site/syringe.png",
    text: "Expert surgical care using advanced techniques to ensure safer procedures, faster recovery, and better outcomes.",
  },
  {
    title: "Orthopedic",
    href: "/orthopedics",
    img: "/images/site/bone.png",
    text: "Specialized treatment for bones, joints, muscles, and sports injuries to help restore mobility and improve quality of life.",
  },
  {
    title: "Neurology",
    href: "/neurology",
    img: "/images/site/dna.png",
    text: "Comprehensive care for disorders affecting the brain, spine, nerves, and nervous system.",
  },
];

/** `Hospa_ServicesPost_Psychiatric` — `.ph-services-area` with the Owl slider. */
export function AboutServices() {
  return (
    <div className="lv-ph-services-area lv-ptb-100">
      <div className="lv-container">
        <div className="lv-section-title lv-wrap-style3">
          <div className="lv-row lv-justify-content-center">
            <div className="lv-col-lg-3 lv-col-md-12">
              <div className="lv-left">
                <span className="lv-sub">SERVICES OFFERED</span>
              </div>
            </div>
            <div className="lv-col-lg-9 lv-col-md-12">
              <div className="lv-right">
                <h2>
                  Comprehensive <b>multispecialty healthcare services</b> designed to deliver advanced treatment, expert
                  care, and better patient outcomes.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <ServicesSlider>
          {SERVICES.map((s) => (
            <div key={s.title} className="lv-ph-services-card">
              <h3>
                <Link href={s.href}>{s.title}</Link>
              </h3>
              <Link href={s.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} draggable={false} />
              </Link>
              <p>{s.text}</p>
              <div className="lv-arrow-btn">
                <CornerShape className="lv-shape1" />
                <CornerShape className="lv-shape2" />
              </div>
            </div>
          ))}
        </ServicesSlider>
        <div className="lv-ph-services-link">
          <span>
            Click here to see All Our <Link href="/our-services">Services</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

const WHY_BADGES = [
  { icon: "/images/site/review.svg", lines: ["Internationally", "trained expert"] },
  { icon: "/images/site/doctor.svg", lines: ["100% Patients", "satisfaction"] },
];

const WHY_ITEMS = [
  {
    icon: "/images/site/stethoscope-tool.svg",
    title: "Clinical Excellence",
    text: "Expert specialists supported by advanced technology, evidence-based practices, and years of experience across medical disciplines.",
  },
  {
    icon: "/images/site/parental.svg",
    title: "Comprehensive care",
    text: "From diagnostics and treatment to surgery and recovery, all your healthcare needs under one roof.",
  },
  {
    icon: "/images/site/empathy.svg",
    title: "Patient-Centered Care",
    text: "Personalized treatment plans, compassionate support, and continuous guidance to ensure comfort and confidence throughout your healthcare journey.",
  },
  {
    icon: "/images/site/health-check.svg",
    title: "Advanced Technology",
    text: "Equipped with modern diagnostic tools, innovative treatment solutions, and state-of-the-art infrastructure for precise and effective care.",
  },
];

/** `Hospa_TreatmentMaternity` — `.mc-treatment-area`. */
export function AboutWhyChoose() {
  return (
    <div className="lv-mc-treatment-area">
      <div className="lv-container">
        <div className="lv-section-title lv-wrap-style2">
          <span className="lv-sub">WHY CHOOSE GRAMY HOSPITAL</span>
          <h2>
            Delivering{" "}
            <b>advanced medical expertise, compassionate care, and comprehensive treatment solutions</b> for better
            health outcomes.
          </h2>
        </div>
        <div className="lv-row lv-justify-content-center lv-align-items-center">
          <div className="lv-col-xxl-6 lv-col-md-12">
            <div className="lv-mc-treatment-content">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/site/pregnant-woman.png" alt="image" />
              <div className="lv-info">
                <span>Need help, Call now</span>
                <div className="lv-call">
                  <i className="ti ti-phone-call" /> <a href={CALL_HREF}>+022-35347300</a>
                </div>
              </div>
              <div className="lv-bottom">
                {WHY_BADGES.map((b) => (
                  <div key={b.icon} className="lv-item">
                    <div className="lv-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.icon} alt="image" />
                    </div>
                    <h5>
                      {b.lines[0]}
                      <br />
                      {b.lines[1]}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lv-col-xxl-6 lv-col-md-12">
            <div className="lv-mc-treatment-items">
              <div className="lv-row lv-justify-content-center lv-g-4">
                {WHY_ITEMS.map((item) => (
                  <div key={item.title} className="lv-col-lg-6 lv-col-md-6">
                    <div className="lv-item">
                      <div className="lv-icon">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.icon} alt="Card Icon" />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <div className="lv-shape">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/site/layer.svg" alt="Card Shape" />
                      </div>
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

/** `Hospa_PostsMaternity` — `.mc-blog-area`: the two newest articles. */
export function AboutBlog() {
  return (
    <div className="lv-mc-blog-area lv-pb-100">
      <div className="lv-container">
        <div className="lv-section-title lv-wrap-style2">
          <span className="lv-sub">BLOG &amp; ARTICLES</span>
          <h2>
            Read <b>top articles</b> from expert doctors
          </h2>
        </div>
        <div className="lv-row lv-justify-content-center lv-g-4">
          {blogPosts.slice(0, 2).map((post) => {
            const href = blogPostHref(post);
            const category = getBlogCategory(post.category);
            // "June 9, 2026" -> "9 June" + "2026", as the live date badge prints it.
            const [monthDay, year] = post.date.split(", ");
            const [month, day] = monthDay.split(" ");
            return (
              <div key={post.slug} className="lv-col-lg-6 lv-col-md-12">
                <div className="lv-mc-blog-item">
                  <div className="lv-image">
                    <Link href={href}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image} alt="" />
                    </Link>
                    <div className="lv-date">
                      <div className="lv-inner">
                        <span>
                          {day} {month}
                        </span>
                        <h5>{year}</h5>
                      </div>
                      <CornerShape className="lv-shape1" />
                      <CornerShape className="lv-shape2" />
                    </div>
                  </div>
                  <div className="lv-content">
                    <ul className="lv-meta">
                      {category && (
                        <li>
                          <Link href={`/category/${category.slug}`} className="lv-tag-btn">
                            {category.name}
                          </Link>
                        </li>
                      )}
                      <li>{post.minsRead}</li>
                    </ul>
                    <h3>
                      <Link href={href}>{post.title}</Link>
                    </h3>
                    <Link href={href} className="lv-link-btn">
                      <i className="ti ti-arrow-right" /> Read More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** `Hospa_Overview_Card` — `.mc-overview-card`. */
export function OverviewCard({ lead, bold, text, shape }: { lead: string; bold: string; text: string; shape: string }) {
  return (
    <div className="lv-mc-overview-card">
      <h3>
        {lead} <b>{bold}</b>
      </h3>
      <p>{text}</p>
      <div className="lv-wrap-shape">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shape} alt="image" />
      </div>
    </div>
  );
}

/** `Hospa_Maternity_Appointment` — `.mc-appointment-area`. */
export function AboutAppointment() {
  return (
    <div className="lv-mc-appointment-area lv-ptb-100">
      <div className="lv-container">
        <div className="lv-row lv-justify-content-center">
          <div className="lv-col-lg-5 lv-col-md-12">
            <div
              className="lv-mc-appointment-image"
              style={{ backgroundImage: "url(/images/live/2026/07/WhatsApp-Image-2026-07-29-at-10.13.33-AM-1.jpeg)" }}
            />
          </div>
          <div className="lv-col-lg-7 lv-col-md-12">
            <div className="lv-mc-appointment-form">
              {/* The live widget's large backdrop word (an <h1> there too). */}
              <h1>P.FORM</h1>
              <div className="lv-form-wrap">
                <div className="lv-content">
                  <h2>
                    Book your <strong>Appointment</strong> with us
                  </h2>
                </div>
                <AppointmentForm />
              </div>
            </div>
            <div className="lv-mc-appointment-info">
              <div className="lv-info">
                <div className="lv-icon">
                  <i className="ti ti-alert-circle-filled" />
                </div>
                <div className="lv-title">
                  <h5>FIND A LOCATION NEARBY</h5>
                  <span>Gramy Hospital operates in Mumbai. Find the nearest...</span>
                </div>
              </div>
              <div className="lv-arrow-btn">
                <Link href="/contact-us" aria-label="Find a location nearby">
                  <i className="ti ti-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
