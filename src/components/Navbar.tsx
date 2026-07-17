"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The Call", href: "#the-call" },
  { label: "Memory", href: "#memory" },
  { label: "Early access", href: "#early-access" },
  { label: "Why Luqas", href: "#why-luqas", brand: true },
];

export default function Navbar({ showReturnHome = false }: { showReturnHome?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    if (latest > lastScrollY && latest > 50) {
      setScrollDirection("down");
    } else if (latest < lastScrollY) {
      setScrollDirection("up");
    }
    setLastScrollY(latest);
  });

  const shouldHideText = scrollDirection === "down" && isScrolled;

  const scrollTo = (hash: string) => {
    if (lenis) {
      lenis.scrollTo(hash, { offset: -24 });
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(hash);
  };

  const renderLabel = (link: (typeof NAV_LINKS)[number]) =>
    link.brand ? (
      <span className="inline-flex items-center gap-1.5">
        Why
        <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={80} height={20} className="h-[13px] w-[32px]" />
      </span>
    ) : (
      link.label
    );

  return (
    <>
      <nav className="w-full flex items-center justify-between pt-8 relative z-50">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex flex-col items-center justify-center relative cursor-pointer"
        >
          <div className="w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/sources/Hero/logo.svg" alt="Luqas Logo" width={45} height={45} className="w-full h-full object-contain" />
          </div>
          <motion.div
            initial={false}
            animate={{
              y: shouldHideText ? -20 : 0,
              opacity: shouldHideText ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={60} height={16} className="h-4 w-[40px]" />
          </motion.div>
        </a>

        {!showReturnHome ? (
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-9 items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[17px] text-[#222222] hover:text-primary transition-colors"
                >
                  {renderLabel(link)}
                </a>
              ))}
            </div>

            <a href="#waitlist" onClick={(e) => handleNavClick(e, "#waitlist")} className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(212,169,95,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-white px-6 py-[14px] rounded-full font-medium text-[16px] flex items-center gap-2"
              >
                Get Started
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center justify-center p-2 text-[#222222] hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </>
        ) : (
          <Link href="/">
            <button className="bg-white text-primary border border-primary/20 px-6 py-[12px] rounded-full font-medium text-[16px] flex items-center gap-2 hover:bg-gray-light transition-colors shadow-sm">
              Return Home
            </button>
          </Link>
        )}
      </nav>

      {/* Mobile Navigation Menu */}
      {!showReturnHome && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-24 left-4 right-4 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-3xl p-6 flex flex-col gap-5 z-40 md:hidden border border-gray/10"
            >
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="flex flex-col gap-5">
                  {i > 0 && <div className="w-full h-[1px] bg-gray/10" />}
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[20px] font-medium text-[#222222] hover:text-primary transition-colors"
                  >
                    {renderLabel(link)}
                  </a>
                </div>
              ))}

              <a href="#waitlist" onClick={(e) => handleNavClick(e, "#waitlist")} className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(212,169,95,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-accent text-white px-6 py-[14px] rounded-full font-medium text-[18px] flex justify-center items-center gap-2"
                >
                  Get Started
                </motion.button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
