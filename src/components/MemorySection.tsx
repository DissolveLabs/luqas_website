"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import PhoneStatic from "@/components/PhoneStatic";
import LogoArcs from "@/components/LogoArcs";
import { useLenis } from "@studio-freight/react-lenis";

// "Preserve Memories. Extend Conversations" — text left, phone visual right
// (per reference screenshot), with a directional scroll-linked phone tilt.
export default function MemorySection() {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);

  // Tilt scoped to THIS section only (target ref, not the window). Progress is
  // 0 when the section is entering from the bottom, 0.5 at center, 1 as it
  // exits the top — so the phone tilts 0° -> 40° -> 0° and sits flat whenever
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Phone smoothly rotates from 0° to 30° as the section scrolls from the bottom
  // of the screen to the 80% mark (0 to 0.8 progress). It holds at 30° for the
  // rest of the scroll. When scrolling back up, it stays at 30° until it hits
  // the 80% mark, at which point it smoothly unwinds back to 0°.
  const phoneRotate = useSpring(useTransform(scrollYProgress, [0, 0.8, 1], [0, 30, 30]), {
    stiffness: 40,
    damping: 16,
  });

  return (
    <section ref={sectionRef} id="preserve" className="w-full pt-16 lg:pt-20 pb-14 px-4 relative overflow-hidden bg-white">
      {/* Background arcs: bottom-left corner + center-bottom (per screenshot) */}
      <LogoArcs className="absolute bottom-[-100px] left-[-200px] w-[600px] rotate-[24deg] opacity-70 pointer-events-none" stroke="#EFEFFC" strokeWidth={7} />
      <LogoArcs className="absolute bottom-[-170px] left-[34%] w-[480px] opacity-70 pointer-events-none" stroke="#EFEFFC" strokeWidth={7} />

      <div className="w-full max-w-[1200px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-8">
          {/* Text block */}
          <div className="flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-adlam text-[42px] lg:text-[52px] leading-[1.2] text-[#222222] tracking-[-0.04em] mb-6 max-w-[640px]"
            >
              Preserve Memories. Extend Conversations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[16px] lg:text-[17px] leading-[28px] text-[#222222] max-w-[560px]"
            >
              Some voices are too important to fade away.{" "}
              <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={42} height={17} className="h-[15px] w-[37px] inline-block align-baseline" />{" "}
              turns a minute of recorded audio into a living conversation. Call. Speak. Be remembered by a voice you know by heart.
            </motion.p>
          </div>

          {/* Phone + orbit decorations */}
          <div className="relative flex items-center justify-center py-10">
            {/* Dashed orbit */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-[#8B90DE]/50 pointer-events-none hidden md:block" />
            {/* Dots */}
            <span className="absolute top-[18%] left-[calc(50%-250px)] w-4 h-4 bg-primary rounded-full hidden md:block" />
            <span className="absolute top-[42%] right-[calc(50%-268px)] w-4 h-4 bg-accent rounded-full hidden md:block" />

            {/* Floating waveform badge, left of the phone */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[38%] left-[calc(50%-235px)] w-[52px] h-[52px] bg-white rounded-full shadow-[0_10px_30px_rgba(78,84,200,0.15)] items-center justify-center z-20 hidden md:flex"
            >
              <span className="flex items-end gap-[3px]" aria-hidden="true">
                {[8, 14, 20, 12, 6].map((h, i) => (
                  <span key={i} className="w-[3px] rounded-full bg-primary" style={{ height: `${h}px` }} />
                ))}
              </span>
            </motion.div>

            {/* Floating arc-logo badge, right of the phone — offset enough not to overlap */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[26%] left-[calc(50%+90px)] w-[52px] h-[52px] bg-white rounded-full shadow-[0_10px_30px_rgba(78,84,200,0.2)] items-center justify-center z-20 hidden md:flex"
            >
              <Image src="/sources/Hero/logo.svg" alt="" width={28} height={28} aria-hidden="true" />
            </motion.div>

            {/* Tilting phone */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ rotate: phoneRotate }}
              className="relative z-10"
            >
              <PhoneStatic />
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => lenis?.scrollTo("#why-luqas", { offset: -24 })}
            className="bg-primary text-white font-medium text-[16px] px-8 py-4 rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
          >
            Our Commitment To Privacy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
