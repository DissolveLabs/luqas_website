"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

// Rounded-rect helper matching the design blueprint's canvas drawing.
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

// Hero waveform ported from the Claude Design blueprint (drawHero):
// idle oscillation + mouse-proximity amplitude boost. Original bar heights
// (tapered envelope) with a gold -> purple gradient. The canvas itself is
// sized full-width by the caller so the outer bars reach the circle's inner
// edges — a horizontal stretch only, no height/scale change.
export default function HeroWaveform({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.62, near: true });
  const dpr = useRef(1);

  useEffect(() => {
    dpr.current = Math.min(2, window.devicePixelRatio || 1);
    const onMove = (e: MouseEvent) => {
      const c = canvasRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      mouse.current.x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      mouse.current.near = e.clientY > r.top - 260 && e.clientY < r.bottom + 120;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useAnimationFrame((time) => {
    const c = canvasRef.current;
    if (!c) return;
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (!w || !h) return;
    const d = dpr.current;
    if (c.width !== Math.round(w * d)) {
      c.width = Math.round(w * d);
      c.height = Math.round(h * d);
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const t = time / 1000;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const n = Math.max(60, Math.floor(w / 14));
    const cy = h * 0.5;
    const mx = mouse.current.x * w;

    // Gold -> purple gradient across the waveform.
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#D4A95F");
    grad.addColorStop(1, "#4E54C8");
    ctx.fillStyle = grad;

    for (let i = 0; i < n; i++) {
      const x = ((i + 0.5) / n) * w;
      const dist = Math.abs(x - mx) / w;
      const boost = mouse.current.near ? Math.max(0, 1 - dist * 3.4) : 0;
      // Original tapered envelope + bar-height math (unchanged from the blueprint).
      const env = Math.pow(Math.sin((i / n) * Math.PI), 0.55);
      const wave =
        (Math.sin(t * 1.4 + i * 0.32) * 0.5 + 0.5) *
        (Math.sin(t * 0.65 + i * 0.12) * 0.5 + 0.5);
      let amp = (wave * 0.46 + 0.07 + boost * 0.95) * env * (h * 0.44);
      amp = Math.max(2, amp);

      ctx.globalAlpha = Math.min(1, 0.3 + env * 0.5 + boost * 0.35);
      const bw = Math.max(2.4, (w / n) * 0.42);
      rr(ctx, x - bw / 2, cy - amp, bw, amp * 2, bw / 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
