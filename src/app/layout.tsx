import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://zachweiss.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Weiss & Co. · Custom apps, built with AI, shipped in 21 days",
  description:
    "Custom apps for owner-operated small businesses stuck on spreadsheets, paper, and group chats. Built with AI, shipped in 21 days.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Weiss & Co.",
    title: "Weiss & Co. · Custom apps, built with AI, shipped in 21 days",
    description:
      "Custom apps for owner-operated small businesses stuck on spreadsheets, paper, and group chats. Built with AI, shipped in 21 days.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Weiss & Co. — Custom apps, built with AI, shipped in 21 days",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weiss & Co. · Custom apps, built with AI, shipped in 21 days",
    description:
      "Custom apps for owner-operated small businesses. Built with AI, shipped in 21 days.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-icon", type: "image/png", sizes: "180x180" },
  },
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
