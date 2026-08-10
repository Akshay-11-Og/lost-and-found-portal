import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { DecorativeBackground } from "@/components/decorative-background";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lost & Found | IndiraICEM",
  description: "Report and reclaim lost items across campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      className={cn("h-full", "dark", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
     <body className="min-h-full flex flex-col">
  <DecorativeBackground />
  <Navbar />
  {children}
</body>
    </html>
  );
}
