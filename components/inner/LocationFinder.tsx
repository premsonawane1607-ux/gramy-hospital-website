"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { LocationBox } from "./LocationCard";
import MapSection from "./MapSection";
import type { HospitalLocation } from "@/lib/hospital-info";
import { BS_COL, BS_ROW, LIVE_CONTROL, LIVE_LABEL, LIVE_SELECT_STYLE } from "./live-styles";

const SERVICES = ["All Services"];

// Live `.find-location-search-form.row` + `.row.justify-content-center`
// (col-lg-6 list / col-lg-6 map), CSS verbatim from hospa-main.css and
// hospa-responsive.css. Filtering mirrors the live scripts: it runs when the
// form is submitted (the list + map row dims to 50% for one second first),
// matching service vs the box's services, facility vs its facilities and the
// typed location vs the centre (name, city or address here). The map's
// markers follow the filtered list, and with no match the `.sub-top` line
// switches to "Not found any locations".
export default function LocationFinder({ locations }: { locations: HospitalLocation[] }) {
  const [service, setService] = useState("");
  const [facility, setFacility] = useState("");
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState({ service: "", facility: "", query: "" });
  const [searching, setSearching] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const facilities = useMemo(() => Array.from(new Set(locations.flatMap((l) => l.facilities))), [locations]);

  const results = useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    return locations.filter(
      (l) =>
        (!applied.service || l.services.includes(applied.service)) &&
        (!applied.facility || l.facilities.includes(applied.facility)) &&
        (!q || [l.name, l.city, l.address].some((v) => v.toLowerCase().includes(q))),
    );
  }, [locations, applied]);

  const markers = useMemo(
    () => results.map((l) => ({ lat: l.latitude, lng: l.longitude, popupText: l.name })),
    [results],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = { service, facility, query };
    setSearching(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setApplied(next);
      setSearching(false);
    }, 1000);
  };

  const group = "max-[1199px]:my-[5px]";

  return (
    <>
      <form
        role="search"
        aria-label="Find a location"
        onSubmit={onSubmit}
        className={`${BS_ROW} relative mb-[55px] rounded-[20px] border border-[#E1E6EB] px-[20px] py-[25px]`}
      >
        <div className={`${BS_COL} min-[768px]:w-1/2 min-[1200px]:w-1/3`}>
          <div className={group}>
            <label htmlFor="location-service" className={LIVE_LABEL}>
              Service
            </label>
            <select
              id="location-service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={`${LIVE_CONTROL} cursor-pointer`}
              style={LIVE_SELECT_STYLE}
            >
              <option value="">Select A Service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={`${BS_COL} min-[768px]:w-1/2 min-[1200px]:w-1/3`}>
          <div className={group}>
            <label htmlFor="location-facility" className={LIVE_LABEL}>
              Facility
            </label>
            <select
              id="location-facility"
              name="facility"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className={`${LIVE_CONTROL} cursor-pointer`}
              style={LIVE_SELECT_STYLE}
            >
              <option value="">Select facility</option>
              {facilities.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={`${BS_COL} min-[992px]:w-1/3`}>
          <div className={group}>
            <label htmlFor="location-query" className={LIVE_LABEL}>
              Location
            </label>
            <input
              id="location-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search location here"
              autoComplete="off"
              className={LIVE_CONTROL}
            />
          </div>
        </div>
        <div className="absolute bottom-[30px] right-[40px] max-[1199px]:bottom-[35px]">
          <button
            type="submit"
            aria-label="Search locations"
            className="inline-flex h-[45px] w-[45px] items-center justify-center rounded-[50px] border-0 bg-white p-0 text-center text-[25px] leading-[45px] text-optional transition-colors duration-[600ms] hover:bg-optional hover:text-white"
          >
            <i className="ti ti-current-location" aria-hidden="true" />
          </button>
        </div>
      </form>

      <div className={`${BS_ROW} justify-center`} style={searching ? { opacity: 0.5 } : undefined}>
        <div className={`${BS_COL} min-[992px]:w-1/2`}>
          <span data-a="loc-subtop" className="mb-[20px] block" aria-live="polite">
            {results.length > 0 ? "Currently Available Locations" : "Not found any locations"}
          </span>
          <div
            data-a="loc-inner"
            className="h-[550px] overflow-x-hidden overflow-y-scroll pr-[20px] min-[992px]:max-[1199px]:pr-[5px] [&::-webkit-scrollbar-thumb:hover]:bg-main [&::-webkit-scrollbar-thumb]:rounded-[50px] [&::-webkit-scrollbar-thumb]:bg-[#8B88A4] [&::-webkit-scrollbar-track]:rounded-[50px] [&::-webkit-scrollbar-track]:bg-[#E9E8F2] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:rounded-[50px]"
          >
            {results.map((l) => (
              <LocationBox key={l.id} location={l} />
            ))}
          </div>
        </div>
        <div className={`${BS_COL} min-[992px]:w-1/2 max-[991px]:mt-[30px]`}>
          <MapSection center={[locations[0].latitude, locations[0].longitude]} markers={markers} />
        </div>
      </div>
    </>
  );
}
