import Hero from "@/components/sections/home/Hero";
import AboutIntro from "@/components/sections/home/AboutIntro";
import PracticeAreasScroller from "@/components/sections/home/PracticeAreasScroller";
import FounderSection from "@/components/sections/home/FounderSection";
import Clients from "@/components/sections/home/Clients";
import VideoGallery from "@/components/sections/home/VideoGallery";
import HomeAttorneys from "@/components/sections/home/HomeAttorneys";
import HomeBlogStack from "@/components/sections/home/HomeBlogStack";
import ProcessSection from "@/components/sections/home/ProcessSection";
import ConsultationSection from "@/components/sections/shared/ConsultationSection";
import HomeReviews from "@/components/sections/home/HomeReviews";
import FooterCta from "@/components/sections/home/FooterCta";
import { getContent, setRequestLocale } from "@/content";
import { HIDDEN } from "@/lib/hidden";
import RouteSeo from "@/components/layout/RouteSeo";
import { routeMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  return routeMetadata(params, "/");
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = setRequestLocale((await params).lang);
  const { consultation } = getContent(locale).sections;
  return (
    <main className="page">
      <RouteSeo route={"/"} />
      <Hero />
      <AboutIntro />
      <PracticeAreasScroller />
      <FounderSection />
      <Clients />
      {!HIDDEN.videoGallery && <VideoGallery />}
      <HomeAttorneys />
      <HomeBlogStack />
      <ProcessSection />
      <ConsultationSection contactText={consultation.homeContactText} />
      <HomeReviews />
      <FooterCta />
    </main>
  );
}
