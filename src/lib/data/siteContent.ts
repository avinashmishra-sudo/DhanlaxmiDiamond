import { SiteSettings, NavLinkItem, AboutPageContent, AdminUser } from "../types";

export const initialNavLinks: NavLinkItem[] = [
  {
    id: "nav-ring-builder",
    name: "Ring Builder",
    href: "/ring-builder",
    isHighlighted: true,
    displayOrder: 1,
    visible: true,
  },
  {
    id: "nav-diamonds",
    name: "Diamonds",
    href: "/diamonds",
    hasDropdown: true,
    displayOrder: 2,
    visible: true,
  },
  {
    id: "nav-engagement",
    name: "Engagement Rings",
    href: "/ring-builder?step=1",
    displayOrder: 3,
    visible: true,
  },
  {
    id: "nav-jewelry",
    name: "Fine Jewelry",
    href: "/jewelry",
    displayOrder: 4,
    visible: true,
  },
  {
    id: "nav-collections",
    name: "Collections",
    href: "/collections",
    displayOrder: 5,
    visible: true,
  },
  {
    id: "nav-about",
    name: "About the House",
    href: "/about",
    displayOrder: 6,
    visible: true,
  },
  {
    id: "nav-blog",
    name: "Education & Journal",
    href: "/blog",
    displayOrder: 7,
    visible: true,
  },
  {
    id: "nav-contact",
    name: "Contact",
    href: "/contact",
    displayOrder: 8,
    visible: true,
  },
];

export const defaultSiteSettings: SiteSettings = {
  brandName: "DHANLAXMI DIAMOND",
  foundingYear: 2004,
  heroHeadline: "Where Exceptional Diamonds Meet Timeless Craftsmanship",
  heroSubheadline: "Discover carefully selected diamonds and fine jewelry crafted for discerning clients worldwide.",
  heroBadge: "Surat Diamond House • Handcrafted Custom Fine Jewelry",
  heroTitleMain: "Create Your",
  heroTitleHighlight: "Dream Ring",
  heroSubtitle: "Design a one-of-a-kind engagement ring directly from master cutters in Surat. Choose your diamond or setting to begin.",
  announcementText: "FREE INSURED WORLDWIDE ARMORED DELIVERY • DIRECT SURAT CUTTER BENCH PRICING • GIA & IGI CERTIFIED • 30-DAY RETURNS",
  showAnnouncement: true,
  headerCtaText: "Request Quote",
  headerCtaHref: "/request-quote",
  contactEmail: "info@dhanlaxmidiamond.com",
  contactPhone: "+91 98251 00000",
  whatsappNumber: "+919825100000",
  headOfficeAddress: "2,3, A Building, E, Vakahariya Mill, SY -389/A/1, Plot -3, Ashwini Kumar Rd, near Visamo, Surat, Gujarat 395008, India",
  socialInstagram: "https://www.instagram.com/dhanlaxmidiamond/",
  socialLinkedin: "https://www.linkedin.com/company/dhanlaxmi-diamond/",
  socialFacebook: "https://www.facebook.com/profile.php?id=61564307682071",
};

export const craftsmanshipSteps = [
  {
    step: "01",
    title: "Selection",
    tagline: "Rigorous Gemological Vetting",
    description: "Our journey begins at the rough diamond stage. Less than 2% of mined rough meets our strict crystalline purity and color saturation thresholds.",
  },
  {
    step: "02",
    title: "Evaluation",
    tagline: "Optical Geometry & Planning",
    description: "Utilizing advanced Sarine laser tomography, our gemologists study the crystal's atomic tension and internal inclusions to map the mathematically optimal facet angle.",
  },
  {
    step: "03",
    title: "Cutting & Polishing",
    tagline: "Master Craftsmanship in Surat",
    description: "At our historic Surat workbench, seasoned master polishers with decades of generational craft shape each facet by hand, releasing maximum light return and dispersion.",
  },
  {
    step: "04",
    title: "Quality Verification",
    tagline: "Laboratory Benchmark Audit",
    description: "Every stone undergoes stringent scrutiny for symmetry, table balance, girdle thickness, and Polish to guarantee triple-excellent parameters.",
  },
  {
    step: "05",
    title: "Artisanal Setting",
    tagline: "Haute Joaillerie Mountings",
    description: "Our fine jewelry settings are cast in recycled 950 Platinum and 18k Gold, hand-finished to ensure prongs secure stones discreetly without obscuring the diamond cullet.",
  },
  {
    step: "06",
    title: "Final Creation",
    tagline: "An Enduring Family Heirloom",
    description: "Presented with authentic gemological grading dossiers, each Dhanlaxmi piece is delivered to discerning collectors and international retailers across the globe.",
  },
];

