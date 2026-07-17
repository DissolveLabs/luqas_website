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
    hidden: { opacity: 0.3 },
    show: { opacity: 1, transition: { duration: 0.5 } }
  };

  const dotVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 12, delay: 0.2 } }
  };

  const renderMobileStep = (stepNum: string, title: string, desc: React.ReactNode, iconSrc: string, IconAnimation: React.ComponentType<{ children: React.ReactNode }>, isPulse?: boolean) => (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "10000px 0px -40% 0px" }}
      className="md:hidden flex flex-col items-start w-full relative z-10 pl-[80px]"
    >
      <motion.div variants={circleVariants} className="absolute left-0 top-0 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
        <div className="w-14 h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
          {isPulse && (
            <motion.div 
              className="absolute inset-0 border-2 border-primary rounded-full"
              animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <IconAnimation>
            <Image src={iconSrc} alt={title} width={28} height={28} className="relative z-10" />
          </IconAnimation>
        </div>
      </motion.div>
      
      <div className="flex flex-col items-start justify-center text-left pt-2">
        <motion.h3 variants={rightTextVariants} className="font-adlam text-[22px] text-[#222222] mb-1">{title}</motion.h3>
        <motion.p variants={descVariants} className="text-[16px] text-gray m-0">{desc}</motion.p>
      </div>

      <motion.div variants={numberVariants} className="absolute left-[24px] top-[90px]">
        <Image src={`/sources/launch-roadmap/0${stepNum}.svg`} alt={`0${stepNum}`} width={32} height={32} className="h-auto" />
      </motion.div>
    </motion.div>
  );

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
          <div className="absolute left-[39px] md:left-1/2 top-10 bottom-10 w-[2px] -translate-x-1/2 z-0">
            {/* Background dashed line */}
            <div className="absolute inset-0 border-l-[2px] border-dashed border-[#C9C9C9] opacity-30"></div>
            {/* Foreground filling line */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight, borderLeft: "2px solid #4E54C8" }} 
            />
          </div>

          {/* === STEP 1 === */}
          {/* Desktop */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -40% 0px" }}
            className="hidden md:grid grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Number -> Dot -> Dashes */}
            <div className="flex justify-end items-center pr-4">
              <motion.div variants={numberVariants}>
                <Image src="/sources/launch-roadmap/01.svg" alt="01" width={45} height={45} className="h-auto" />
              </motion.div>
              <motion.div variants={dotVariants} className="ml-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[109px] h-[14px]" />
              </motion.div>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-14 h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                  <Image src="/sources/launch-roadmap/roadmap-waitlist-launch.svg" alt="Waitlist Launch" width={28} height={28} />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <div className="flex flex-col items-start justify-center text-left pl-12">
              <motion.h3 variants={rightTextVariants} className="font-adlam text-[22px] text-[#222222] mb-1">Waitlist Launch</motion.h3>
              <motion.p variants={descVariants} className="text-[16px] text-gray m-0">Collecting interest and feedback from our early community.</motion.p>
            </div>
          </motion.div>
          {/* Mobile */}
          {renderMobileStep("1", "Waitlist Launch", "Collecting interest and feedback from our early community.", "/sources/launch-roadmap/roadmap-waitlist-launch.svg", ({ children }: { children: React.ReactNode }) => <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>{children}</motion.div>)}


          {/* === STEP 2 === */}
          {/* Desktop */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -40% 0px" }}
            className="hidden md:grid grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Text */}
            <div className="flex flex-col items-end justify-center text-right pr-12">
              <motion.h3 variants={leftTextVariants} className="font-adlam text-[22px] text-[#222222] mb-1">Closed Alpha</motion.h3>
              <motion.p variants={descVariants} className="text-[16px] text-gray m-0">First voice profiles generated for a small testing group.</motion.p>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-14 h-14 bg-light rounded-full flex items-center justify-center relative">
                <motion.div 
                  className="absolute inset-0 border-2 border-primary rounded-full"
                  animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <Image src="/sources/launch-roadmap/roadmap-closed-alpha.svg" alt="Closed Alpha" width={28} height={28} className="relative z-10" />
              </div>
            </motion.div>
            
            {/* Right: Dashes -> Dot -> Number */}
            <div className="flex justify-start items-center pl-4">
              <motion.div variants={dotVariants} className="mr-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[109px] h-[14px] scale-x-[-1]" />
              </motion.div>
              <motion.div variants={numberVariants}>
                <Image src="/sources/launch-roadmap/02.svg" alt="02" width={45} height={45} className="h-auto" />
              </motion.div>
            </div>
          </motion.div>
          {/* Mobile */}
          {renderMobileStep("2", "Closed Alpha", "First voice profiles generated for a small testing group.", "/sources/launch-roadmap/roadmap-closed-alpha.svg", ({ children }: { children: React.ReactNode }) => <>{children}</>, true)}


          {/* === STEP 3 === */}
          {/* Desktop */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -40% 0px" }}
            className="hidden md:grid grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Number -> Dot -> Dashes */}
            <div className="flex justify-end items-center pr-4">
              <motion.div variants={numberVariants}>
                <Image src="/sources/launch-roadmap/03.svg" alt="03" width={45} height={45} className="h-auto" />
              </motion.div>
              <motion.div variants={dotVariants} className="ml-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[109px] h-[14px]" />
              </motion.div>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-14 h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Image src="/sources/launch-roadmap/roadmap-beta-release.svg" alt="Beta Release" width={28} height={28} />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <div className="flex flex-col items-start justify-center text-left pl-12">
              <motion.h3 variants={rightTextVariants} className="font-adlam text-[22px] text-[#222222] mb-1">Beta Release</motion.h3>
              <motion.p variants={descVariants} className="text-[16px] text-gray m-0">Waitlist members get invited to create their profiles.</motion.p>
            </div>
          </motion.div>
          {/* Mobile */}
          {renderMobileStep("3", "Beta Release", "Waitlist members get invited to create their profiles.", "/sources/launch-roadmap/roadmap-beta-release.svg", ({ children }: { children: React.ReactNode }) => <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div>)}


          {/* === STEP 4 === */}
          {/* Desktop */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "10000px 0px -40% 0px" }}
            className="hidden md:grid grid-cols-[1fr_80px_1fr] items-center w-full relative z-10"
          >
            {/* Left: Text */}
            <div className="flex flex-col items-end justify-center text-right pr-12">
              <motion.h3 variants={leftTextVariants} className="font-adlam text-[22px] text-[#222222] mb-1">Public Launch</motion.h3>
              <motion.p variants={descVariants} className="text-[16px] text-gray m-0">
                <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={55} height={14} className="h-[12px] w-[30px] inline-block align-baseline" />{" "}
                becomes available on App Store and Play Store.
              </motion.p>
            </div>
            
            {/* Center: Icon */}
            <motion.div variants={circleVariants} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(78,84,200,0.1)] border-2 border-[#F6F6FE]">
              <div className="w-14 h-14 bg-light text-primary rounded-full flex items-center justify-center relative">
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Image src="/sources/launch-roadmap/roadmap-public-launch.svg" alt="Public Launch" width={28} height={28} />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Dashes -> Dot -> Number */}
            <div className="flex justify-start items-center pl-4">
              <motion.div variants={dotVariants} className="mr-4 flex items-center">
                <Image src="/sources/launch-roadmap/roadmap-gold-dots-next-to-number.svg" alt="dot and dashed line" width={109} height={14} className="w-[109px] h-[14px] scale-x-[-1]" />
              </motion.div>
              <motion.div variants={numberVariants}>
                <Image src="/sources/launch-roadmap/04.svg" alt="04" width={45} height={45} className="h-auto" />
              </motion.div>
            </div>
          </motion.div>
          {/* Mobile */}
          {renderMobileStep("4", "Public Launch", <>
            <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={55} height={14} className="h-[12px] w-[30px] inline-block align-baseline" />{" "}
            becomes available on App Store and Play Store.
          </>, "/sources/launch-roadmap/roadmap-public-launch.svg", ({ children }: { children: React.ReactNode }) => <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div>)}

        </div>
      </div>
    </section>
  );
}
