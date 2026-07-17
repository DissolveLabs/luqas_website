"use client";

import Image from "next/image";

// Deterministic bar heights so server and client render identically.
const BARS = Array.from({ length: 28 }, (_, i) => {
  const env = Math.pow(Math.sin(((i + 0.5) / 28) * Math.PI), 0.6);
  const wave = Math.sin(i * 1.7) * 0.5 + 0.5;
  return Math.max(4, Math.round((wave * 0.75 + 0.15) * env * 52));
});

// Static phone visual for the "Preserve Memories" section (per Figma).
// Deliberately non-interactive: the live call animation belongs to the
// Signature Moment section only.
export default function PhoneStatic() {
  return (
    <div className="relative w-[300px] h-[620px] rounded-[48px] bg-[#3A3A3E] p-[10px] shadow-[0_40px_90px_rgba(24,26,78,0.35)]">
      {/* Notch */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[26px] bg-black rounded-b-2xl z-20" />

      <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#181A4E] flex flex-col items-center justify-between pt-[52px] pb-8 px-6">
        {/* Status bar */}
        <div className="absolute top-4 inset-x-7 flex justify-between items-center text-white/90 text-[12px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <svg width="15" height="10" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.8" /><rect x="4.3" y="5" width="3" height="6" rx="0.8" /><rect x="8.6" y="2.5" width="3" height="8.5" rx="0.8" /><rect x="12.9" y="0" width="3" height="11" rx="0.8" /></svg>
            <svg width="14" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
          </span>
        </div>

        <div className="w-full flex flex-col items-center gap-1.5">
          <div className="w-full flex items-center justify-between">
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </span>
            <Image src="/sources/Hero/logo-text-gold.svg" alt="Luqas" width={80} height={20} className="h-5 w-[50px]" />
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="12" cy="19" r="1.7" /></svg>
            </span>
          </div>
          <div className="font-adlam text-[22px] text-white mt-2">Dad ❤️</div>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF7D]" /> Live
          </div>
        </div>

        <Image src="/sources/dad-avatar.jpg" alt="Dad" width={130} height={130} className="w-[130px] h-[130px] rounded-full object-cover border-[3px] border-white/20" />

        {/* Static waveform */}
        <div className="flex items-center gap-[4px] h-[64px]" aria-hidden="true">
          {BARS.map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-white/90" style={{ height: `${h}px` }} />
          ))}
        </div>

        <div className="text-white/70 text-[13px] font-semibold tabular-nums">00:02:48</div>

        <div className="flex items-end gap-7">
          <div className="flex flex-col items-center gap-1.5">
            <span className="w-[52px] h-[52px] rounded-full bg-white/10 text-white flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
            </span>
            <span className="text-white/60 text-[10px]">Mute</span>
          </div>
          <span className="w-[60px] h-[60px] rounded-full bg-[#E05252] text-white flex items-center justify-center shadow-[0_10px_26px_rgba(224,82,82,0.4)] mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-1.78 2.66a.98.98 0 0 1-.7.28c-.28 0-.53-.11-.71-.28a11.6 11.6 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" /></svg>
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <span className="w-[52px] h-[52px] rounded-full bg-white/10 text-white flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
            </span>
            <span className="text-white/60 text-[10px]">Speaker</span>
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[110px] h-[4px] rounded-full bg-white/80" />
      </div>
    </div>
  );
}
