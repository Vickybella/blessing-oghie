// Deep case-study data model. Every narrative/metric field is optional —
// left undefined until Blessing supplies the real material. Never fabricate
// a number, quote, or outcome. "tier" controls homepage prominence:
// 1 = flagship (featured), 2 = supporting, 3 = gallery.

export type Industry = "Real Estate" | "Lifestyle" | "Ecommerce" | "Entertainment";

export type ProjectCategory = "Creative" | "Performance" | "Digital" | "Ecommerce" | "Web";

export type AdReport = {
  campaign: string;
  spend: string;
  resultCount: string;
  resultLabel: string;
  costPerResult: string;
  screenshotSrc: string;
};

export type BrandAsset = {
  label: string;
  imageSrc: string;
  bg?: "white" | "dark";
};

export type Project = {
  slug: string;
  client: string;
  industry: Industry;
  categories: ProjectCategory[];
  tier: 1 | 2 | 3;
  coverImage: string;
  website?: string;
  instagram?: string;

  // 01 Overview
  role?: string;
  services?: string[];
  timeline?: string;

  // Context → Problem → Insight → Strategic Decision → Creative System →
  // Execution → Distribution → Result → Economics → Learning
  context?: string;
  challenge?: string;
  insight?: string;
  strategy?: string;
  creativeStrategy?: string;
  execution?: string;
  distribution?: string;
  result?: string;
  economics?: string;
  performance?: {
    creative?: { hookRate?: string; ctr?: string; engagement?: string };
    acquisition?: { cpc?: string; cpa?: string; cac?: string };
    conversion?: { cvr?: string; aov?: string };
    business?: { revenue?: string; roas?: string; contributionMargin?: string; profit?: string };
  };
  businessImpact?: string;
  learnings?: string;
  adReports?: AdReport[];
  brandAssets?: BrandAsset[];
  guidelinesPdf?: string;
  coverFit?: "cover" | "contain";

  testimonial?: { quote: string; name: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "glizt-paint",
    client: "Glizt Paint",
    industry: "Lifestyle",
    categories: ["Creative", "Performance"],
    tier: 1,
    coverImage: "/covers/glizt-paint-cover.jpg",
    role: "Creative Strategist & Performance Marketer",
    timeline: "Since November 2025",
    website: "https://www.gliztglobal.com/",
    instagram: "https://www.instagram.com/gliztpaint/",
    context:
      "Glizt Paint sells premium paint to retail buyers, distributors, and private project clients across Nigeria, offers painting services, and had just launched two new lines: Decorative Paint and Graphitex Paint (which includes Marble Trowel).",
    challenge:
      "The goal was sales, not reach, real distributors and bulk buyers for two newly launched paint lines, plus steady private-project clients.",
    strategy:
      "Ran a landing page and a direct WhatsApp ad in parallel to qualify buyers fast, timed to Nigeria's dry season when repainting demand peaks.",
    creativeStrategy:
      "Split the message by buyer type: distributor-facing creative led with bulk pricing and reliability, while the direct-to-WhatsApp ad led with the product itself for faster, lower-consideration buyers.",
    distribution:
      "Ran in parallel across a landing page funnel and a direct WhatsApp ad, with every lead routed to a real conversation, a call or a chat, not a form that sits in an inbox. The Graphitex Paint launch alone pulled in leads from 29 states across all six geopolitical zones, not just Lagos, with close to a third of respondents specifically flagging distributor interest.",
    result:
      "159 WhatsApp conversations started at ₦409.81 each, opening direct conversations with distributors and private project buyers instead of one-off retail sales. The Graphitex Paint launch funnel alone brought in 100+ leads across two campaign waves, including several bulk orders in the hundreds of paint buckets, real evidence the distributor and estate-supply targeting was reaching high-volume buyers, not just retail shoppers.",
    economics:
      "No revenue reported yet on this account, so success was measured on cost per conversation started, ₦409.81, a direct sales signal, not a vanity number.",
    learnings:
      "Distributors and private project buyers convert on a call or a WhatsApp message, not a checkout button, so the ad's only job is to start that conversation.",
    performance: {
      acquisition: { cpa: "₦409.81 per conversation started" },
    },
    adReports: [
      {
        campaign: "Glizt Premium Paint: WhatsApp Leads",
        spend: "₦65.16K",
        resultCount: "159",
        resultLabel: "Messaging Conversations Started",
        costPerResult: "₦409.81",
        screenshotSrc: "/ad-reports/glizt-paint-leads.jpeg",
      },
      {
        campaign: "Glizt Premium Paint: WhatsApp Leads (11/08)",
        spend: "₦65.63K",
        resultCount: "99",
        resultLabel: "Messaging Conversations Started",
        costPerResult: "₦662.94",
        screenshotSrc: "/ad-reports/glizt-paint-campaigns-overview.png",
      },
    ],
  },
  {
    slug: "kerakleen",
    client: "KeraKleen by Glizt",
    industry: "Lifestyle",
    categories: ["Performance", "Digital"],
    tier: 2,
    coverImage: "/landing-pages/kerakleen-hero-crop.jpg",
    role: "Performance Marketer",
    timeline: "Jul – Aug 2026",
    website: "https://www.gliztglobal.com/",
    instagram: "https://www.instagram.com/gliztpaint/",
    context:
      "KeraKleen is Glizt's household and commercial cleaning line, sold through WhatsApp and a direct-order landing page.",
    challenge:
      "KeraKleen needed to know which channel actually converts buyers, a landing page or a direct WhatsApp conversation, instead of guessing and splitting budget evenly.",
    strategy:
      "Phased the campaign: ran traffic ads first to build awareness and warm up the audience, then launched a landing page funnel and a direct-to-WhatsApp ad side by side to convert that warm audience, letting cost-per-result decide. WhatsApp outperformed and took the bulk of the budget.",
    insight:
      "Rewrote the CTA from a generic \"Click Order Now\" to a plain \"Chat us to order,\" which outperformed. The landing page ran a live bonus-slots counter tied to real order data pulled from Google Sheets, not a fake decrementing number, a deliberate call to skip the dark pattern.",
    creativeStrategy:
      "Tested a landing page against a direct-to-WhatsApp ad running the same Anniversary Sale offer, then let cost-per-result pick the winner instead of a gut call.",
    distribution:
      "Split budget across Instagram traffic, a direct WhatsApp ad, and a dedicated bundle-offer landing page, each measured on its own cost per result rather than one blended number.",
    economics:
      "₦541,580 spent to generate ₦3.75M+ in revenue, every ₦1 in ad spend returned roughly ₦6.92, comfortably inside a margin that funds the next campaign instead of just breaking even.",
    learnings:
      "Direct-to-WhatsApp beat the landing page on cost per result, proof that removing a step between the ad and a real conversation usually wins, even when the landing page looks more polished.",
    performance: {
      acquisition: { cpc: "₦24.34 per profile visit", cpa: "₦825.59 per conversation started" },
      business: { revenue: "₦3,750,000+", roas: "6.92x" },
    },
    businessImpact:
      "150+ orders from the Anniversary Sale (Buy 2/4/6 Get 1/2/3 Free). A separate bundle-offer landing page converted 400+ visitors at ₦1,000 each, more than half going on to buy, with B2B tiers starting from ₦75,000.",
    result:
      "656 WhatsApp conversations at ₦825.59 each converted into 150+ orders and ₦3.75M+ in revenue, a 6.92x ROAS on the Anniversary Sale campaign. The bundle-offer landing page added 400+ conversions at ₦1,000 each, with more than half converting to paid purchases at B2B tiers from ₦75,000.",
    adReports: [
      {
        campaign: "KeraKleen: Traffic Ads",
        spend: "₦122.16K",
        resultCount: "5K",
        resultLabel: "Instagram Profile Visits",
        costPerResult: "₦24.34",
        screenshotSrc: "/ad-reports/kerakleen-traffic.jpeg",
      },
      {
        campaign: "KeraKleen Anniversary Sale: Leads",
        spend: "₦541.58K",
        resultCount: "656",
        resultLabel: "Messaging Conversations Started",
        costPerResult: "₦825.59",
        screenshotSrc: "/ad-reports/kerakleen-leads.jpeg",
      },
      {
        campaign: "KeraKleen: School Run WhatsApp",
        spend: "₦95.70K",
        resultCount: "104",
        resultLabel: "Messaging Conversations Started",
        costPerResult: "₦920.16",
        screenshotSrc: "/ad-reports/kerakleen-campaigns-overview.png",
      },
    ],
  },
  {
    slug: "be-euphoria-beauty",
    client: "Be Euphoria Beauty",
    industry: "Lifestyle",
    categories: ["Performance", "Ecommerce"],
    tier: 2,
    coverImage: "/ad-reports/be-euphoria-beauty.jpeg",
    role: "Performance Marketer",
    timeline: "Jul – Aug 2026",
    context:
      "Be Euphoria Beauty sells LuxeFinish foundation, a product where the real barrier to buying isn't price, it's trust that the shade will match.",
    challenge:
      "Traffic was landing on the site with no structured way to turn a visit into a conversation, views weren't the problem, direction was.",
    strategy:
      "Phased the campaign: cheap landing page traffic first to prove demand, then a dedicated WhatsApp lead phase built directly on that same audience.",
    insight:
      "Ran Meta and TikTok traffic in parallel to find the cheapest path to a landing page view. Meta's website-views lane came in around 10x more efficient than TikTok's cold traffic, and one creative concept (built around the brand's CEO) carried 62% of all views on its own at the lowest cost of any creative on the account.",
    creativeStrategy:
      "Built a 5-part offer stack led with a shade-match guarantee instead of a discount, on the insight that the real barrier to buying foundation is trust in the shade, not price.",
    distribution:
      "Tested Meta and TikTok traffic in parallel before committing budget, then moved the winning lane into a dedicated WhatsApp lead phase.",
    result:
      "199 WhatsApp leads converted into 28 paid orders and ₦560,000 in revenue, a 4.59x return on the ₦122.04K spent on that phase.",
    economics:
      "₦122.04K spent on the lead phase generated ₦560,000 in revenue, a 4.59x return once actual orders were counted, not just conversations.",
    learnings:
      "Meta's website-view lane beat TikTok's cold traffic by roughly 10x on cost efficiency in this test, a reminder to prove a channel cheap before scaling it, not the other way round.",
    performance: {
      acquisition: { cpc: "₦34.75 per landing page view", cpa: "₦613.28 per conversation started" },
      business: { revenue: "₦560,000", roas: "4.59x" },
    },
    businessImpact: "199 WhatsApp leads converted into 28 paid orders.",
    adReports: [
      {
        campaign: "BEB Phase 2: WhatsApp Leads",
        spend: "₦122.04K",
        resultCount: "199",
        resultLabel: "Messaging Conversations Started",
        costPerResult: "₦613.28",
        screenshotSrc: "/ad-reports/be-euphoria-beauty.jpeg",
      },
      {
        campaign: "BEB Phase 1: Traffic",
        spend: "₦71.38K",
        resultCount: "2.1K",
        resultLabel: "Landing Page Views",
        costPerResult: "₦34.75",
        screenshotSrc: "/ad-reports/be-euphoria-beauty.jpeg",
      },
    ],
  },
  {
    slug: "modestdraper",
    client: "Modestdraper",
    industry: "Lifestyle",
    categories: ["Performance", "Ecommerce"],
    tier: 2,
    coverImage: "/ad-reports/modestdraper-spend-crop.jpg",
    role: "Performance Marketer & Brand Strategist",
    timeline: "Jul 2026 – ongoing",
    context:
      "Modestdraper sells high-ticket foreign lace to a status-conscious buyer, where positioning carries as much weight as the product.",
    challenge:
      "Modestdraper had real reach, nearly 23K profile visits, and real conversations, but not enough of either turned into a sale at a ₦500K+ price point. The original positioning around a narrow political audience was reputationally risky too.",
    strategy:
      "Retargeted the traffic into WhatsApp conversations first, then repositioned the brand around status and authority instead of a narrow political frame, with real buyer segmentation by age, diaspora market, and the PAs and stylists who often shop on behalf of elite buyers.",
    creativeStrategy:
      "Moved the brand away from a narrow political frame toward a broader status-and-authority angle, backed by real buyer segmentation instead of one generic audience.",
    distribution:
      "Split traffic and retargeting into separate campaigns, with domestic Nigeria and diaspora markets targeted as distinct audiences rather than one blended pool.",
    result:
      "Retargeting turned part of the 22,965-visit audience into 227 direct WhatsApp conversations. The repositioning and buyer segmentation work built on top of that is newly live, with fresh results still to come.",
    economics:
      "At a ₦500K+ price point, a single sale can justify a much higher cost per conversation than a mass-market product, so the account was built to tolerate a higher CPA in exchange for a genuinely qualified buyer. Total account spend to date sits at ₦10,286,140.68, straight from the Meta Ads Manager dashboard.",
    learnings:
      "Reach and conversations were never the problem, the account needed a buyer worth ₦500K+ to see themselves in the brand before they'd act.",
    performance: {
      acquisition: { cpc: "₦31.41 per profile visit", cpa: "₦1,585.63 per conversation started" },
    },
    adReports: [
      {
        campaign: "July Instagram Traffic Ads",
        spend: "₦721.37K",
        resultCount: "22,965",
        resultLabel: "Instagram Profile Visits",
        costPerResult: "₦31.41",
        screenshotSrc: "/ad-reports/modestdraper.jpeg",
      },
      {
        campaign: "Retargeting WhatsApp Ads",
        spend: "₦359.94K",
        resultCount: "227",
        resultLabel: "Messaging Conversations Started",
        costPerResult: "₦1,585.63",
        screenshotSrc: "/ad-reports/modestdraper.jpeg",
      },
      {
        campaign: "September Instagram Traffic Ads",
        spend: "₦468.20K",
        resultCount: "18,142",
        resultLabel: "Instagram Profile Visits",
        costPerResult: "₦25.81",
        screenshotSrc: "/ad-reports/modestdraper-campaigns-overview.png",
      },
    ],
  },
  {
    slug: "brand-affair-studio",
    client: "Brand Affair Studio",
    industry: "Lifestyle",
    categories: ["Creative", "Web"],
    tier: 2,
    website: "https://brand-affair-studio.vercel.app/",
    coverImage: "/brand-identity/brand-affair-studio/reverse-dark-logo.png",
    coverFit: "contain",
    role: "Brand Identity Designer",
    timeline: "3-week engagement",
    context:
      "Brand Affair Studio needed a visual identity that could travel across every touchpoint without being redesigned each time.",
    challenge:
      "Brand Affair Studio had no visual identity that could travel: every asset was designed one-off, so nothing looked like it belonged to the same brand.",
    strategy:
      "Built the identity system first, logo marks, colour palette, and the guideline behind them, so every future asset comes from one source instead of being reinvented each time.",
    creativeStrategy:
      "Designed the identity to work as a system, not a set of one-off assets: every mark, colour, and guideline rule built to be reused correctly without a briefing call.",
    execution:
      "Designed the brand's full visual identity from the ground up: primary and secondary logo marks, colour system, and the guideline that keeps it consistent across every touchpoint.",
    result:
      "Delivered a complete identity system, primary and secondary logo marks, a colour palette, and the guideline behind them, ready to hand to any designer or printer without a briefing call.",
    economics:
      "A one-time identity system costs less than the ongoing cost of re-briefing a designer for every new asset, the investment pays for itself the first time it's reused without a revision round.",
    learnings:
      "A brand without a documented system isn't inconsistent because of bad taste, it's inconsistent because nothing was written down.",
    guidelinesPdf: "/brand-identity/brand-affair-studio/brand-guidelines.pdf",
    brandAssets: [
      {
        label: "Primary Horizontal Logo",
        imageSrc: "/brand-identity/brand-affair-studio/primary-logo.png",
      },
      {
        label: "Secondary Stacked Logo",
        imageSrc: "/brand-identity/brand-affair-studio/secondary-logo.png",
      },
      {
        label: "Monogram Mark",
        imageSrc: "/brand-identity/brand-affair-studio/monogram.png",
      },
      {
        label: "Social Icon",
        imageSrc: "/brand-identity/brand-affair-studio/social-icon.png",
      },
      {
        label: "Reverse Dark Logo",
        imageSrc: "/brand-identity/brand-affair-studio/reverse-dark-logo.png",
        bg: "dark",
      },
    ],
  },
  {
    slug: "friska-life",
    client: "Friska Life",
    industry: "Lifestyle",
    categories: ["Digital"],
    tier: 3,
    coverImage: "/covers/friska-life-cover.jpg",
    website: "https://friskalife.com/",
    instagram: "https://www.instagram.com/friskalife",
    role: "Digital Marketing Strategist",
    timeline: "Aug – Oct 2025",
    context:
      "Friska Life runs on a mix of campaigns, content, and a website that all needed to work off the same plan.",
    challenge:
      "Friska Life's campaign planning, content, and website weren't pulling in the same direction, each was being handled as its own separate task.",
    strategy:
      "Ran campaign planning, content execution, and website optimization as one strategy instead of three disconnected to-dos.",
    creativeStrategy:
      "Aligned content and campaign creative to one strategy instead of producing content and ads as two separate workstreams.",
    distribution:
      "Ran campaign planning, content, and website optimization as one coordinated push instead of three separately scheduled efforts.",
    result:
      "Tightened campaign planning, content, and website work into one direction, a change the CEO highlighted directly as making a real impact.",
    economics:
      "Impact was measured through the client's own read of the business, not a single ad account metric, since the engagement spanned campaigns, content, and the website itself.",
    learnings:
      "The impact came from treating three separate to-dos as one strategy, not from any single channel outperforming.",
    testimonial: {
      quote:
        "Blessing's strategic thinking in our digital marketing efforts, especially campaign planning, content execution, and website optimization, made a real impact.",
      name: "Usman Imanah",
      role: "CEO, Friska Life",
    },
  },
  {
    slug: "bilkebab",
    client: "Bilkebab Chops N Coffee",
    industry: "Lifestyle",
    categories: ["Web"],
    tier: 3,
    coverImage: "/covers/bilkebab-cover.jpg",
    website: "https://bilkebab.com/",
    role: "Website Designer",
    timeline: "Aug – Oct 2025",
    context:
      "Bilkebab Chops N Coffee is a Nigerian fast-food chain with four locations, online ordering, and a retail product line, Blends by Bilkebab.",
    challenge:
      "A four-location chain with a growing menu and a retail product line had no single website to order from, book a table, or enquire about catering.",
    strategy:
      "Designed and built one site to carry all of it: menu browsing, online ordering, table reservations, and catering enquiries across all four locations.",
    result:
      "A live website handling ordering, reservations, and catering enquiries for the full Bilkebab menu and retail line.",
    learnings:
      "A restaurant with multiple locations and a growing product line needs one system, not a page per outlet bolted on over time.",
  },
];

