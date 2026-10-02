"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import DoctorProfileCard, { type DoctorListing } from "./DoctorProfileCard";
import { FormGroup, SelectField, TextField } from "./FormControls";
import { LIVE_BTN, LIVE_BTN_ICON } from "./live-styles";

// The live page reveals doctors four at a time.
const PAGE_SIZE = 4;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/\bdr\.?\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Live `.doctor-search-form` (20px radius, #E1E6EB border, 25px 20px padding —
// 15px mobile — and 70px/50px space before the cards) over the live doctor
// row: a centred Bootstrap `.row` of `col-xl-3 col-md-6` cards (4 across from
// 1200px, 2 from 768px, 1 below) that shows the first four doctors, with the
// live "Load More" button revealing four more per click and scrolling the page
// down to them, exactly like the live `#loadmore` script. The button goes
// away once every match is shown. Filtering runs as you type (over all
// doctors, starting again from the first four); "Search Now" just jumps to
// the results.
export default function DoctorFinder({ doctors, services }: { doctors: DoctorListing[]; services: string[] }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const n = normalize(name);
    const l = location.trim().toLowerCase();
    return doctors.filter(
      (d) =>
        (!n || normalize(d.name).includes(n)) &&
        (!service || d.services.includes(service)) &&
        (!l || (d.location ?? "").toLowerCase().includes(l)),
    );
  }, [doctors, name, service, location]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [name, service, location]);

  const loadMore = (e: MouseEvent<HTMLButtonElement>) => {
    const top = e.currentTarget.getBoundingClientRect().top + window.scrollY;
    setVisible((v) => v + PAGE_SIZE);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const hasFilters = name !== "" || service !== "" || location !== "";
  const reset = () => {
    setName("");
    setService("");
    setLocation("");
  };

  return (
    <>
      <form
        role="search"
        aria-label="Find a doctor"
        onSubmit={(e) => {
          e.preventDefault();
          resultsRef.current?.scrollIntoView({ block: "start" });
        }}
        className="mb-[50px] rounded-[20px] border border-[#E1E6EB] p-[15px] min-[768px]:mb-[70px] min-[768px]:px-[20px] min-[768px]:py-[25px]"
      >
        <div className="grid grid-cols-1 gap-x-6 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
          <FormGroup label="Name" htmlFor="doctor-name" className="mb-[25px]">
            <TextField
              id="doctor-name"
              type="search"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type A Name"
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup label="Services" htmlFor="doctor-service" className="mb-[25px]">
            <SelectField id="doctor-service" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectField>
          </FormGroup>
          <FormGroup label="Location" htmlFor="doctor-location" className="mb-[25px] min-[768px]:col-span-2 min-[1200px]:col-span-1">
            <TextField
              id="doctor-location"
              type="search"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Type An Area Or City Name"
              autoComplete="off"
            />
          </FormGroup>
        </div>
        <div className="flex flex-wrap items-center gap-[15px] min-[768px]:justify-center">
          <button type="submit" className="default-btn !border-none !bg-optional hover:!bg-main">
            <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
            Search Now
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="default-btn !border !border-[#E1E6EB] !bg-white !text-black hover:!border-main hover:!bg-main hover:!text-white"
            >
              <i className="ti ti-refresh" aria-hidden="true" />
              Reset Filters
            </button>
          )}
        </div>
      </form>

      <div ref={resultsRef} className="scroll-mt-[30px]">
        <p className="sr-only" aria-live="polite">
          Showing {Math.min(visible, results.length)} of {results.length} matching doctors
          {service ? ` in ${service}` : ""}
        </p>
        {results.length > 0 ? (
          // The live cards sit in a Bootstrap .container (12px gutters); this
          // page's container uses 15px, so the row reaches 3px further out.
          // Live body text also stays 16px on mobile (globals.css drops it to 15px).
          <div className="mx-[-3px] max-[767px]:text-[16px]">
            <div className="mx-[-12px] flex flex-wrap justify-center">
              {results.slice(0, visible).map((d) => (
                <div key={d.slug} className="w-full px-[12px] min-[768px]:w-1/2 min-[1200px]:w-1/4">
                  <DoctorProfileCard doctor={d} />
                </div>
              ))}
              {visible < results.length && (
                <div data-a="fd-more-wrap" className="w-full px-[12px] text-center">
                  <button
                    data-a="fd-more"
                    type="button"
                    onClick={loadMore}
                    className={`${LIVE_BTN} bg-main text-white hover:bg-optional`}
                  >
                    <i className={`ti ti-circle-arrow-down-filled ${LIVE_BTN_ICON}`} aria-hidden="true" />
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-[20px] bg-[#E9EEF2] p-[30px] text-center min-[768px]:p-[50px]">
            <h3 className="mb-[10px] text-[20px] min-[768px]:text-[25px]">No doctors match your search</h3>
            <p className="mb-[25px]">Try a different name or service, or reset the filters to see every specialist.</p>
            <button type="button" onClick={reset} className="default-btn !bg-optional hover:!bg-main">
              <i className="ti ti-refresh" aria-hidden="true" />
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
