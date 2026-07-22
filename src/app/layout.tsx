import type { Metadata } from "next";
import { ADLaM_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const adlam = ADLaM_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-adlam",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LUQAS",
  description: "Preserve the voices that shaped who you are.",
  icons: {
    icon: "/sources/Hero/logo.svg",
    shortcut: "/sources/Hero/logo.svg",
    apple: "/sources/Hero/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${adlam.variable} ${inter.variable} font-sans antialiased bg-white`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
