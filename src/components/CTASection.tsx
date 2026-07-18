"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticElement from "@/components/MagneticElement";
import WaitlistForm from "@/components/WaitlistForm";

// Gold CTA banner. It straddles the boundary between the founder section
// (deep purple) and the footer (indigo), per Figma — hence the split
// background and the negative top margin.
export default function CTASection() {
  return (
    <section id="join" className="w-full relative px-4 -mt-[300px]">
      {/* Lower half sits on the footer indigo */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-primary" aria-hidden="true" />
      {/* Upper half continues the founder purple */}
      <div className="absolute inset-x-0 top-0 bottom-1/2 bg-[#2D2873]" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[1250px] mx-auto bg-accent rounded-[36px] overflow-hidden flex flex-col lg:flex-row items-stretch justify-between gap-0 lg:gap-10 shadow-[0_40px_90px_rgba(12,11,40,0.25)]">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col max-w-[560px] relative z-10 p-10 lg:p-16 lg:pr-0"
        >
          <h2 className="font-adlam text-[40px] lg:text-[52px] leading-[1.12] text-white tracking-[-0.03em] mb-5">
            Secure Your Place In The{" "}
            <Image src="/sources/Hero/logo-text-white.svg" alt="Luqas" width={120} height={30} className="h-[42px] w-[104px] inline-block align-baseline" />{" "}
            Founding Community.
          </h2>
          <p className="text-[17px] text-white/95 leading-[28px] mb-9">
            We open{" "}
            <Image src="/sources/Hero/logo-text-white.svg" alt="Luqas" width={80} height={20} className="h-[14px] w-[35px] inline-block align-baseline" />{" "}
            in small, careful waves. Leave your email and we will hold you a place.
          </p>

          {/* Waitlist Form */}
          <div className="flex flex-col gap-3">
            <MagneticElement>
              <WaitlistForm variant="gold" />
            </MagneticElement>
            <span className="text-white/80 text-[13px] ml-4 text-center sm:text-left">
              No spam. Only product updates and your invitation link.
            </span>
          </div>
        </motion.div>

        {/* Right Content — phone mockups from Figma */}
        <div className="relative z-10 flex-shrink-0 flex items-end justify-center lg:justify-end px-8 lg:px-12 pb-0 pt-2 lg:pt-10 self-center lg:self-end">
          {/* Outer: scroll entrance from below */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full flex justify-center lg:justify-end"
          >
            {/* Inner: very subtle tilt only — no vertical float so bottom stays anchored */}
            <motion.div
              animate={{ rotate: [-1, 1.5, -1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/sources/cta-phones.svg"
                alt="Luqas app preview"
                width={634}
                height={450}
                className="w-full max-w-[440px] lg:max-w-[500px] h-auto object-contain drop-shadow-2xl block translate-y-[24px] origin-bottom scale-[1.2] lg:scale-[1.25]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative background inside the banner */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E3BD76] rounded-full filter blur-[80px] -mr-[200px] -mt-[200px] z-0" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C19851] rounded-full filter blur-[80px] -ml-[200px] -mb-[200px] z-0" aria-hidden="true" />
      </div>
    </section>
  );
}
