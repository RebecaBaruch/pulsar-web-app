import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pulsar | Psicologia Integrada",
    template: "Pulsar | %s",
  },
  description: "Psicologia humanizada e interdisciplinar.",
  icons: {
    icon: "/icons/favicon.png",
    shortcut: "/icons/favicon.png",
    apple: "/icons/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="utf-8">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
