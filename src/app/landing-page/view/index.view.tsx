"use client";

import React from "react";
import HeroSection from "../components/hero-section";
import NavBar from "@/components/nav-bar";
import Introduction from "../components/introduction";

export default function LandingPageView() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <Introduction />
    </div>
  );
}
