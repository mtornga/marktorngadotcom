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
  title: "Mark Tornga | Highly Extensible Human",
  description: "Portfolio and blog of Mark Tornga - software engineer, maker, and highly extensible human based in St. Louis, Missouri.",
  openGraph: {
    title: "Mark Tornga | Highly Extensible Human",
    description: "Portfolio and blog of Mark Tornga - software engineer, maker, and highly extensible human.",
    url: "https://marktornga.com",
    siteName: "Mark Tornga",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Tornga | Highly Extensible Human",
    description: "Portfolio and blog of Mark Tornga - software engineer, maker, and highly extensible human.",
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
