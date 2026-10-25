import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("h-9 w-9", className)}>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M6 28 15 13l5 8 4-6 10 13H6Z" fill="currentColor" />
      <circle cx="27" cy="11" r="3" fill="#F28C28" />
    </svg>
  );
}

export default function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Eagle Eye Adventure Club — home"
      className={cn("group inline-flex items-center gap-2.5", tone === "light" ? "text-white" : "text-forest", className)}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-extrabold tracking-tight">EAGLE EYE</span>
        <span className="mt-1 text-[0.625rem] font-semibold tracking-[0.28em] opacity-75">ADVENTURE CLUB</span>
      </span>
    </Link>
  );
}
