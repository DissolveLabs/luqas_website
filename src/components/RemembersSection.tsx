"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TIMELINE = [
  { when: "First call · March", what: "“I just started a new job and I'm nervous about it.”" },
  { when: "Two weeks later", what: "“How did the first week go? You were worried about the team.”" },
  { when: "This morning", what: "“Proud of you for sticking with it. Tell me about the project.”", gold: true },
];

const FEATURES = [
  {
    title: "People and names",
    body: "Your sister's move, your manager's name, the dog. It keeps track of your world.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Open threads",
    body: "The interview you were dreading, the trip you were planning. It asks how they went.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49" />
      </svg>
    ),
  },
  {
    title: "Yours alone",
    body: "Your conversations belong to you. Private by design, never used to train anything, deletable any time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

// "It Remembers, So You Never Start Over." — new Memory section per Figma.
export default function RemembersSection() {
  return (
    <section id="memory" className="w-full bg-white py-24 lg:py-32 px-4 relative overflow-hidden scroll-mt-4">
      <div className="w-full max-w-[1250px] mx-auto flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          className="text-primary font-semibold tracking-[0.18em] uppercase text-[13px] mb-4"
        >
          Memory
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          transition={{ delay: 0.1 }}
          className="font-adlam text-[42px] lg:text-[55px] leading-[1.15] text-[#222222] tracking-[-0.04em] mb-6 text-center max-w-[720px]"
        >
          It Remembers, So You Never Start Over.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
          transition={{ delay: 0.2 }}
          className="text-[17px] lg:text-[19px] leading-[30px] text-[#222222] text-center max-w-[760px] mb-16"
        >
          Most voice tools forget you the moment you hang up.{" "}
          <Image src="/sources/Hero/logo-text.svg" alt="Luqas" width={80} height={20} className="h-[15px] w-[37px] inline-block align-baseline" />{" "}
          keeps the thread of your life, so every call feels like continuing, never like introducing yourself again.
        </motion.p>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: timeline card */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Decorative circles bottom-left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-46px] left-[-46px] w-[150px] h-[150px] bg-primary rounded-full pointer-events-none"
            />
            <span className="absolute bottom-[70px] left-[-58px] w-[46px] h-[46px] bg-accent rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 bg-white rounded-[28px] shadow-[0_30px_70px_rgba(78,84,200,0.12)] border border-gray/5 p-7 lg:p-9 w-full max-w-[500px]"
            >
              <div className="flex items-center justify-between pb-5 border-b border-gray/10 mb-7">
                <span className="font-semibold text-[19px] text-[#222222]">One thread, three calls</span>
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent bg-[#FBF3E1] px-3 py-1.5 rounded-full">Remembered</span>
              </div>

              <div className="flex flex-col">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.when}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    className="relative grid grid-cols-[auto_1fr] gap-4 pb-7 last:pb-0"
                  >
                    {i < TIMELINE.length - 1 && (
                      <span className="absolute left-[8px] top-[22px] bottom-[-2px] w-[2px] bg-gradient-to-b from-primary to-primary/10" />
                    )}
                    <span className={`relative z-10 w-[18px] h-[18px] rounded-full bg-white border-4 mt-1 ${item.gold ? "border-accent" : "border-primary"}`} />
                    <div className="bg-[#EFEFFC] rounded-2xl px-5 py-4 text-left">
                      <div className="text-[12px] font-bold text-gray tracking-[0.08em] uppercase">{item.when}</div>
                      <div className="text-[15px] text-[#3d3a44] font-medium mt-1 leading-[1.5]">{item.what}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: feature rows */}
          <div className="flex flex-col">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "10000px 0px -20% 0px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`flex items-start gap-6 py-8 ${i > 0 ? "border-t border-gray/10" : ""}`}
              >
                <span className="flex-shrink-0 w-[70px] h-[70px] rounded-full bg-[#FBF3E1] text-accent flex items-center justify-center">
                  {f.icon}
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-[22px] text-[#222222] mb-2">{f.title}</h3>
                  <p className="text-[16px] text-[#4b4950] leading-[1.65] m-0">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
