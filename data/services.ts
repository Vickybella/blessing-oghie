import { Sparkles, Target, LineChart, Globe, type LucideIcon } from "lucide-react";

export type Service = {
  key: string;
  icon: LucideIcon;
  label: string;
  solve: string;
  actions: string[];
  deliverables: string[];
  whenToHire: string;
};

export const services: Service[] = [
  {
    key: "creative-strategy",
    icon: Sparkles,
    label: "Creative Strategy",
    solve:
      "Your creative looks fine and still doesn't convert, because it wasn't built from a consumer insight in the first place.",
    actions: [
      "Consumer research",
      "Angle and hook development",
      "Sales storytelling: turning a product or offer into a story people act on",
      "Messaging and offer framing",
      "UGC concepts and scripts",
      "Creative testing plans",
    ],
    deliverables: [
      "Research summary",
      "Angle and hook bank",
      "Creative briefs",
      "Testing roadmap",
    ],
    whenToHire:
      "You're spending on ads but the creative feels like guesswork, or the same few concepts keep getting reused.",
  },
  {
    key: "performance-marketing",
    icon: Target,
    label: "Performance Marketing",
    solve:
      "Ads are live, spend is flowing, and nobody can say with confidence why performance is what it is.",
    actions: [
      "Meta Ads setup and management",
      "Pixel tracking and setup (Meta Pixel, CAPI, GA4)",
      "Campaign architecture",
      "Audience strategy and retargeting",
      "Budget allocation",
      "Scaling and kill decisions",
      "Suspended/disabled account and ad account recovery (Meta, Instagram, Facebook)",
    ],
    deliverables: [
      "Campaign structure",
      "Weekly performance reads",
      "Scaling/kill decisions log",
    ],
    whenToHire:
      "You need someone who treats the account as a system to be diagnosed, not a dashboard to be checked.",
  },
  {
    key: "growth-cro",
    icon: LineChart,
    label: "Growth & CRO",
    solve:
      "Traffic is arriving and not converting, or converting at a cost the business can't actually sustain.",
    actions: [
      "Landing page strategy",
      "Funnel diagnosis",
      "Offer and pricing positioning",
      "Analytics setup and reads",
      "CAC / ROAS analysis",
    ],
    deliverables: [
      "Funnel audit",
      "Landing page recommendations",
      "Unit economics breakdown",
    ],
    whenToHire:
      "ROAS looks fine but you're not sure if the business is actually making money on the spend.",
  },
  {
    key: "digital-marketing",
    icon: Globe,
    label: "Digital Marketing",
    solve: "Paid, organic, and email each tell the same buyer a different story.",
    actions: [
      "SEO fundamentals",
      "Content strategy",
      "Social media management",
      "Email marketing",
      "Cross-channel campaign planning",
    ],
    deliverables: [
      "Channel strategy",
      "Content calendar",
      "Campaign calendar",
    ],
    whenToHire:
      "You need someone who can see the whole acquisition picture and keep every channel pointed at the same buyer, whether that's running the full stack solo or plugging into your existing specialists and team.",
  },
];
