"use client";

import React from "react";
import HeroSection from "../components/HeroSection";
import NavBar from "@/components/nav-bar";
import Introduction from "../components/Introduction";
import SpecServices from "../components/SpecServices";
import ChoosePulsar from "../components/ChoosePulsar";
import About from "../components/About";

export default function LandingPageView() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <Introduction />
      <SpecServices />
      <ChoosePulsar />
      <About />
    </div>
  );
}