export const trustPoints = [
  {
    title: "Uncompromising Quality",
    description: "Curated for exceptional cut grades, superlative fire, and strict eye-clean clarity standards.",
  },
  {
    title: "Certified Diamonds",
    description: "Independently verified by leading global gemological laboratories including GIA and IGI.",
  },
  {
    title: "Global Discerning Clientele",
    description: "Trusted supplier to premier international jewelry houses, wholesalers, and private collectors across the USA, Europe, UK, and Middle East.",
  },
  {
    title: "Transparent Sourcing",
    description: "Adhering strictly to the Kimberley Process and ethical sourcing guidelines since our founding.",
  },
  {
    title: "Personalized Concierge",
    description: "Direct consultative guidance with senior diamond specialists for bespoke commissions and investment stones.",
  },
];

export const verifiedTestimonials = [
  {
    id: "test-01",
    clientName: "Simran Kaur",
    location: "London, United Kingdom",
    role: "Private Client",
    quote: "I found the perfect engagement ring at Dhanlaxmi Diamond! The craftsmanship is exquisite, and they helped me design a piece that was uniquely mine. Their knowledge and attention to detail is unmatched. I felt completely confident in my purchase.",
    source: "Verified Client (Official Dhanlaxmi Record)",
  },
  {
    id: "test-02",
    clientName: "Zhang Lee",
    location: "Singapore",
    role: "Fine Jewelry Collector",
    quote: "A truly professional and modern jewelry experience. I was looking for a high-quality, elegant pair of diamond studs as an investment. The team at Dhanlaxmi Diamond was transparent about the 4Cs and helped me find stones of exceptional value and brilliance. Highly recommended.",
    source: "Verified Client (Official Dhanlaxmi Record)",
  },
  {
    id: "test-03",
    clientName: "Sophia Ali",
    location: "Dubai, United Arab Emirates",
    role: "Private Client",
    quote: "The customer service at Dhanlaxmi Diamond is as beautiful as their jewelry. I was shopping for my mother's anniversary gift, and they were so patient and helpful. They presented stunning options within my budget, and she hasn't taken the necklace off since.",
    source: "Verified Client (Official Dhanlaxmi Record)",
  },
];

export const defaultAboutContent: AboutPageContent = {
  videoUrl: "https://www.youtube.com/embed/g-NfL3qV7zM",
  videoPoster: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop",
  videoBadge: "Surat Diamond Atelier • Master Workbench",
  videoTitle: "The Generational Craft of Diamond Faceting",
  videoDescription: "Step inside our Surat cutting facility to observe how master polishers transform ethically mined rough crystal into fire-emitting, triple-excellent diamonds.",
  showVideo: true,
  heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop",
  heroBadge: "Surat Diamond Cutting Hub • Established 2004",
  galleryImages: [
    {
      id: "gal-01",
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      title: "Rough Diamond Vetting & Planning",
      caption: "Using Sarine laser tomography to map internal inclusions and mathematically optimal facet angles.",
      displayOrder: 1,
    },
    {
      id: "gal-02",
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      title: "Generational Surat Polishing Workbench",
      caption: "Seasoned master cutters with decades of generational craft shape each facet by hand.",
      displayOrder: 2,
    },
    {
      id: "gal-03",
      url: "https://images.unsplash.com/photo-1611591475819-79b8b730ab61?q=80&w=800&auto=format&fit=crop",
      title: "Micro-Pavé Setting in 950 Platinum",
      caption: "Securing delicate brilliant-cut diamonds under high-magnification stereomicroscopes.",
      displayOrder: 3,
    },
    {
      id: "gal-04",
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
      title: "GIA Laboratory Benchmark Scrutiny",
      caption: "Audited for Polish, Symmetry, and Triple-Excellent light return before client delivery.",
      displayOrder: 4,
    },
    {
      id: "gal-05",
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      title: "Haute Joaillerie Mountings",
      caption: "Cast in solid 18k gold and high-density platinum for heirloom endurance.",
      displayOrder: 5,
    },
    {
      id: "gal-06",
      url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
      title: "Final Precision Quality Control",
      caption: "Every creation inspected under 40x darkfield illumination for unyielding excellence.",
      displayOrder: 6,
    },
  ],
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: "user-super-admin",
    username: "admin",
    name: "Executive Director",
    password: "DHANLAXMI",
    role: "Super Admin",
    permissions: [
      "dashboard",
      "diamonds",
      "jewelry",
      "categories",
      "header",
      "about",
      "enquiries",
      "cms",
      "seo",
      "users",
    ],
    status: "Active",
    createdAt: "2004-01-01",
    isPrimaryAdmin: true,
  },
  {
    id: "user-sales-concierge",
    username: "sales",
    name: "VIP Client Concierge",
    password: "SALES2026",
    role: "Sales Concierge",
    permissions: ["enquiries", "dashboard"],
    status: "Active",
    createdAt: "2026-01-15",
    isPrimaryAdmin: false,
  },
  {
    id: "user-vault-manager",
    username: "vault",
    name: "Surat Inventory Specialist",
    password: "VAULT2026",
    role: "Inventory Specialist",
    permissions: ["diamonds", "jewelry", "categories"],
    status: "Active",
    createdAt: "2026-02-10",
    isPrimaryAdmin: false,
  },
];

