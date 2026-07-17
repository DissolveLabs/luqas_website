"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LogoArcs from "@/components/LogoArcs";

// "Named After A Father We Still Talk About." — founder note per Figma.
export default function FounderSection() {
  return (
    <section id="why-luqas" className="w-full bg-[#2D2873] relative overflow-hidden pt-24 lg:pt-28 pb-[340px] px-4 mt-12 scroll-mt-0">
      {/* Concentric arc decorations */}
      <LogoArcs className="absolute top-[-120px] right-[-140px] w-[480px] opacity-10 pointer-events-none" stroke="#FFFFFF" strokeWidth={6} />
      <LogoArcs className="absolute bottom-[-40px] left-[-160px] w-[560px] opacity-10 pointer-events-none" stroke="#FFFFFF" strokeWidth={6} />

      <div className="w-full max-w-[820px] mx-auto flex flex-col items-center text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          className="text-accent font-semibold tracking-[0.18em] uppercase text-[13px] mb-5"
        >
          Named after a father we still talk about.
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          transition={{ delay: 0.1 }}
          className="font-adlam text-[42px] lg:text-[55px] leading-[1.2] text-white tracking-[-0.03em] mb-7"
        >
          Named After A Father We Still Talk About.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          transition={{ delay: 0.2 }}
          className="text-[17px] lg:text-[19px] leading-[32px] text-white/95 max-w-[720px]"
        >
          <Image src="/sources/Hero/logo-text-white.svg" alt="Luqas" width={80} height={20} className="h-[15px] w-[37px] inline-block align-baseline" />{" "}
          is a stylized spelling of Lucas, the name of a co-founder&apos;s late father. We carry his name in ours as a reminder of what this work is for!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mx-auto text-accent text-[19px] mt-12 font-adlam"
        >
          The
          <Image src="/sources/Hero/logo-text-gold.svg" alt="Luqas" width={80} height={20} className="h-[17px] w-[42px] inline-block" />
          team
        </motion.div>
      </div>
    </section>
  );
}
