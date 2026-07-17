"use client";

// Decorative concentric-arc motif drawn from the LUQAS logo shape.
export default function LogoArcs({
  className,
  stroke = "#EFEFFC",
  strokeWidth = 5.5,
  withDot = false,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  withDot?: boolean;
}) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className={className} aria-hidden="true">
      <path d="M5 54 A35 35 0 0 1 75 54" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M16 54 A24 24 0 0 1 64 54" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M27 54 A13 13 0 0 1 53 54" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      {withDot && <circle cx="40" cy="54" r="6" fill={stroke} />}
    </svg>
  );
}
