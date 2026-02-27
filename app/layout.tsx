import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raghav Mittal — AI/ML Engineer & Automation Specialist",
  description:
    "Portfolio of Raghav Mittal — Engineering intelligence through Computer Vision & Automation. Building scalable AI solutions that bridge the gap between data and decision-making.",
  openGraph: {
    title: "Raghav Mittal — AI/ML Engineer & Automation Specialist",
    description:
      "Engineering intelligence through Computer Vision & Automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
