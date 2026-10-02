export interface BodyNode {
  type: "h2" | "h3" | "h4" | "p" | "ul" | "ol";
  text?: string;
  items?: string[];
}

export interface DoctorCardRef {
  name: string;
  designation: string;
  img: string | null;
}

export interface GenericPageEntry {
  category: string;
  slug: string;
  title: string | null;
  hero_img: string | null;
  body_nodes: BodyNode[];
  doctor_cards: DoctorCardRef[];
  images: string[];
  error?: string;
}

export interface DoctorProfileEntry {
  category: "posts-doctors-1";
  slug: string;
  name: string;
  tags_line: string;
  img: string | null;
  info: Record<string, string>;
  expertise: string[];
  about: string[];
  /** Social profile links for the purple share box (only present on live
      pages that render one — e.g. LinkedIn on dr-alifiya-udaipurwala). */
  socials?: Array<{ icon: string; href: string; label: string }>;
  /** Patient testimonial/quote cards after the About box (only present on
      live pages that render them). */
  testimonials?: Array<{ quote: string; name: string; role: string; img: string | null }>;
}

export type AnyEntry = GenericPageEntry | DoctorProfileEntry;

export interface SpecialistEntry {
  slug: string;
  title: string;
  hero_img: string | null;
  body_nodes: BodyNode[];
  doctors: { name: string; designation: string; img: string | null }[];
}

export interface ConditionPageEntry extends SpecialistEntry {
  sidebarCount: number;
  /** Live verbatim doctors-widget heading when it differs from
      "Available Doctors Under {title}" (diagnostic pages). */
  doctorsTitle?: string;
}

// ---- Specialist / condition pages synced 1:1 from the live site ----
// (data/specialist-live.json, generated from gramyhospital.com's Elementor
// markup: ordered widgets of the `.services-details-desc` column, the
// sidebar widgets, and the page banner.)
export type RichNode = string | { tag: string; attrs?: Record<string, string>; children?: RichNode[] };

export interface LiveDoctor {
  name: string;
  designation: string;
  img: string | null;
  imgWidth?: number;
  imgHeight?: number;
  href: string | null;
  /** No local profile route exists — links to the live profile instead. */
  external?: boolean;
}

export type LiveBlock =
  | { type: "text"; id: string; nodes: RichNode[] }
  | {
      type: "image";
      id: string;
      src: string | null;
      width: number | null;
      height: number | null;
      alt: string;
      /** Elementor `width-initial` widget (custom 143.907% width setting). */
      wide: boolean;
      /** The live <img> carries no width/height attributes. */
      noAttrs?: boolean;
      naturalWidth?: number;
      naturalHeight?: number;
      /** The live file 404s, so the live page shows nothing here. */
      missing?: boolean;
    }
  | { type: "doctors"; id: string; heading: string; loop: boolean; doctors: LiveDoctor[] }
  | { type: "docgrid"; id: string; heading: string; headingWeight: number; doctors: LiveDoctor[] }
  | { type: "list"; id: string; items: string[] }
  | {
      type: "form";
      id: string;
      /** The live form's fourth field is "Website" instead of "Phone" (services-post template). */
      website?: boolean;
    }
  | { type: "question"; id: string; blocks: LiveBlock[] };

export interface LivePage {
  slug: string;
  title: string;
  banner: {
    image: { src: string; width: number; height: number } | null;
    h1: RichNode[];
    breadcrumb: { text: string; href: string | null }[];
    info: string[];
  };
  /** Sidebar column comes first (left on desktop, above the article when stacked). */
  sidebarFirst: boolean;
  leadingSections: number;
  blocks: LiveBlock[];
  sidebar: {
    items: { title: string; href: string; external?: boolean }[];
    /** Hospital address for the Get Directions card; null when the live page has no such card. */
    address: string | null;
    /** Live textarea placeholder when it is not the address itself. */
    placeholder?: string;
    mapImage: string | null;
  };
}
