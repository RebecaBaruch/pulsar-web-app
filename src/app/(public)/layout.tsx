import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
