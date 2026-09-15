import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { QuickJump } from "@/components/quick-jump";
import { FeaturedWork } from "@/components/featured-work";
import { WorkListing } from "@/components/work-listing";
import { GrowthEconomics } from "@/components/growth-economics";
import { CreativeLabReel } from "@/components/creative-lab-reel";
import { GraphicDesign } from "@/components/graphic-design";
import { BrandIdentityLab } from "@/components/brand-identity-lab";
import { LandingPages } from "@/components/landing-pages";
import { ServicesFull } from "@/components/services-full";
import { SocialLayer } from "@/components/social-layer";
import { Testimonials } from "@/components/testimonials";
import { AboutFull } from "@/components/about-full";
import { SkillsSection } from "@/components/skills-section";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { DarkZone } from "@/components/dark-zone";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <DarkZone>
          <Hero />
        </DarkZone>
        <ProofStrip />
        <QuickJump />
        <AboutFull />
        <SkillsSection />
        <FeaturedWork />
        <WorkListing />
        <GrowthEconomics />

        <DarkZone>
          <div id="creative-lab" className="border-b border-border px-6 pb-4 pt-16 md:px-10">
            <div className="mx-auto max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                Creative Lab
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Ads aren&apos;t just assets. They&apos;re experiments.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                Every hook, script and landing page here exists to test a specific idea about why
                someone would buy.
              </p>
            </div>
          </div>
          <CreativeLabReel />
          <GraphicDesign />
          <BrandIdentityLab />
          <LandingPages />
        </DarkZone>

        <SocialLayer />
        <Testimonials />
        <ServicesFull />
        <DarkZone>
          <Contact />
          <Footer />
        </DarkZone>
      </main>
    </>
  );
}
