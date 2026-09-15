// Structured content layer. Every metric/quote/case-study field is optional.
// Components render a "Pending" placeholder for any field left undefined, so
// it's visible where real content will slot in once supplied — never a
// fabricated number. Fill in real values as Blessing supplies them.

export const PENDING = "Pending";

import type { LucideIcon } from "lucide-react";
import { Target, TrendingUp, Globe, Sparkles, Share2, Bot } from "lucide-react";

export type VideoReel = {
  creativeAssetURL: string;
  youtubeId?: string;
  startSeconds?: number;
  instagramUrl?: string;
  hook?: string;
  angle?: string;
  objective?: string;
  cta?: string;
  result?: string;
};

export const videoReels: VideoReel[] = [
  {
    creativeAssetURL: "/reels/foundation-reel-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DZUr7vJMW-4/",
    hook: "Who gave this foundation the right to sit like THIS?",
    angle: "Playful hype and shade-match trust over a feature list",
    objective: "Build trust, generate leads, and convert them into buying customers",
    cta: "Send a message on WhatsApp or order",
    result: "Active comment thread asking about pricing and shade availability, and real orders placed off the back of it",
  },
  {
    creativeAssetURL: "/reels/cleaning-reel-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/Da5hBcHMH5s/",
    hook: "Cleaning day just got a little more rewarding.",
    angle: "UGC routine demo tied to the Anniversary Sale offer, not a hard sell",
    objective: "Drive awareness and purchases during the Buy 2 Get 1 Free Anniversary Sale window",
    cta: "Stock up before the offer ends July 24",
    result: "Contributed to the Anniversary Sale's real orders and revenue",
  },
  {
    creativeAssetURL: "/reels/eyewear-reel-poster.jpg",
    youtubeId: "JJMQ2ajBBOo",
    startSeconds: 8,
    hook: "Your eyes are overworked.",
    angle: "Educational: name the problem, make them aware of it, then hand them the solution",
    objective: "Drive leads ready to buy to the landing page to order now",
    cta: "Order now",
    result: "Real orders placed after filling out the form on the landing page",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  hiredFor: string;
  whatChanged: string;
  result: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Usman Imanah",
    role: "CEO, Friska Life",
    quote:
      "Blessing's strategic thinking in our digital marketing efforts, especially campaign planning, content execution, and website optimization, made a real impact.",
    hiredFor: "Digital marketing strategy",
    whatChanged: "Campaign planning, content execution, and website optimization",
    result: "Made a real impact",
  },
];


export const contactInfo: {
  email?: string;
  phone?: string;
  calendly?: string;
  linkedin?: string;
  availability?: string;
} = {
  email: "blessingoghie@outlook.com",
  phone: "+234 814 444 6306",
  linkedin: "https://www.linkedin.com/in/blessing-oghie/",
  availability: "Available, Global / Remote",
};

export type LandingPage = {
  title: string;
  url: string;
  snapshotSrc: string;
};

export const landingPages: LandingPage[] = [
  {
    title: "KeraKleen Anniversary Sale",
    url: "https://www.gliztglobal.com/kerakleen-anniversary-sale-buy-2-get-1-free/",
    snapshotSrc: "/landing-pages/kerakleen-anniversary-sale.jpg",
  },
  {
    title: "Decorative Paint",
    url: "https://www.gliztglobal.com/decorative-paint/",
    snapshotSrc: "/landing-pages/decorative-paint.jpg",
  },
  {
    title: "KeraKleen School Run",
    url: "https://www.gliztglobal.com/kerakleen-school-run/",
    snapshotSrc: "/landing-pages/kerakleen-school-run.jpg",
  },
];

export const contentCalendarUrl =
  "https://docs.google.com/spreadsheets/d/16sP89bkVxuR6OLpndv8KOEg6fNQfkLqG/edit?gid=1667203660#gid=1667203660";

export type GraphicDesignWork = {
  title: string;
  category: string;
  imageSrc: string;
};

export const graphicDesignWork: GraphicDesignWork[] = [
  { title: "Birthday Post Design", category: "Social Media Post", imageSrc: "/graphics/birthday-post.jpg" },
  {
    title: "Brand Affair Studio Poster",
    category: "Marketing Poster",
    imageSrc: "/graphics/brand-affair-studio-poster.png",
  },
  { title: "Job Recruitment Flyer", category: "Marketing Flyer", imageSrc: "/graphics/job-flyer.jpg" },
  { title: "New Month Post", category: "Social Media Post", imageSrc: "/graphics/new-month-post.jpg" },
];

export type BrandIdentityWork = {
  title: string;
  category: string;
  imageSrc: string;
  bg?: "white" | "dark";
};

