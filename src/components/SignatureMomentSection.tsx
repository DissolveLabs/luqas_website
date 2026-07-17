"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PhoneCallDemo from "@/components/PhoneCallDemo";

const CARDS = [
  {
    title: "Real conversation, real time",
    body: "You talk, it listens, it answers in their voice. It even leaves room for the quiet parts.",
    highlight: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle cx="8.5" cy="11.5" r="0.5" fill="currentColor" />
        <circle cx="12" cy="11.5" r="0.5" fill="currentColor" />
        <circle cx="15.5" cy="11.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "The rhythm of a call",
    body: "Answers arrive at conversational speed, so nothing stalls and nothing feels typed.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" />
      </svg>
    ),
  },
  {
    title: "It walks in knowing you",
    body: "Every call carries the memory of the last one: the names, the moments, the things you shared.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V10l2-2V5h2v2h3V5h2v2h3V5h2v3l2 2v11" />
        <path d="M4 21h16" />
        <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
      </svg>
    ),
  },
];

export default function SignatureMomentSection() {
  return (
    <section id="the-call" className="w-full bg-dark relative overflow-hidden py-24 lg:py-28 px-4 scroll-mt-0">
      {/* Decorative circles */}
      <div className="absolute bottom-[-60px] right-[60px] w-[150px] h-[150px] bg-primary rounded-full opacity-90 pointer-events-none" />
      <div className="absolute top-[140px] right-[26%] w-[24px] h-[24px] bg-primary/70 rounded-full pointer-events-none hidden lg:block" />

      <div className="w-full max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center relative z-10">
        {/* Left: copy + cards */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
            className="block text-accent font-semibold tracking-[0.18em] uppercase text-[13px] mb-4"
          >
            The Signature Moment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
            transition={{ delay: 0.1 }}
            className="font-adlam text-[42px] lg:text-[55px] leading-[1.15] text-white tracking-[-0.03em] mb-10 max-w-[480px]"
          >
            Not A Chatbot. A Phone Call.
          </motion.h2>

          <div className="flex flex-col gap-5">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className={`flex items-center gap-6 rounded-[24px] p-6 lg:p-7 bg-[#282A5A] ${card.highlight ? "border border-accent" : "border border-white/5"}`}
              >
                <span className="flex-shrink-0 w-[64px] h-[64px] rounded-full bg-white/10 text-accent flex items-center justify-center">
                  {card.icon}
                </span>
                <div className="text-left">
                  <h3 className="text-white font-semibold text-[20px] lg:text-[22px] mb-2">{card.title}</h3>
                  <p className="text-white/70 text-[15.5px] leading-[1.6] m-0">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: interactive phone call demo */}
        <div className="relative flex items-center justify-center lg:justify-end lg:pr-10">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/20 rounded-full blur-[110px] pointer-events-none" />
          {/* Dashed orbit + dots */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[#8B90DE]/40 pointer-events-none hidden md:block" />
          <span className="absolute top-[24%] left-[6%] w-4 h-4 bg-primary/80 rounded-full hidden md:block" />
          <span className="absolute bottom-[24%] left-[16%] w-4 h-4 bg-accent rounded-full hidden md:block" />

          {/* Floating badges */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[52%] left-[2%] w-[56px] h-[56px] bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] items-center justify-center hidden md:flex"
          >
            <span className="flex items-end gap-[3px]" aria-hidden="true">
              {[8, 14, 20, 12, 6].map((h, idx) => (
                <span key={idx} className="w-[3px] rounded-full bg-primary" style={{ height: `${h}px` }} />
              ))}
            </span>
          </motion.div>
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[16%] right-[-2%] w-[56px] h-[56px] bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] items-center justify-center hidden md:flex"
          >
            <Image src="/sources/Hero/logo.svg" alt="" width={30} height={30} aria-hidden="true" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <PhoneCallDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
