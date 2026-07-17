"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background relative flex flex-col items-center pt-8 pb-10 overflow-hidden px-4">
      {/* Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[1440px] bg-light rounded-4xl relative overflow-hidden flex flex-col px-4 md:px-10 lg:px-20 mx-auto pb-24 min-h-[750px]"
      >
        <Navbar showReturnHome={true} />

        <div className="flex flex-col items-center justify-center flex-1 text-center mt-20 mb-16 z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-adlam text-[100px] lg:text-[150px] leading-none mb-4 opacity-20 block select-none">
              404
            </span>
            <h1 className="font-adlam text-[40px] lg:text-[55px] leading-[1.1] text-[#222222] tracking-[-0.04em] mb-6 max-w-[600px]">
              Looks like this page wandered off.
            </h1>
            <p className="text-[20px] text-gray max-w-[500px] leading-[30px] mb-10">
              Even Robert can&apos;t find it. Let&apos;s get you back to familiar territory and preserve the voices that matter.
            </p>
            
            <Link href="/">
              <button className="bg-primary text-white font-medium text-[18px] px-8 py-[16px] rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-3 group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Return to Homepage
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-[20%] left-[10%] w-[150px] h-[150px] bg-accent/10 rounded-full filter blur-[20px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full border-[1px] border-dashed border-[#C9C9C9] opacity-40"></div>
        <div className="absolute bottom-[-50px] left-[30%] w-[400px] h-[400px] bg-[#4E54C8]/5 rounded-full filter blur-[30px]"></div>
      </motion.div>

      <Footer />
    </main>
  );
}
