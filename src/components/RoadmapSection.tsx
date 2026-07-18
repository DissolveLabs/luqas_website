"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const leftTextVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
  };

  const rightTextVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
  };

  const descVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } }
  };

  const circleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } }
  };

  const dotVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 12, delay: 0.2 } }
  };


  return (
    <section id="how-it-works" className="w-full bg-[#F6F6FE] flex flex-col items-center justify-center py-14 lg:py-20 px-4 relative scroll-mt-4">
      <div className="max-w-[800px] w-full flex flex-col items-center text-center">
        <h2 className="font-adlam text-[45px] lg:text-[55px] text-[#222222] tracking-[-0.04em] mb-16 lg:mb-24 flex items-baseline justify-center gap-x-3 flex-wrap">
          The
          <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={120} height={30} className="h-[41px] w-[102px] inline-block" />
          Launch Roadmap
        </h2>
        
        <div ref={containerRef} className="flex flex-col gap-16 lg:gap-24 w-full relative">
          
          {/* Vertical Progress Lines */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[2px] -translate-x-1/2 z-0">
            {/* Background dashed line */}
            <div className="absolute inset-0 border-l-[2px] border-dashed border-[#C9C9C9] opacity-30"></div>
            {/* Foreground filling line */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight, borderLeft: "2px solid #4E54C8" }} 
            />
          </div>

          {/* === STEP 1 === */}
          {/* Desktop & Mobile */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -50% 0px" }}
            className="grid grid-cols-[1fr_50px_1fr] md:grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Number -> Dot -> Dashes */}
            <div className="flex justify-end items-center pr-2 md:pr-4">
              <motion.div variants={numberVariants}>
                <span className="font-adlam text-[32px] md:text-[55px] leading-none text-transparent [-webkit-text-stroke:1.5px_#4E54C8] md:[-webkit-text-stroke:2.5px_#4E54C8]">
                  01
                </span>
              </motion.div>
              <motion.div variants={dotVariants} className="ml-2 md:ml-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[40px] md:w-[109px] h-auto" />
              </motion.div>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-8 h-8 md:w-14 md:h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                  <Image src="/sources/launch-roadmap/roadmap-waitlist-launch.svg" alt="Waitlist Launch" width={28} height={28} className="w-4 h-4 md:w-7 md:h-7" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <div className="flex flex-col items-start justify-center text-left pl-4 md:pl-12">
              <motion.h3 variants={rightTextVariants} className="font-adlam text-[15px] md:text-[22px] text-[#222222] mb-1">Waitlist Launch</motion.h3>
              <motion.p variants={descVariants} className="text-[12px] md:text-[16px] leading-[1.4] text-gray m-0">Collecting interest and feedback from our early community.</motion.p>
            </div>
          </motion.div>


          {/* === STEP 2 === */}
          {/* Desktop & Mobile */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -50% 0px" }}
            className="grid grid-cols-[1fr_50px_1fr] md:grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Text */}
            <div className="flex flex-col items-end justify-center text-right pr-4 md:pr-12">
              <motion.h3 variants={leftTextVariants} className="font-adlam text-[15px] md:text-[22px] text-[#222222] mb-1">Closed Alpha</motion.h3>
              <motion.p variants={descVariants} className="text-[12px] md:text-[16px] leading-[1.4] text-gray m-0">First voice profiles generated for a small testing group.</motion.p>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-8 h-8 md:w-14 md:h-14 bg-light rounded-full flex items-center justify-center relative">
                <motion.div 
                  className="absolute inset-0 border-2 border-primary rounded-full"
                  animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <Image src="/sources/launch-roadmap/roadmap-closed-alpha.svg" alt="Closed Alpha" width={28} height={28} className="relative z-10 w-4 h-4 md:w-7 md:h-7" />
              </div>
            </motion.div>
            
            {/* Right: Dashes -> Dot -> Number */}
            <div className="flex justify-start items-center pl-2 md:pl-4">
              <motion.div variants={dotVariants} className="mr-2 md:mr-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[40px] md:w-[109px] h-auto scale-x-[-1]" />
              </motion.div>
              <motion.div variants={numberVariants}>
                <span className="font-adlam text-[32px] md:text-[55px] leading-none text-transparent [-webkit-text-stroke:1.5px_#4E54C8] md:[-webkit-text-stroke:2.5px_#4E54C8]">
                  02
                </span>
              </motion.div>
            </div>
          </motion.div>


          {/* === STEP 3 === */}
          {/* Desktop & Mobile */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -50% 0px" }}
            className="grid grid-cols-[1fr_50px_1fr] md:grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Number -> Dot -> Dashes */}
            <div className="flex justify-end items-center pr-2 md:pr-4">
              <motion.div variants={numberVariants}>
                <span className="font-adlam text-[32px] md:text-[55px] leading-none text-transparent [-webkit-text-stroke:1.5px_#4E54C8] md:[-webkit-text-stroke:2.5px_#4E54C8]">
                  03
                </span>
              </motion.div>
              <motion.div variants={dotVariants} className="ml-2 md:ml-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[40px] md:w-[109px] h-auto" />
              </motion.div>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-8 h-8 md:w-14 md:h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Image src="/sources/launch-roadmap/roadmap-beta-release.svg" alt="Beta Release" width={28} height={28} className="w-4 h-4 md:w-7 md:h-7" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <div className="flex flex-col items-start justify-center text-left pl-4 md:pl-12">
              <motion.h3 variants={rightTextVariants} className="font-adlam text-[15px] md:text-[22px] text-[#222222] mb-1">Beta Release</motion.h3>
              <motion.p variants={descVariants} className="text-[12px] md:text-[16px] leading-[1.4] text-gray m-0">Waitlist members get invited to create their profiles.</motion.p>
            </div>
          </motion.div>


          {/* === STEP 4 === */}
          {/* Desktop & Mobile */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -50% 0px", amount: 0.5 }}
            className="grid grid-cols-[1fr_50px_1fr] md:grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Text */}
            <div className="flex flex-col items-end justify-center text-right pr-4 md:pr-12">
              <motion.h3 variants={leftTextVariants} className="font-adlam text-[15px] md:text-[22px] text-[#222222] mb-1">Public Launch</motion.h3>
              <motion.p variants={descVariants} className="text-[12px] md:text-[16px] leading-[1.4] text-gray m-0">
                <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={55} height={14} className="h-[10px] w-[25px] md:h-[12px] md:w-[30px] inline-block align-baseline" />{" "}
                becomes available on App Store and Play Store.
              </motion.p>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-8 h-8 md:w-14 md:h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Image src="/sources/launch-roadmap/roadmap-public-launch.svg" alt="Public Launch" width={28} height={28} className="w-4 h-4 md:w-7 md:h-7" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Dashes -> Dot -> Number */}
            <div className="flex justify-start items-center pl-2 md:pl-4">
              <motion.div variants={dotVariants} className="mr-2 md:mr-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[40px] md:w-[109px] h-auto scale-x-[-1]" />
              </motion.div>
              <motion.div variants={numberVariants}>
                <span className="font-adlam text-[32px] md:text-[55px] leading-none text-transparent [-webkit-text-stroke:1.5px_#4E54C8] md:[-webkit-text-stroke:2.5px_#4E54C8]">
                  04
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
