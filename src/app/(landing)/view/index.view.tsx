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
        <>
          <main className="flex flex-col items-center">
            <NavBar />
            <HeroSection />
            <Introduction />
            <SpecServices />
            <ChoosePulsar />
            <About />
            <SocialProof />
            <FaqSection />
            <ForCompanies />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
