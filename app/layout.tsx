import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blessingoghie.com"),
  title: {
    default: "Blessing Oghie, Creative Strategist × Performance Marketer",
    template: "%s, Blessing Oghie",
  },
  description:
    "Blessing Oghie builds the creative, sets up and runs the ads, and owns the numbers behind both. Creative Strategist × Performance Marketer based in Lagos, Nigeria, working globally.",
  keywords: [
    "Blessing Oghie",
    "Creative Strategist Nigeria",
    "Creative Strategist Lagos",
    "Performance Marketer Nigeria",
    "Digital Marketer Nigeria",
    "Social Media Manager Nigeria",
    "Consumer Psychology",
    "Growth Economics",
    "DTC Marketing",
    "Growth Marketing",
  ],
  authors: [{ name: "Blessing Oghie" }],
  openGraph: {
    title: "Blessing Oghie, Creative Strategist × Performance Marketer",
    description:
      "Consumer behaviour → Creative → Demand → Performance → Growth. Real work, real numbers.",
    type: "website",
    locale: "en_US",
    siteName: "Blessing Oghie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blessing Oghie, Creative Strategist × Performance Marketer",
    description:
      "Consumer behaviour → Creative → Demand → Performance → Growth. Real work, real numbers.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&f[]=synonym@400,500,600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="grain" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
