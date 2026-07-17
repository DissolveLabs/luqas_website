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
  title: "Luqas Waitlist",
  description: "Preserve the voices that shaped who you are.",
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
