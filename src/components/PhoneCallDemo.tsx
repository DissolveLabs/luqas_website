"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame } from "framer-motion";

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
  const [timeStr, setTimeStr] = useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      setTimeStr(`${h > 12 ? h - 12 : (h === 0 ? 12 : h)}:${m.toString().padStart(2, "0")}`);
    };
    updateTime();
    const intv = setInterval(updateTime, 60000);
    return () => clearInterval(intv);
  }, []);

  return (
    <>
      <span className="absolute top-4 left-7 text-[#222222] text-[13px] font-semibold">{timeStr}</span>
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
  const [callState, setCallState] = useState<"profile" | "ringing" | "active">("profile");
  const [speakerOn, setSpeakerOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [captionIdx, setCaptionIdx] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const captionRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (captionRef.current) clearInterval(captionRef.current);
    if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
  };

  const startCall = () => {
    setCallState("ringing");
    clearTimers();

    // Auto-answer after 2.5 seconds of "ringing"
    ringTimeoutRef.current = setTimeout(() => {
      setCallState((current) => {
        if (current === "ringing") {
          startActiveCall();
          return "active";
        }
        return current;
      });
    }, 2500);
  };

  const startActiveCall = () => {
    setSpeakerOn(true);
    setMicOn(true);
    setSeconds(0);
    setCaptionIdx(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    captionRef.current = setInterval(() => setCaptionIdx((i) => (i + 1) % CAPTIONS.length), 3400);
  };

  const endCall = () => {
    setCallState("profile");
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

        {/* Profile screen */}
        <motion.div
          initial={false}
          animate={callState === "profile" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-white"
          style={{ pointerEvents: callState === "profile" ? "auto" : "none" }}
        >
          <StatusBar />
          {/* Top nav */}
          <div className="absolute top-[54px] inset-x-0 px-6 flex items-center justify-between">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray/5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <Image src="/sources/Hero/logo-text-indigo.svg" alt="Luqas" width={90} height={24} className="h-[20px] w-auto" />
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray/5 text-[#222]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
            </button>
          </div>

          <div className="absolute top-[84px] inset-x-0 px-6 flex flex-col items-center">
            <Image src="/sources/dad-avatar.jpg" alt="Dad" width={80} height={80} className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-[#E2E2F8] shadow-sm mb-2" />
            <h2 className="font-adlam text-[22px] text-[#222222] leading-tight">Dad</h2>
            <p className="text-[12px] text-primary font-medium mt-0.5 mb-3">Father</p>

            <div className="w-full bg-[#F7F8FC] rounded-[16px] p-3 flex items-center gap-3 mb-3 border border-primary/5">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                <span className="text-[15px]">❤️</span>
              </div>
              <p className="text-[12px] text-[#444] leading-[1.3] text-left">
                A kind and wise man. He loves poetry, old songs and calm mornings
              </p>
            </div>

            <div className="w-full flex justify-between px-2 mb-3">
              <div className="flex flex-col items-center flex-1">
                <div className="text-[15px] text-[#222222] font-semibold">12</div>
                <div className="text-[10px] text-gray mt-1">Conversations</div>
              </div>
              <div className="w-[1px] bg-gray/20" />
              <div className="flex flex-col items-center flex-1">
                <div className="text-[15px] text-[#222222] font-semibold">5h 42m</div>
                <div className="text-[10px] text-gray mt-1">Total talk time</div>
              </div>
              <div className="w-[1px] bg-gray/20" />
              <div className="flex flex-col items-center flex-1">
                <div className="text-[15px] text-[#222222] font-semibold">8</div>
                <div className="text-[10px] text-gray mt-1">Memories</div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray/10 mb-3" />

            <div className="w-full flex flex-col items-start">
              <h3 className="font-adlam text-[16px] text-[#222222] mb-2">Quick Actions</h3>
              <button onClick={startCall} className="group w-full bg-gradient-to-br from-white to-[#F3F5FC] rounded-[16px] p-3 flex items-center gap-3 shadow-[0_4px_16px_rgba(78,84,200,0.12)] border border-primary/20 hover:border-primary/40 hover:shadow-[0_6px_24px_rgba(78,84,200,0.25)] hover:scale-[1.02] transition-all active:scale-[0.97] mb-3 text-left">
                <div className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4E54C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="text-[13.5px] text-[#222222] font-semibold">Start a call</div>
                  <div className="text-[11.5px] text-gray mt-0.5">Talk to Dad</div>
                </div>
              </button>

              <h3 className="font-adlam text-[16px] text-[#222222] mb-2">Voice Status</h3>
              <div className="w-full bg-white rounded-[16px] p-3 flex items-center gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 text-left">
                <div className="w-9 h-9 rounded-full bg-[#D4A95F] flex items-center justify-center shrink-0 text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 7v10"/><path d="M22 10v4"/><path d="M7 7v10"/><path d="M2 10v4"/></svg>
                </div>
                <div>
                  <div className="text-[13.5px] text-[#222222] font-semibold">Voice is ready</div>
                  <div className="text-[11.5px] text-gray mt-0.5">Recorded on 12 May 2024</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ringing screen */}
        <motion.div
          initial={false}
          animate={callState === "ringing" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-white"
          style={{ pointerEvents: callState === "ringing" ? "auto" : "none" }}
        >
          <StatusBar />
          <div className="absolute top-[54px] inset-x-0 flex justify-center">
            <Image src="/sources/Hero/logo-text-indigo.svg" alt="Luqas" width={90} height={24} className="h-[20px] w-auto" />
          </div>

          <div className="absolute top-[24%] inset-x-0 flex flex-col items-center gap-4 text-center">
            <Image src="/sources/dad-avatar.jpg" alt="Dad" width={112} height={112} className="w-[112px] h-[112px] rounded-full object-cover border-[3px] border-primary/20" />
            <div>
              <div className="font-adlam text-[27px] text-[#222222]">Dad</div>
              <div className="text-gray text-[14px] font-medium mt-1">ringing…</div>
            </div>
          </div>

          <div className="absolute bottom-[calc(12%+5px)] inset-x-0 flex flex-col items-center">
            <motion.button
              onClick={endCall}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="w-[74px] h-[74px] rounded-full bg-[#E05252] text-white flex items-center justify-center shadow-[0_10px_26px_rgba(224,82,82,0.45)]"
              aria-label="End call"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-1.78 2.66a.98.98 0 0 1-.7.28c-.28 0-.53-.11-.71-.28a11.6 11.6 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" /></svg>
            </motion.button>
          </div>
        </motion.div>

        {/* In-call screen */}
        <motion.div
          initial={false}
          animate={callState === "active" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-white"
          style={{ pointerEvents: callState === "active" ? "auto" : "none" }}
        >
          <StatusBar />

          <div className="absolute inset-x-0 top-[54px] bottom-[16px] flex flex-col items-center px-6">
            {/* Caller name + call duration */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex justify-center">
                <Image src="/sources/Hero/logo-text-indigo.svg" alt="Luqas" width={90} height={24} className="h-[20px] w-auto" />
              </div>
              <div className="font-adlam text-[24px] text-[#222222] mt-1">Dad</div>
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray">
                <span className="w-2 h-2 rounded-full bg-[#4CAF7D]" /> Live
              </div>
              <div className="text-gray text-[14px] font-semibold tabular-nums">{timer}</div>
            </div>

            {/* Middle: avatar, waveform, transcript */}
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-5">
              <div className="relative flex items-center justify-center">
                {callState === "active" &&
                  [0, 0.93, 1.86].map((delay) => (
                    <motion.span
                      key={delay}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.7, opacity: [0, 0.7, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay }}
                      className="absolute w-[120px] h-[120px] rounded-full border-2 border-accent/60"
                    />
                  ))}
                <Image src="/sources/dad-avatar.jpg" alt="Dad" width={120} height={120} className="relative z-10 w-[120px] h-[120px] rounded-full object-cover border-[4px] border-primary/15" />
              </div>

              <CallWaveform active={callState === "active" && speakerOn} />

              <div className="min-h-[44px] max-w-[240px] flex items-start justify-center">
                <p className="text-[#3d3a44] text-[14px] font-medium text-center leading-[1.45] m-0">
                  {caption}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center justify-center gap-[44px] -translate-y-[25px]">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-colors ${micOn ? "bg-primary text-white" : "bg-[#EFEFFC] text-primary hover:bg-[#E2E2F8]"}`}
                aria-label={micOn ? "Mute" : "Unmute"}
              >
                {micOn ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                )}
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
                onClick={() => setSpeakerOn(!speakerOn)}
                className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-colors ${speakerOn ? "bg-primary text-white" : "bg-[#EFEFFC] text-primary hover:bg-[#E2E2F8]"}`}
                aria-label={speakerOn ? "Speaker on" : "Speaker off"}
              >
                {speakerOn ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
