"use client";

import { motion } from "framer-motion";

// Decorative concentric-arc motif drawn from the LUQAS logo shape.
export default function LogoArcs({
  className,
  stroke = "#EFEFFC",
  strokeWidth = 5.5,
  withDot = false,
  animated = false,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  withDot?: boolean;
  animated?: boolean;
}) {
  const Path = animated ? motion.path : "path";
  const Circle = animated ? motion.circle : "circle";

  const getAnimation = (delay: number) => {
    return animated
      ? {
          initial: { opacity: 0.1, scale: 0.9 },
          animate: { opacity: [0.1, 0.7, 0.1], scale: [0.95, 1.05, 0.95] },
          transition: {
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut",
          },
          style: { transformOrigin: "40px 54px" }
        }
      : {};
  };

  return (
    <svg viewBox="0 0 80 60" fill="none" className={className} aria-hidden="true">
      {/* Outer ring */}
      <Path d="M5 54 A35 35 0 0 1 75 54" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" {...(getAnimation(1) as any)} />
      {/* Middle ring */}
      <Path d="M16 54 A24 24 0 0 1 64 54" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" {...(getAnimation(0.5) as any)} />
      {/* Inner ring */}
      <Path d="M27 54 A13 13 0 0 1 53 54" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" {...(getAnimation(0) as any)} />
      
      {withDot && (
        <Circle 
          cx="40" cy="54" r="6" fill={stroke} 
          {...(animated ? {
            initial: { opacity: 0.1 },
            animate: { opacity: [0.1, 0.8, 0.1] },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          } : {})}
        />
      )}
    </svg>
  );
}
