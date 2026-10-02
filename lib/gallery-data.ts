// Gallery -> Hospital / OT / Wards categories, scraped in original order from
// the live site's Elementor gallery widget (elementor-element-9a6d3e4).
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

export interface GalleryCategory {
  key: string;
  label: string;
  images: GalleryImage[];
}

export const galleryCategories: GalleryCategory[] = [
  {
    key: "hospital",
    label: "Hospital",
    images: [
      { src: "/images/gallery/hospital-ot-wards/WhatsApp-Image-2026-07-29-at-10.13.33-AM-1.jpeg", width: 300, height: 225 },
      { src: "/images/gallery/hospital-ot-wards/WhatsApp-Image-2026-07-29-at-10.13.34-AM.jpeg", width: 225, height: 300 },
      { src: "/images/root/IMG-20260729-WA0012.jpg", width: 300, height: 225 },
      { src: "/images/gallery/hospital-ot-wards/IMG-20260729-WA0011.jpg", width: 225, height: 300 },
      { src: "/images/root/IMG-20260729-WA0010.jpg", width: 240, height: 300 },
      { src: "/images/gallery/hospital-ot-wards/IMG-20260729-WA0019.jpg", width: 225, height: 300 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-172-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-27-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-52-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-160-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-90-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-83-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-152-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-93-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-87-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-1-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-150-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-159-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-56-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-196-scaled.jpg", width: 300, height: 200 },
    ],
  },
  {
    key: "ot",
    label: "OT",
    // Only 16 real original OT photos exist in the downloaded assets —
    // short of the requested 20 (5x4). Not padded with duplicates per
    // instruction; the grid below renders whatever count a category has.
    images: [
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-125-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-134-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-148-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-139-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-123-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-131-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-145-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-147-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-140-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-144-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-129-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-118-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/newimg44.jpeg", width: 300, height: 139 },
      { src: "/images/gallery/hospital-ot-wards/newimg21.jpeg", width: 300, height: 139 },
      { src: "/images/site/newimg14.jpeg", width: 139, height: 300 },
      { src: "/images/gallery/hospital-ot-wards/newimg1.jpeg", width: 300, height: 139 },
    ],
  },
  {
    key: "wards",
    label: "Wards",
    images: [
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-67-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-61-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-69-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-64-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-70-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-72-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-78-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-47-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-41-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-74-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-18-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-32-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-119-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-44-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-35-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-39-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-24-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-46-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-37-scaled.jpg", width: 300, height: 200 },
      { src: "/images/gallery/hospital-ot-wards/Gramy-Hospita-15-scaled.jpg", width: 300, height: 200 },
      // 28 real original Wards photos exist; capped at 20 (5x4 grid) per
      // request, keeping the original scrape order. The remaining 8
      // (Gramy-Hospita-40/38/30/28/7/21/8/3-scaled.jpg) are real, unused
      // originals — not deleted from /public, just not shown in this grid.
    ],
  },
];
