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
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
