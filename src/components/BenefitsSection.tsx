"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import ConstellationGrid from "@/components/ConstellationGrid";

export default function BenefitsSection() {
  const [isWireframe, setIsWireframe] = useState(false);

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
      <ConstellationGrid rgbColor="78, 84, 200" />
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
                  <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {/* Lock Body */}
                    <rect x="22" y="32" width="29" height="23" rx="4" fill="#4E54C8" />
                    {/* Keyhole */}
                    <circle cx="36.5" cy="41" r="3" fill="white" />
                    <path d="M35 43h3l-1 6h-1l-1-6z" fill="white" />
                    {/* Shackle that lifts and rotates on hover */}
                    <path className="origin-[36.5px_32px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:-rotate-[15deg]" d="M27 32V24C27 18.4772 31.4772 14 37 14C42.5228 14 47 18.4772 47 24V32" stroke="#D4A95F" strokeWidth="5" strokeLinecap="round" />
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
                  <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm group-hover:scale-105 transition-transform duration-300" style={{ transform: "rotate(-5deg)", transformOrigin: "center" }}>
                    {/* Solid Ticket Base */}
                    <rect x="12" y="16" width="49" height="41" rx="6" fill="#F7F8FC" stroke="#D4A95F" strokeWidth="1.5" />
                    {/* Dashed inner border */}
                    <rect x="16" y="20" width="41" height="33" rx="3" stroke="#D4A95F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                    
                    {/* Ticket cutouts on the sides */}
                    <circle cx="12" cy="36.5" r="6" fill="white" stroke="#D4A95F" strokeWidth="1.5" />
                    <circle cx="61" cy="36.5" r="6" fill="white" stroke="#D4A95F" strokeWidth="1.5" />
                    
                    {/* Mask out the cutout borders that overlap the ticket inside */}
                    <rect x="6" y="30" width="6" height="13" fill="white" />
                    <rect x="61" y="30" width="6" height="13" fill="white" />

                    {/* A star for Tier One */}
                    <path d="M36.5 24L38 29L43 30.5L38 32L36.5 37L35 32L30 30.5L35 29L36.5 24Z" fill="#D4A95F" />
                    
                    {/* Fake text / price lines */}
                    <rect x="25" y="40" width="23" height="3" rx="1.5" fill="#4E54C8" opacity="0.6" />
                    <rect x="29" y="46" width="15" height="3" rx="1.5" fill="#4E54C8" opacity="0.3" />
                  </svg>
                </motion.div>
              </motion.div>

              <motion.div variants={textFadeVariants} className="flex flex-col items-center z-10 px-2">
                <h3 className="font-adlam text-[18px] lg:text-[20px] text-[#222222] mb-2 min-h-[52px] flex items-center justify-center text-center w-full">
                  Founding Member Price
                </h3>
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
                  <div className="relative w-[73px] h-[73px] flex items-center justify-center cursor-pointer" onClick={() => setIsWireframe(!isWireframe)}>
                    {/* The UI Container */}
                    <div className={`relative w-[60px] h-[70px] rounded-[10px] overflow-hidden transition-all duration-500 shadow-sm ${isWireframe ? "bg-white border-2 border-gray/30 border-dashed" : "bg-gradient-to-br from-[#4E54C8] to-[#3a3f9e]"}`}>
                      
                      {/* UI Elements */}
                      <div className={`absolute top-2 left-2 w-4 h-4 rounded-full transition-all duration-500 ${isWireframe ? "border border-gray/40 border-dashed" : "bg-white/20"}`} />
                      <div className={`absolute top-2.5 right-2 w-6 h-1.5 rounded-full transition-all duration-500 ${isWireframe ? "border border-gray/40 border-dashed" : "bg-white/20"}`} />
                      <div className={`absolute top-8 left-2 right-2 h-[22px] rounded-[6px] transition-all duration-500 ${isWireframe ? "border-2 border-gray/40 border-dashed" : "bg-white/90 shadow-sm"}`} />
                      <div className={`absolute bottom-2 inset-x-2 h-4 rounded-[4px] transition-all duration-500 ${isWireframe ? "border border-gray/40 border-dashed" : "bg-[#D4A95F]"}`} />

                    </div>
                    {/* Floating Toggle Switch */}
                    <div className="absolute -bottom-2 w-[34px] h-[18px] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray/10 flex items-center px-[3px] transition-colors" onClick={(e) => { e.stopPropagation(); setIsWireframe(!isWireframe); }}>
                      <motion.div 
                        animate={{ x: isWireframe ? 0 : 16 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`w-3 h-3 rounded-full ${isWireframe ? "bg-gray/40" : "bg-primary"}`}
                      />
                    </div>
                  </div>
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
