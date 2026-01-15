import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">
        <div className="mx-auto px-0 py-10">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
