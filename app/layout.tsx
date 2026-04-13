import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroSphere } from "@/components/esferafondo";
import { Navbar } from "@/components/navbar";
import { LanguageProvider } from "@/contexts/language-context";
import { TransitionProvider } from "@/contexts/transition-context";
import { PageTransition } from "@/components/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alejandro Bast - Software Engineer",
  description: "Full Stack Junior Developer - Creating modern, elegant, and interactive interfaces focused on design, performance, and user experience.",
  keywords: ["Alejandro Bast", "Software Engineer", "Full Stack Developer", "Web Developer", "Portfolio", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Alejandro Bast" }],
  creator: "Alejandro Bast",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alejandrobast.dev",
    siteName: "Alejandro Bast Portfolio",
    title: "Alejandro Bast - Software Engineer",
    description: "Full Stack Junior Developer - Creating modern, elegant, and interactive interfaces focused on design, performance, and user experience.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alejandro Bast - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Bast - Software Engineer",
    description: "Full Stack Junior Developer - Creating modern, elegant, and interactive interfaces focused on design, performance, and user experience.",
    images: ["/og-image.jpg"],
    creator: "@AlejandroBast",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <TransitionProvider>
            <PageTransition />
            <HeroSphere />
            <Navbar />
            <main className="relative z-10">
              {children}
            </main>
          </TransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
