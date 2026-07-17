"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";

// Dialogue lines from the Claude Design blueprint (call captions).
const CAPTIONS = [
  "“Hi sweetheart… it's so good to hear your voice.”",
  "“Tell me about your day, the whole thing.”",
  "“I remember you were nervous about that.”",
  "“You've got more of your mother in you than you think.”",
  "“I'm proud of you. I always was.”",
];

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// In-call waveform ported from the Claude Design blueprint (drawCall),
// recolored to the Figma indigo.
function CallWaveform({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useAnimationFrame((time) => {
    const c = canvasRef.current;
    if (!c) return;
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (!w || !h) return;
    const d = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
    if (c.width !== Math.round(w * d)) {
      c.width = Math.round(w * d);
      c.height = Math.round(h * d);
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const t = time / 1000;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const n = 34;
    const cy = h / 2;
    for (let i = 0; i < n; i++) {
      const x = ((i + 0.5) / n) * w;
      const env = Math.pow(Math.sin((i / n) * Math.PI), 0.6);
      let amp: number;
      if (activeRef.current) {
        const wave = Math.sin(t * 4 + i * 0.5) * 0.5 + 0.5;
        amp = (wave * 0.7 + 0.12) * env * (h * 0.46);
      } else {
        amp = 1.4;
      }
      amp = Math.max(1.4, amp);
      ctx.fillStyle = "#4E54C8";
      ctx.globalAlpha = 0.45 + env * 0.55;
      const bw = Math.max(2.4, (w / n) * 0.42);
      rr(ctx, x - bw / 2, cy - amp, bw, amp * 2, bw / 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });

  return <canvas ref={canvasRef} className="w-[210px] h-[52px]" aria-hidden="true" />;
}

// iOS-style status bar pinned to the top corners of the phone screen.
function StatusBar() {
  return (
    <>
      <span className="absolute top-4 left-7 text-[#222222] text-[13px] font-semibold">9:41</span>
      <span className="absolute top-4 right-6 flex items-center gap-1.5 text-[#222222]">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.8" /><rect x="4.3" y="5" width="3" height="6" rx="0.8" /><rect x="8.6" y="2.5" width="3" height="8.5" rx="0.8" /><rect x="12.9" y="0" width="3" height="11" rx="0.8" /></svg>
        <svg width="15" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
        <svg width="22" height="11" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="18" height="8" rx="1.8" fill="currentColor" /><path d="M23.5 4v4a2.2 2.2 0 0 0 0-4z" fill="currentColor" opacity="0.4" /></svg>
      </span>
    </>
  );
}

// Interactive phone-call demo ported from the Claude Design blueprint:
// idle "incoming call" screen -> answer -> live call with timer, pulse rings,
// waveform, rotating dialogue captions and speaker/end controls.
export default function PhoneCallDemo() {
  const [calling, setCalling] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [captionIdx, setCaptionIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const captionRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (captionRef.current) clearInterval(captionRef.current);
  };

  const startCall = () => {
    setCalling(true);
    setSpeakerOn(true);
    setSeconds(0);
    setCaptionIdx(0);
    clearTimers();
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    // Caption cadence from the Claude Design blueprint (3.4s per line).
    captionRef.current = setInterval(() => setCaptionIdx((i) => (i + 1) % CAPTIONS.length), 3400);
  };

  const endCall = () => {
    setCalling(false);
    clearTimers();
  };

  useEffect(() => clearTimers, []);

  const timer = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const caption = speakerOn ? CAPTIONS[captionIdx] : "Speaker is off";

  return (
    <div className="relative w-[320px] h-[660px] rounded-[52px] bg-[#1C1C1E] p-[12px] shadow-[0_40px_90px_rgba(12,11,40,0.55)] border border-white/10">
      {/* Dynamic island */}
      <div className="absolute top-[24px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20" />

      <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-white">
        {/* Idle screen */}
        <motion.div
          initial={false}
          animate={calling ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ pointerEvents: calling ? "none" : "auto" }}
        >
          <StatusBar />
          {/* App name just below the notch */}
          <div className="absolute top-[62px] inset-x-0 text-center font-adlam text-[17px] tracking-[0.06em] text-primary">LUQAS</div>

          <div className="absolute top-[24%] inset-x-0 flex flex-col items-center gap-4 text-center">
            <Image src="/sources/dad-avatar.jpg" alt="Dad" width={112} height={112} className="w-[112px] h-[112px] rounded-full object-cover border-[3px] border-primary/20" />
            <div>
              <div className="font-adlam text-[27px] text-[#222222]">Dad ❤️</div>
              <div className="text-gray text-[14px] font-medium mt-1">incoming call…</div>
            </div>
          </div>

          <div className="absolute bottom-[12%] inset-x-0 flex flex-col items-center">
            <motion.button
              onClick={startCall}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 12px 30px rgba(212,169,95,0.5), 0 0 0 0 rgba(212,169,95,0.4)", "0 12px 30px rgba(212,169,95,0.5), 0 0 0 14px rgba(212,169,95,0)"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="w-[74px] h-[74px] rounded-full bg-accent text-white flex items-center justify-center"
              aria-label="Answer call"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </motion.button>
            <div className="text-gray text-[12.5px] font-semibold tracking-[0.12em] uppercase mt-6 mb-2">Tap to answer</div>
          </div>
        </motion.div>

        {/* In-call screen — zones per the iOS layout spec */}
        <motion.div
          initial={false}
          animate={calling ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ pointerEvents: calling ? "auto" : "none" }}
        >
          <StatusBar />

          {/* Content stack: fills from just below the notch to ~16px above the
              bottom edge. Header sits at top, avatar/waveform/text share the
              flexible middle with even gaps, controls pinned near the bottom. */}
          <div className="absolute inset-x-0 top-[52px] bottom-[16px] flex flex-col items-center px-6">
            {/* Caller name (LUQAS) + call duration */}
            <div className="flex flex-col items-center gap-1">
              <div className="font-adlam text-[17px] tracking-[0.06em] text-primary">LUQAS</div>
              <div className="font-adlam text-[24px] text-[#222222] mt-1">Dad ❤️</div>
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray">
                <span className="w-2 h-2 rounded-full bg-[#4CAF7D]" /> Live
              </div>
              <div className="text-gray text-[14px] font-semibold tabular-nums">{timer}</div>
            </div>

            {/* Middle: avatar, waveform, transcript — evenly spaced */}
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-5">
              <div className="relative flex items-center justify-center">
                {calling &&
                  [0, 0.93, 1.86].map((delay) => (
                    <motion.span
                      key={delay}
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay }}
                      className="absolute w-[120px] h-[120px] rounded-full border-2 border-accent/60"
                    />
                  ))}
                <Image src="/sources/dad-avatar.jpg" alt="Dad" width={120} height={120} className="relative z-10 w-[120px] h-[120px] rounded-full object-cover border-[4px] border-primary/15" />
              </div>

              <CallWaveform active={calling && speakerOn} />

              {/* Dialogue captions (from the Claude Design blueprint) */}
              <div className="min-h-[44px] max-w-[240px] flex items-start justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={speakerOn ? captionIdx : "off"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-[#3d3a44] text-[14px] font-medium text-center leading-[1.45] m-0"
                  >
                    {caption}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* 20px gap, then controls pinned near the bottom */}
            <div className="mt-5 flex items-center justify-center gap-[44px] -translate-y-[25px]">
            <button
              onClick={() => setSpeakerOn(false)}
              className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-colors ${!speakerOn ? "bg-primary text-white" : "bg-[#EFEFFC] text-primary hover:bg-[#E2E2F8]"}`}
              aria-label="Speaker off"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
            </button>
            <motion.button
              onClick={endCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="w-[68px] h-[68px] rounded-full bg-[#E05252] text-white flex items-center justify-center shadow-[0_10px_26px_rgba(224,82,82,0.45)]"
              aria-label="End call"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-1.78 2.66a.98.98 0 0 1-.7.28c-.28 0-.53-.11-.71-.28a11.6 11.6 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" /></svg>
            </motion.button>
            <button
              onClick={() => setSpeakerOn(true)}
              className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-colors ${speakerOn ? "bg-primary text-white" : "bg-[#EFEFFC] text-primary hover:bg-[#E2E2F8]"}`}
              aria-label="Speaker on"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
            </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
