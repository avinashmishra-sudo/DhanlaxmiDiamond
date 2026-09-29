export type DiamondShape =
  | "Round"
  | "Oval"
  | "Emerald"
  | "Radiant"
  | "Cushion"
  | "Pear"
  | "Princess"
  | "Marquise"
  | "Asscher"
  | "Heart";

export type DiamondOrigin = "Natural" | "Lab-Grown";

export type DiamondColor = "D" | "E" | "F" | "G" | "H" | "I" | "J" | "Fancy Yellow" | "Fancy Pink";

export type DiamondClarity = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";

export type DiamondCut = "Ideal" | "Excellent" | "Very Good";

export interface Diamond {
  id: string;
  sku: string;
  name: string;
  type: DiamondOrigin;
  shape: DiamondShape;
  carat: number;
  color: DiamondColor;
  clarity: DiamondClarity;
  cut: DiamondCut;
  polish: "Excellent" | "Very Good";
  symmetry: "Excellent" | "Very Good";
  fluorescence: "None" | "Faint" | "Medium" | "Strong";
  certificateLab: "GIA" | "IGI" | "HRD" | "In-House Master";
  certificateNumber: string;
  measurements: string;
  tablePct: number;
  depthPct: number;
  ratio?: string;
  price?: number;
  priceType: "fixed" | "on_request";
  description: string;
  images: string[];
  featured?: boolean;
  inStock: boolean;
  videoUrl?: string;
}

export type JewelryCategory =
  | "Rings"
  | "Earrings"
  | "Necklaces"
  | "Bracelets"
  | "Bridal"
  | "Custom Jewelry"
  | string;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "Active" | "Draft" | "Archived";
  featured?: boolean;
  displayOrder: number;
  createdAt?: string;
}

export type PreciousMetal =
  | "18k White Gold"
  | "18k Yellow Gold"
  | "18k Rose Gold"
  | "Platinum"
  | "Two-Tone 18k Gold";

export type RingSettingStyle =
  | "Solitaire"
  | "Halo"
  | "Pave"
  | "Three-Stone"
  | "Bezel"
  | "Vintage";

export interface JewelryItem {
  id: string;
  sku: string;
  name: string;
  category: JewelryCategory;
  collection?: string;
  metal: PreciousMetal;
  totalDiamondWeight: string;
  centerStone?: string;
  description: string;
  price?: number;
  priceType: "fixed" | "on_request";
  images: string[];
  featured?: boolean;
  inStock: boolean;
  settingStyle?: RingSettingStyle;
  compatibleShapes?: DiamondShape[];
  specs: {
    diamondClarity?: string;
    diamondColor?: string;
    settingType?: string;
    dimensions?: string;
  };
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  featuredCount: number;
}

export interface EnquiryItem {
  itemType: "diamond" | "jewelry";
  id: string;
  sku: string;
  name: string;
  image: string;
  subtitle: string;
  detail: string;
}

export interface EnquirySubmission {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  budgetRange: string;
  requirementType: "Private Purchase" | "Wholesale / Retailer" | "Bespoke Commission" | "General Enquiry";
  timeline?: string;
  message: string;
  items: EnquiryItem[];
  status: "New" | "In Consultation" | "Quoted" | "Completed";
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  coverImage: string;
  author: string;
  content: string[];
}

export interface NavLinkItem {
  id: string;
  name: string;
  href: string;
  isHighlighted?: boolean;
  hasDropdown?: boolean;
  displayOrder: number;
  visible: boolean;
}

export interface SiteSettings {
  brandName: string;
  foundingYear: number;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge?: string;
  heroTitleMain?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  announcementText?: string;
  showAnnouncement?: boolean;
  headerCtaText?: string;
  headerCtaHref?: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  headOfficeAddress: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialFacebook: string;
}

export interface AboutGalleryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  displayOrder: number;
}

export interface AboutPageContent {
  videoUrl: string;
  videoPoster: string;
  videoBadge: string;
  videoTitle: string;
  videoDescription: string;
  showVideo: boolean;
  heroImage: string;
  heroBadge: string;
  galleryImages: AboutGalleryImage[];
}

export type AdminPermission =
  | "dashboard"
  | "diamonds"
  | "jewelry"
  | "categories"
  | "header"
  | "about"
  | "enquiries"
  | "cms"
  | "seo"
  | "users";

export type AdminRole =
  | "Super Admin"
  | "Store Manager"
  | "Inventory Specialist"
  | "Sales Concierge"
  | "Custom";

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  password: string;
  role: AdminRole;
  permissions: AdminPermission[];
  status: "Active" | "Inactive";
  createdAt: string;
  lastLogin?: string;
  isPrimaryAdmin?: boolean;
}
