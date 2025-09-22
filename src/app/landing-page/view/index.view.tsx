"use client";

import React from "react";
import HeroSection from "../components/HeroSection";
import NavBar from "@/components/nav-bar";
import Introduction from "../components/Introduction";
import SpecServices from "../components/SpecServices";
import ChoosePulsar from "../components/ChoosePulsar";
import About from "../components/About";
import SocialProof from "../components/SocialProof";
import { FaqSection } from "../components/Faq";
import ForCompanies from "../components/ForCompanies";
import Footer from "@/components/footer";
import LandingPageSkeleton from "../components/LandingPageSkeleton";

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
          <NavBar />
          <HeroSection />
          <Introduction />
          <SpecServices />
          <ChoosePulsar />
          <About />
          <SocialProof />
          <FaqSection />
          <ForCompanies />
          <Footer />
        </>
      )}
    </div>
  );
}