export const brandIdentityWork: BrandIdentityWork[] = [
  {
    title: "Primary Horizontal Logo",
    category: "Brand Affair Studio",
    imageSrc: "/brand-identity/brand-affair-studio/primary-logo.png",
  },
  {
    title: "Secondary Stacked Logo",
    category: "Brand Affair Studio",
    imageSrc: "/brand-identity/brand-affair-studio/secondary-logo.png",
  },
  {
    title: "Monogram Mark",
    category: "Brand Affair Studio",
    imageSrc: "/brand-identity/brand-affair-studio/monogram.png",
  },
  {
    title: "Social Icon",
    category: "Brand Affair Studio",
    imageSrc: "/brand-identity/brand-affair-studio/social-icon.png",
  },
  {
    title: "Reverse Dark Logo",
    category: "Brand Affair Studio",
    imageSrc: "/brand-identity/brand-affair-studio/reverse-dark-logo.png",
    bg: "dark",
  },
];

export const brandGuidelinesPdf = "/brand-identity/brand-affair-studio/brand-guidelines.pdf";

export type ManagedPageMetric = {
  label: string;
  value: string;
};

export type ManagedPage = {
  platform: string;
  handle?: string;
  url?: string;
  screenshotSrc: string;
  metrics?: ManagedPageMetric[];
  proofScreenshots?: string[];
};

export const managedPages: ManagedPage[] = [
  {
    platform: "Instagram",
    handle: "@be.euphoria.beauty",
    url: "https://www.instagram.com/be.euphoria.beauty/",
    screenshotSrc: "/managed-pages/instagram-1.jpg",
    metrics: [
      { label: "Followers", value: "5,761" },
      { label: "Views (30d)", value: "33.2K" },
      { label: "New Followers (30d)", value: "+116" },
    ],
    proofScreenshots: [
      "/managed-pages/be-euphoria-dashboard-30d.jpg",
      "/managed-pages/be-euphoria-insights-overview.jpg",
      "/managed-pages/be-euphoria-top-content.jpg",
      "/managed-pages/be-euphoria-followers-60d.jpg",
      "/managed-pages/be-euphoria-audience.jpg",
    ],
  },
  {
    platform: "Instagram",
    handle: "@friskalife",
    url: "https://www.instagram.com/friskalife",
    screenshotSrc: "/managed-pages/friskalife-instagram-1.jpg",
    metrics: [
      { label: "Followers", value: "17.2K" },
      { label: "Views (30d)", value: "76.1K" },
      { label: "New Followers (30d)", value: "+132" },
    ],
    proofScreenshots: ["/managed-pages/friskalife-dashboard-30d.jpg"],
  },
  {
    platform: "TikTok",
    handle: "@be.euphoria.beauty",
    url: "https://www.tiktok.com/@be.euphoria.beauty",
    screenshotSrc: "/managed-pages/tiktok-1.jpg",
    metrics: [
      { label: "Followers", value: "1,677" },
      { label: "Likes", value: "29.9K" },
      { label: "Following", value: "0" },
    ],
  },
];

export type Certificate = {
  title: string;
  issuer?: string;
  imageSrc: string;
};

export const certificates: Certificate[] = [
  {
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google / Coursera",
    imageSrc: "/certificates/certificate-3.png",
  },
  {
    title: "Professional Foundations",
    issuer: "ALX / AL Group",
    imageSrc: "/certificates/certificate-professional-foundations.png",
  },
  {
    title: "Digital Ad Expert",
    issuer: "Aleph",
    imageSrc: "/certificates/certificate-2-aleph.png",
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    imageSrc: "/certificates/certificate-2.png",
  },
  {
    title: "AI for Creatives",
    issuer: "ALX / AL Group",
    imageSrc: "/certificates/certificate-ai-for-creatives.png",
  },
];

export type SkillCategory = {
  key: string;
  icon: LucideIcon;
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    key: "creative-strategy",
    icon: Sparkles,
    label: "Creative Strategy",
    skills: [
      "Consumer Insight",
      "Hook Development",
      "Sales Storytelling",
      "Creative Angles",
      "Creative Testing",
      "UGC Sourcing",
      "UGC Direction",
      "Graphic Design",
      "Video Editing",
    ],
  },
  {
    key: "performance-marketing",
    icon: Target,
    label: "Performance Marketing",
    skills: [
      "Meta Ads Manager",
      "Google Ads",
      "TikTok Ads",
      "Pixel Tracking & Setup",
      "Retargeting",
      "Ad Account Recovery",
      "Suspended/Disabled Page Recovery",
    ],
  },
  {
    key: "digital-marketing",
    icon: Globe,
    label: "Digital Marketing",
    skills: ["Email Marketing", "SEO", "Landing Page Optimisation", "GA4 Analytics", "CRO"],
  },
  {
    key: "social-media",
    icon: Share2,
    label: "Social Media",
    skills: [
      "Social Media Management",
      "Content Calendars",
      "Community Management",
      "Short-Form Video",
      "Event Partnerships",
    ],
  },
  {
    key: "growth-commercial",
    icon: TrendingUp,
    label: "Growth & Commercial Literacy",
    skills: ["CAC", "LTV:CAC", "Contribution Margin", "ROAS / MER", "Unit Economics"],
  },
  {
    key: "automation",
    icon: Bot,
    label: "WhatsApp & Lead Automation",
    skills: ["High-Volume WhatsApp Lead Automation", "ManyChat", "Make (Integromat)", "n8n"],
  },
];
