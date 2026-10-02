import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactInfoCards from "@/components/ContactInfoCards";
import SpecialistBanner from "@/components/SpecialistBanner";

export const metadata: Metadata = { title: "Contact Us – Gramy Hospital" };

// Live `/contact-us/` page: the WITH-image `.page-banner-area` variant
// (people-group photo, `bg1.jpg`) + `<h1><b>Contact</b> Us</h1>`, then
// `.contact-us-area.ptb-100 .container` with a `col-lg-4` sticky info-card
// column and a `col-lg-8` form column — bypasses the generic `/[slug]`
// catch-all (which rendered an unrelated gradient PageBanner + plain 2-col
// text, no cards, no styled form) the same way /news does.
export default function ContactUsPage() {
  return (
    <>
      <SpecialistBanner title="Contact Us" heroImage="/images/site/bg1.jpg" boldFirstWord />
      <section className="py-[50px] min-[768px]:py-[100px]">
        <div className="gh-specialist-container">
          <div className="grid grid-cols-1 gap-10 min-[992px]:grid-cols-[1fr_2fr]">
            <ContactInfoCards />
            <div className="min-[992px]:pl-[25px]">
              <h2 className="mb-[15px] text-[25px] min-[768px]:text-[42px]">
                Send Us A <b className="font-extrabold">Message</b> Anytime
              </h2>
              <p className="mb-[25px] text-paragraph">
                Your email address will not be published. Required fields are marked *
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
