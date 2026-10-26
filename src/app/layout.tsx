import type { Metadata, Viewport } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/auth/provider";
import A11yDevChecks from "@/components/A11yDevChecks";
import { BookingProvider } from "@/context/BookingContext";
import { rootMetadata } from "@/lib/seo/metadata";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${workSans.variable} ${inter.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Pular para conteúdo principal
        </a>
        <AuthProvider>
          <BookingProvider>
            <A11yDevChecks />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
