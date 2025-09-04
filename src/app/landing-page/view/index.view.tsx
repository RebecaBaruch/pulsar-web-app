"use client";

import React from "react";
import HeroSection from "../components/HeroSection";
import NavBar from "@/components/nav-bar";
import Introduction from "../components/Introduction";
import SpecServices from "../components/SpecServices";

export default function LandingPageView() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <Introduction />
      <SpecServices />
    </div>
  );
}
