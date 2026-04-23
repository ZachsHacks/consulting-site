import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weiss & Co. · Custom apps, built with AI, shipped in 21 days",
  description:
    "Custom apps for owner-operated businesses stuck on ancient software. Built with AI. Shipped in 21 days. $25,000 flat. Book a free discovery call.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-screen-label="Zach Weiss — Cinematic">{children}</body>
    </html>
  );
}
