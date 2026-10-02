"use client";

import { useState } from "react";

// Live `Hospa_Get_DirectionCard` (`.get-directions-wrap`): the textarea is
// empty with the hospital address as its placeholder, and the button opens
// directions. Here it opens Google Maps directions to whatever was typed, or
// to the hospital address when left empty.
export default function DirectionsCard({
  address,
  placeholder,
  mapImage,
}: {
  address: string;
  /** Live placeholder text when it is not the address (the address stays the default destination). */
  placeholder?: string;
  mapImage: string | null;
}) {
  const [value, setValue] = useState("");
  const open = () => {
    const destination = value.trim() || address;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <div data-a="dir" className="gh-directions">
      <div className="gh-directions__title">
        <h3 data-a="dir-h3">Get Directions</h3>
        <i className="ti ti-current-location" role="button" tabIndex={0} aria-label="Get directions" onClick={open} onKeyDown={(e) => e.key === "Enter" && open()} />
      </div>
      <form
        className="gh-directions__map"
        style={mapImage ? { backgroundImage: `url(${mapImage})` } : undefined}
        onSubmit={(e) => {
          e.preventDefault();
          open();
        }}
      >
        <textarea
          data-a="dir-text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? address}
          aria-label="Destination address"
        />
        <button data-a="dir-btn" type="submit" className="gh-live-btn gh-live-btn--black">
          <i className="ti ti-circle-arrow-right-filled" aria-hidden="true" />
          Get Directions
        </button>
      </form>
    </div>
  );
}
