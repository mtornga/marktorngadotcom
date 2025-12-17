import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marktornga.com"),
  title: "Mark Tornga | Data + AI Leader",
  description: "Data architecture consulting. Enterprise analytics platforms, AI/ML implementation, and computer vision systems. Open to full-time roles or consulting.",
  keywords: ["data architecture", "data engineering", "Microsoft Fabric", "Power BI", "AI", "machine learning", "computer vision", "consulting", "St. Louis"],
  authors: [{ name: "Mark Tornga" }],
  openGraph: {
    title: "Mark Tornga | Data + AI Leader",
    description: "Data architecture consulting. Enterprise analytics platforms, AI/ML implementation, and computer vision systems.",
    url: "https://marktornga.com",
    siteName: "Mark Tornga",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://marktornga.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mark Tornga - Data + AI Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Tornga | Data + AI Leader",
    description: "Data architecture consulting. Enterprise analytics platforms, AI/ML implementation, and computer vision systems.",
    images: ["https://marktornga.com/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