export const flagshipProject = projects.find((p) => p.tier === 1) ?? projects[0];

// Real, documented ad performance data — single source of truth for every
// section on the site that shows proof numbers, so they never drift apart.
function parseCount(s: string): number {
  const clean = s.replace(/,/g, "");
  return clean.endsWith("K") ? parseFloat(clean) * 1000 : parseFloat(clean);
}

export const adReports = projects.flatMap((p) =>
  (p.adReports ?? []).map((r) => ({ ...r, client: p.client })),
);

export const adStats = {
  // Years of hands-on marketing experience, as stated directly by Blessing.
  experienceYears: "3+",
  // Career total ad spend managed, as stated directly by Blessing — the
  // documented reports above are a sample of this work, not the full total
  // (real screenshots only exist for a portion of what she's managed).
  careerAdSpend: "₦10M+",
  // Total brands served across her career, as stated directly by Blessing —
  // the documented ad reports above only cover the brands with real Meta
  // Ads Manager screenshots, a subset of the full client list.
  brandsServed: "10+",
  // Brands with actual Meta Ads Manager screenshots documented above — the
  // subset "brandsServed" is drawn from, used for the spend-by-brand chart
  // where every slice must map to a real, shown report.
  documentedBrands: new Set(adReports.map((r) => r.client)).size,
  campaignsRun: adReports.length,
  conversationsStarted: adReports
    .filter((r) => r.resultLabel === "Messaging Conversations Started")
    .reduce((sum, r) => sum + parseCount(r.resultCount), 0),
};
