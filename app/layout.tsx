import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raghav Mittal",
  description:
    "Engineering intelligence through latent space exploration. AI/ML Engineer specializing in Computer Vision, Automation, and scalable AI solutions.",
  openGraph: {
    title: "Raghav Mittal",
    description:
      "Engineering intelligence through latent space exploration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
