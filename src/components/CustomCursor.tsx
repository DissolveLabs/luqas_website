"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for buttery trailing movement
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('input')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          opacity: isHovering ? 0.3 : 0.6,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
        className="rounded-full bg-primary blur-[2px] mix-blend-multiply"
      />
    </motion.div>
  );
}
