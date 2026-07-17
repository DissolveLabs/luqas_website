"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface WaitlistFormProps {
  placeholder?: string;
  buttonLabel?: string;
  // "light" = on a light background (hero) -> indigo success text.
  // "gold"  = on the gold CTA banner       -> white success text.
  variant?: "light" | "gold";
}

// Brand warm palette only (amber, orange, gold, cream).
const CONFETTI_COLORS = ["#F59E0B", "#F97316", "#D4A95F", "#FEF3C7"];

interface Particle {
  dx: number;
  rise: number;
  fall: number;
  rot: number;
  color: string;
  size: number;
}

function makeParticles(): Particle[] {
  return Array.from({ length: 26 }, () => {
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * Math.PI * 1.1; // fan upward
    const speed = 70 + Math.random() * 70;
    return {
      dx: Math.cos(angle) * speed,
      rise: 40 + Math.random() * 70,
      fall: 90 + Math.random() * 90,
      rot: (Math.random() - 0.5) * 540,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 5,
    };
  });
}

export default function WaitlistForm({
  placeholder = "you@email.com",
  buttonLabel = "Reserve Your Spot",
  variant = "light",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || showConfetti || isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ email }]);

      if (error) {
        console.error("Supabase insert error:", error);
        if (error.code === '23505') {
          // 23505 is the PostgreSQL unique violation error code
          setErrorMessage("You're already on the waitlist! Keep an eye on your inbox.");
        } else {
          setErrorMessage("Oops, something went wrong. Could you try again?");
        }
        setIsSubmitting(false);
        return;
      }

      // Success!
      setParticles(makeParticles());
      setShowConfetti(true);
      setEmail("");
      setTimeout(() => {
        setShowConfetti(false);
        setSubmitted(true);
      }, 1500);

    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Oops, something went wrong. Could you try again?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Confetti burst — emerges from the form centre, fans out, gravity-falls */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 z-30 pointer-events-none overflow-visible" aria-hidden="true">
            {particles.map((p, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                animate={{
                  x: [0, p.dx * 0.6, p.dx],
                  y: [0, -p.rise, p.fall],
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.85],
                  rotate: [0, p.rot],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeOut", times: [0, 0.35, 1] }}
                className="absolute left-1/2 top-1/2 rounded-[2px]"
                style={{ width: p.size, height: p.size, backgroundColor: p.color }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center bg-white shadow-[0px_12px_24px_rgba(78,84,200,0.125)] rounded-full p-1.5 w-full group transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(78,84,200,0.2)]"
          >
            <div className="flex items-center pl-4 sm:pl-6 gap-3 flex-1 min-w-0 h-[48px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-primary group-focus-within:animate-pulse">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="email"
                required
                disabled={showConfetti || isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none outline-none text-[#222222] w-full min-w-0 text-[14px] sm:text-[16px] placeholder:text-gray disabled:opacity-50"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting || showConfetti}
              whileHover={(showConfetti || isSubmitting) ? undefined : { scale: 1.05, boxShadow: "0px 0px 15px rgba(78,84,200,0.5)" }}
              whileTap={(showConfetti || isSubmitting) ? undefined : { scale: 0.95 }}
              className="bg-primary text-white font-medium text-[15px] sm:text-[16px] px-6 py-[14px] rounded-full flex-shrink-0 text-center whitespace-nowrap disabled:opacity-70 flex items-center justify-center min-w-[150px]"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                buttonLabel
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex items-center justify-center gap-2.5 py-[18px] font-medium text-[16px] sm:text-[17px] ${
              variant === "gold" ? "text-white" : "text-primary"
            }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${
                variant === "gold" ? "bg-white text-accent" : "bg-primary text-white"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            You&apos;re on the list!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Friendly Inline Error Message */}
      <AnimatePresence>
        {errorMessage && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className={`text-[13.5px] font-medium mt-2 px-4 sm:px-6 text-center sm:text-left text-[#E05252]`}
          >
            <div className="py-1">{errorMessage}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
