import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InViewAnimations from "@/components/InViewAnimations";
import Background from "./Background";
import Menu from "@/components/Menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benjamin Berlin - Senior Web Developer",
  description:
    "Leading frontend development teams to leverage cutting-edge front-end ecosystems to rapidly create seamless, accessible, and beautifully animated user interfaces.",
  keywords:
    "Senior Web Developer, Front End Developer, Lead Developer, Web Application Development, Web Development Services, React Developer, Vue.js Expert, TypeScript Migration, Next.js Development, Node.js Developer, High-Performance Web Application Development, Clean Code Principles, Developer Team Mentoring and Training",
  alternates: {
    canonical: "https://www.benberlinfrontend.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.benberlinfrontend.com",
    siteName: "Benjamin Berlin - Senior Web Developer",
    description:
      "Leading frontend development teams to leverage cutting-edge front-end ecosystems to rapidly create seamless, accessible, and beautifully animated user interfaces.",
    images: [
      {
        url: "https://www.benberlinfrontend.com/images/logo.png",
        width: 800,
        height: 800,
        alt: "Benjamin Berlin - Senior Web Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Background />
        <Menu />
        <main className="flex items-center justify-center font-sans pt-25 md:pt-30 min-h-[calc(100vh-80px)]">
          {children}
        </main>
        <InViewAnimations />
      </body>
    </html>
  );
}
