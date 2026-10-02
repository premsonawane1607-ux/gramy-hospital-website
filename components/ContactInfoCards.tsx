// `.contact-us-information .item` — verified against hospa-main.css:
// border-radius 40px, padding 50px, 25px gap between cards, 40px icon with
// 15px right margin, h3 14px/700/1.4px letter-spacing uppercase. Each card's
// lines are separate `display:block` spans on the live site (not one merged
// paragraph), so "CALL:"/"Email:" and the two visiting-hours lines each get
// their own line here too.
const CARDS = [
  {
    icon: "ti-ambulance",
    bg: "bg-[#D6D2F1]",
    title: "OUR LOCATIONS",
    lines: ["WR7G+PFC, Sidhwa Estate, Azad Nagar, Colaba, Mumbai, Maharashtra 400005"],
  },
  {
    icon: "ti-phone-plus",
    bg: "bg-[#F2DDD9]",
    title: "CONNECT WITH US",
    lines: ["CALL: +91 22-35347300", "Email: care@gramyhospital.com"],
  },
  {
    icon: "ti-clock-hour-8",
    bg: "bg-[#D7ECE4]",
    title: "VISITING HOURS",
    lines: ["Sunday: 08:00 AM - 10:00 PM", "Monday - Friday: 06:00 AM - 12:00 AM"],
  },
];

export default function ContactInfoCards() {
  return (
    <div>
      {CARDS.map((c, i) => (
        <div key={c.title} className={`rounded-[40px] p-[30px] min-[768px]:p-[50px] ${c.bg} ${i > 0 ? "mt-[25px]" : ""}`}>
          <div className="mb-[15px] flex items-center">
            <i className={`ti ${c.icon} mr-[15px] text-[40px] text-black`} aria-hidden="true" />
            <h3 className="text-sm font-bold tracking-[1.4px] text-black">{c.title}</h3>
          </div>
          {c.lines.map((line) => (
            <span key={line} className="block leading-[1.8] text-paragraph">
              {line}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
