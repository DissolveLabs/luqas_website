"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, useMotionValueEvent, useScroll, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MemorySection from "@/components/MemorySection";
import SignatureMomentSection from "@/components/SignatureMomentSection";
import RemembersSection from "@/components/RemembersSection";
import BenefitsSection from "@/components/BenefitsSection";
import RoadmapSection from "@/components/RoadmapSection";
import FounderSection from "@/components/FounderSection";
import CTASection from "@/components/CTASection";
import CustomCursor from "@/components/CustomCursor";
import MagneticElement from "@/components/MagneticElement";
import WaitlistForm from "@/components/WaitlistForm";
import HeroWaveform from "@/components/HeroWaveform";

export default function Home() {
  const { scrollY } = useScroll();

  const avatarsRef = useRef(null);
  const avatarsInView = useInView(avatarsRef, { margin: "-50px" });
  const avatarsControls = useAnimation();

  useEffect(() => {
    if (avatarsInView) {
      avatarsControls.start("show");
    }
  }, [avatarsInView, avatarsControls]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      avatarsControls.start("hidden");
    }
  });

  const headline = "Some Voices Are Worth Calling Back.";
  const words = headline.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <main className="min-h-screen bg-background relative flex flex-col items-center overflow-hidden">
      <CustomCursor />

      {/* Dark band behind the hero card (per Figma) */}
      <div className="absolute top-0 inset-x-0 h-[120px] bg-dark" />

      {/* Hero */}
      <section id="hero" className="w-full px-4 pt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[1440px] bg-light rounded-4xl relative overflow-hidden flex flex-col min-h-[700px] md:min-h-[750px] pb-20 px-4 md:px-10 lg:px-20 mx-auto"
        >
          <Navbar />

          <div className="flex flex-col lg:flex-row mt-14 lg:mt-20 justify-between items-start w-full relative z-10 gap-10">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col max-w-[640px] pt-4"
            >
              <span className="text-primary font-medium tracking-[0.09em] uppercase mb-5 text-[15px]">Coming Early 2026</span>

              <motion.h1
                className="font-adlam text-[56px] lg:text-[84px] leading-[1.05] text-[#222222] tracking-[-0.05em] mb-7 flex flex-wrap justify-start gap-x-[16px] max-w-[620px]"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                {words.map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-[19px] leading-[30px] text-[#222222] mb-10 max-w-[560px] tracking-[-0.01em]"
              >
                The voices that shaped you shouldn&apos;t fade.{" "}
                <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={65} height={17} className="h-[17px] w-[65px] inline-block align-baseline" />{" "}
                is in private beta. Join the waitlist to be among the first to call them back.
              </motion.p>

              {/* Mobile Waveform (Only visible on small screens) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="lg:hidden w-full h-[80px] mb-8 relative flex items-center justify-center"
              >
                <HeroWaveform className="w-full max-w-[400px] h-full" />
              </motion.div>

              {/* Waitlist Form */}
              <div id="waitlist" className="flex flex-col gap-4 relative z-10 scroll-mt-24 w-full max-w-[520px]">
                <MagneticElement>
                  <WaitlistForm />
                </MagneticElement>

                {/* Avatars */}
                <motion.div
                  ref={avatarsRef}
                  className="flex items-center gap-2 mt-3 ml-2"
                  initial="hidden"
                  animate={avatarsControls}
                  variants={{
                    hidden: {
                      transition: { staggerChildren: 0.1, staggerDirection: -1 }
                    },
                    show: {
                      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
                    }
                  }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((num) => (
                      <motion.div
                        key={num}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
                        }}
                      >
                        <Image
                          src={`/sources/Hero/people already using profile-${num}.svg`}
                          alt={`User ${num}`}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border border-white"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, filter: "blur(4px)" },
                      show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, delay: 1 } }
                    }}
                    className="text-primary font-medium text-[14px] ml-1"
                  >
                    12,482 people are already in line.
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column — interactive waveform (per Figma + design blueprint) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block relative w-[525px] h-[560px] flex-shrink-0 mt-6"
            >
              {/* Dashed orbit circle */}
              <div className="absolute top-0 left-0 w-[525px] h-[525px] rounded-full border border-dashed border-[#8B90DE]/70" />
              {/* Gold dot (top) */}
              <span className="absolute top-[10px] left-[169px] w-5 h-5 bg-accent rounded-full" />
              {/* Indigo dot (right) */}
              <span className="absolute top-[352px] right-[-6px] w-5 h-5 bg-primary rounded-full" />
              {/* Big indigo circle */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[85px] top-[378px] w-[178px] h-[178px] bg-primary rounded-full"
              />
              {/* Interactive waveform — original bar heights, stretched full
                  width so the outer bars reach the circle's inner edges */}
              <HeroWaveform className="absolute top-1/2 left-0 -translate-y-1/2 w-[525px] h-[110px]" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Sections */}
      <MemorySection />
      <SignatureMomentSection />
      <RemembersSection />
      <BenefitsSection />
      <RoadmapSection />
      <FounderSection />
      <CTASection />
      <Footer />
    </main>
  );
}
