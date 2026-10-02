"use client";

import { useState } from "react";

// Live `Hospa_DoctorsTab` (Bootstrap tabs): five doctor categories, each pane
// holding a doctor slider. On the live page every one of those sliders is
// empty (no doctors are assigned to these categories), so each pane is an
// initialised Owl carousel with no slides — reproduced as is, nothing added.
const TABS = ["Cardiologist", "Orthopedist", "Gynocologist", "Nephrologist", "Nutritionist"];
const ID = "doctor_tab_0167861";

export default function DoctorTabs() {
  const [active, setActive] = useState(0);
  return (
    <div className="lv-doctor-information-tabs">
      <ul className="lv-nav lv-nav-tabs" id={ID} role="tablist">
        {TABS.map((label, i) => (
          <li key={label} className="lv-nav-item" role="presentation">
            <a
              className={i === active ? "lv-nav-link lv-active" : "lv-nav-link"}
              href={`#${ID}_cat_${i + 1}`}
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? undefined : -1}
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="lv-tab-content" id={`${ID}_content`}>
        {TABS.map((label, i) => (
          <div
            key={label}
            className={i === active ? "lv-tab-pane lv-fade lv-show lv-active" : "lv-tab-pane lv-fade"}
            id={`${ID}_cat_${i + 1}`}
            role="tabpanel"
          >
            <div className="lv-doctor-slider-inner">
              <div className="lv-doctor-slider lv-owl-carousel lv-owl-theme lv-owl-loaded lv-owl-drag">
                <div className="lv-owl-stage-outer">
                  <div className="lv-owl-stage" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
