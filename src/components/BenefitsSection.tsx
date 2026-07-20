"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const floatingDots = [
  { left: "10%", size: 4, duration: 25, delay: 0, color: "#4E54C8" },
  { left: "25%", size: 6, duration: 32, delay: 5, color: "#D4A95F" },
  { left: "40%", size: 3, duration: 20, delay: 2, color: "#4E54C8" },
  { left: "55%", size: 5, duration: 28, delay: 12, color: "#D4A95F" },
  { left: "70%", size: 4, duration: 22, delay: 7, color: "#4E54C8" },
  { left: "85%", size: 7, duration: 35, delay: 1, color: "#D4A95F" },
  { left: "95%", size: 3, duration: 18, delay: 8, color: "#4E54C8" },
];

export default function BenefitsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const leftCardVariants: Variants = {
    hidden: { opacity: 0, x: -200, y: -200, scale: 0.8 },
    show: { 
      opacity: 1, x: 0, y: 0, scale: 1, 
      transition: { type: "spring", stiffness: 60, damping: 20 } 
    }
  };

  const centerCardVariants: Variants = {
    hidden: { opacity: 0, y: -200, scale: 0.8 },
    show: { 
      opacity: 1, y: 0, scale: 1, 
      transition: { type: "spring", stiffness: 60, damping: 20 } 
    }
  };

  const rightCardVariants: Variants = {
    hidden: { opacity: 0, x: 200, y: -200, scale: 0.8 },
    show: { 
      opacity: 1, x: 0, y: 0, scale: 1, 
      transition: { type: "spring", stiffness: 60, damping: 20 } 
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0.5, rotate: -15, opacity: 0 },
    show: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.3 } 
    }
  };

  const textFadeVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.5 } 
    }
  };

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const headline = "The Rewards of Being Early.";
  const words = headline.split(" ");

  return (
    <section id="early-access" className="w-full bg-white py-14 lg:py-20 px-4 relative overflow-hidden scroll-mt-4">
      {/* Floating Memory Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              boxShadow: `0 0 10px ${dot.color}`,
            }}
            animate={{
              top: ["110%", "-10%"],
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "linear",
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-[1440px] flex flex-col items-center mx-auto text-center relative z-10">
        
        <motion.div 
          className="flex flex-col items-center w-full"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
        >
          <motion.div variants={fadeUpVariants} className="flex items-center gap-2 mb-4">
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-primary"
              style={{ boxShadow: "0 0 10px rgba(78,84,200,0.6)" }}
            />
            <span className="text-primary font-medium tracking-[0.09em] uppercase text-[14px]">Founding Members</span>
          </motion.div>

          <h2 className="font-adlam text-[45px] lg:text-[55px] text-[#222222] tracking-[-0.04em] mb-4 flex flex-wrap justify-center gap-x-3">
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p variants={fadeUpVariants} className="text-[18px] lg:text-[20px] text-gray max-w-[600px] mb-20">
            Join the waitlist to secure your place as a Founding Member.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-[1100px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
        >
          {/* Benefit 1 */}
          <motion.div variants={leftCardVariants}>
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0px 25px 60px rgba(212,169,95,0.15)" }}
              className="bg-white rounded-full aspect-square flex flex-col items-center justify-center p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5 relative group h-full"
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-[2px] border-[#D4A95F]/20 pointer-events-none"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div variants={iconVariants} className="mb-6 z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }}
                >
                  <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                    {/* Bottom pill */}
                    <rect x="16" y="48" width="41" height="12" rx="6" fill="#4E54C8" opacity="0.3" />
                    {/* Middle pill */}
                    <rect x="16" y="32" width="41" height="12" rx="6" fill="#4E54C8" opacity="0.6" />
                    {/* Top pill lifting out */}
                    <rect x="22" y="14" width="41" height="12" rx="6" fill="#D4A95F" style={{ transform: "rotate(-8deg)", transformOrigin: "22px 14px" }} />
                  </svg>
                </motion.div>
              </motion.div>
              
              <motion.div variants={textFadeVariants} className="flex flex-col items-center z-10 px-2">
                <h3 className="font-adlam text-[18px] lg:text-[20px] text-[#222222] mb-2 min-h-[52px] flex items-center text-center">Priority Access</h3>
                <p className="text-[13.5px] lg:text-[14.5px] text-gray leading-[22px] text-center">
                  Skip the line. Founding members get first access to generate voice profiles when we launch.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Benefit 2 - Hero */}
          <motion.div variants={centerCardVariants}>
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0px 25px 60px rgba(212,169,95,0.15)" }}
              className="bg-white rounded-full aspect-square flex flex-col items-center justify-center p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5 relative group h-full"
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-[2px] border-[#D4A95F]/20 pointer-events-none"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div variants={iconVariants} className="mb-6 z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }}
                >
                  <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm" style={{ transform: "rotate(-10deg)", transformOrigin: "center" }}>
                    {/* Gold Tag Pill */}
                    <rect x="10" y="20" width="53" height="33" rx="16.5" fill="#D4A95F" />
                    <circle cx="22" cy="36.5" r="5" fill="white" />
                    {/* Lock */}
                    <path d="M41 33V30C41 27.2386 43.2386 25 46 25C48.7614 25 51 27.2386 51 30V33" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    <rect x="39" y="33" width="14" height="11" rx="2.5" fill="white" />
                  </svg>
                </motion.div>
              </motion.div>

              <motion.div variants={textFadeVariants} className="flex flex-col items-center z-10 px-2">
                <h3 className="font-adlam text-[18px] lg:text-[20px] text-[#222222] mb-2 min-h-[52px] flex items-center text-center">Founding Member Price</h3>
                <p className="text-[13.5px] lg:text-[14.5px] text-gray leading-[22px] text-center">
                  Lock in a lifetime discount on{" "}
                  <Image src="/sources/Hero/logo-text-inline.svg" alt="Luqas" width={41} height={11} className="h-[10px] w-[37px] lg:h-[11px] lg:w-[41px] inline-block align-middle -translate-y-[1px]" />{" "}
                  Premium. Our way of saying thank you for believing early.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Benefit 3 */}
          <motion.div variants={rightCardVariants}>
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0px 25px 60px rgba(212,169,95,0.15)" }}
              className="bg-white rounded-full aspect-square flex flex-col items-center justify-center p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5 relative group h-full"
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-[2px] border-[#D4A95F]/20 pointer-events-none"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div variants={iconVariants} className="mb-6 z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1, transition: { duration: 0.5 } }}
                >
                  <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                    {/* Central Sphere */}
                    <circle cx="36.5" cy="36.5" r="15" fill="#4E54C8" />
                    {/* Left Hand Cupping */}
                    <path d="M 23 18 C 9 26 9 47 23 55" stroke="#D4A95F" strokeWidth="6" strokeLinecap="round" />
                    {/* Right Hand Cupping */}
                    <path d="M 50 18 C 64 26 64 47 50 55" stroke="#D4A95F" strokeWidth="6" strokeLinecap="round" />
                    {/* Subtle molding sparkles */}
                    <circle cx="36.5" cy="10" r="2.5" fill="#4E54C8" opacity="0.5"/>
                    <circle cx="36.5" cy="63" r="2.5" fill="#4E54C8" opacity="0.5"/>
                  </svg>
                </motion.div>
              </motion.div>

              <motion.div variants={textFadeVariants} className="flex flex-col items-center z-10 px-2">
                <h3 className="font-adlam text-[18px] lg:text-[20px] text-[#222222] mb-2 min-h-[52px] flex items-center text-center">Shape the Product</h3>
                <p className="text-[13.5px] lg:text-[14.5px] text-gray leading-[22px] text-center">
                  Get direct access to our beta testing group and influence the features we build next.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
