"use client";

import React from "react";
import HeroSection from "../components/HeroSection";
import Introduction from "../components/Introduction";
import SpecServices from "../components/SpecServices";
import ChoosePulsar from "../components/ChoosePulsar";
import About from "../components/About";
import SocialProof from "../components/SocialProof";
import { FaqSection } from "../components/Faq";
import ForCompanies from "../components/ForCompanies";
import LandingPageSkeleton from "../components/LandingPageSkeleton";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function LandingPageView() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {loading ? (
        <LandingPageSkeleton />
      ) : (
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div className="max-w-[1400px] mx-auto px-4 py-10">
            <HeroSection />
            <Introduction />
            <SpecServices />
            <ChoosePulsar />
          </div>
          <About />
          <SocialProof />
          <FaqSection />
          <ForCompanies />
          <Footer />
        </div>
      )}
    </div>
  );
}
