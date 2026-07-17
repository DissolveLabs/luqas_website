"use client";

import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // We have disabled ReactLenis here because its JavaScript-based physics
  // engine was conflicting with your laptop's precision touchpad, causing
  // the scroll to queue up, freeze, and jump.
  // Returning children directly restores the browser's native, 100% responsive
  // hardware-accelerated scrolling.
  return <>{children}</>;
}
