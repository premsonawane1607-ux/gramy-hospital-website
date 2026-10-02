"use client";

import { useEffect, useRef } from "react";

export interface MapMarker {
  lat: number;
  lng: number;
  popupText: string;
}

// Minimal surface of the Leaflet 1.7.1 global used below.
interface LeafletLayer {
  addTo(map: LeafletMap): LeafletLayer;
  bindPopup(text: string): LeafletLayer;
}
interface LeafletMap {
  setView(center: [number, number], zoom: number): LeafletMap;
  removeLayer(layer: LeafletLayer): void;
  remove(): void;
}
interface LeafletGlobal {
  map(el: HTMLElement): LeafletMap;
  tileLayer(url: string, options: { maxZoom: number; attribution: string }): LeafletLayer;
  marker(position: [number, number]): LeafletLayer;
}

const LEAFLET_JS = "/vendor/leaflet/leaflet.js";
const LEAFLET_CSS = "/vendor/leaflet/leaflet.css";
let leafletPromise: Promise<LeafletGlobal> | null = null;

function loadLeaflet(): Promise<LeafletGlobal> {
  if (!leafletPromise) {
    leafletPromise = new Promise((resolve, reject) => {
      const w = window as unknown as { L?: LeafletGlobal };
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = LEAFLET_CSS;
      const js = document.createElement("script");
      js.src = LEAFLET_JS;
      js.async = true;
      let pending = 2;
      const done = () => {
        if (--pending === 0) (w.L ? resolve(w.L) : reject(new Error("Leaflet failed to load")));
      };
      css.onload = done;
      css.onerror = done;
      js.onload = done;
      js.onerror = () => reject(new Error("Leaflet failed to load"));
      document.head.append(css, js);
    });
  }
  return leafletPromise;
}

// Live `.find-location-map` (width/height 100%) wrapping `#map`, fixed at
// `height: 595px` with square corners. Same Leaflet 1.7.1 setup as the live
// page: OpenStreetMap tiles (maxZoom 20), view centred at zoom 12, and one
// default marker per listed location with its name as the popup. Markers are
// replaced whenever the filtered location list changes, as on the live page.
export default function MapSection({ center, markers }: { center: [number, number]; markers: MapMarker[] }) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ L: LeafletGlobal; map: LeafletMap; layers: LeafletLayer[] } | null>(null);
  const markersRef = useRef(markers);
  markersRef.current = markers;

  const drawMarkers = () => {
    const state = mapRef.current;
    if (!state) return;
    state.layers.forEach((layer) => state.map.removeLayer(layer));
    state.layers = markersRef.current.map((m) => state.L.marker([m.lat, m.lng]).addTo(state.map).bindPopup(m.popupText));
  };

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !elRef.current || mapRef.current) return;
        const map = L.map(elRef.current).setView(center, 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 20,
          // The live page passes no attribution; OpenStreetMap's tile usage
          // policy requires one, so it is shown here.
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        mapRef.current = { L, map, layers: [] };
        drawMarkers();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      mapRef.current?.map.remove();
      mapRef.current = null;
    };
    // The map is created once; `center` is a constant for the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(drawMarkers, [markers]);

  return (
    <div className="h-full w-full">
      <div ref={elRef} data-a="loc-map" className="h-[595px]" role="region" aria-label="Map of hospital locations" />
    </div>
  );
}
