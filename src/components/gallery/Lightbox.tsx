"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types";
import SafeImage from "@/components/ui/SafeImage";

export default function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: GalleryImage[];
  /** null = closed */
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  // Scroll lock, focus management and keyboard handling while open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, go, onClose]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${current.caption}`}
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold" aria-live="polite">
              {index! + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10"
            >
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Previous image"
              className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/60 text-white hover:bg-orange hover:text-charcoal sm:left-4"
            >
              <ChevronLeft aria-hidden className="h-6 w-6" />
            </button>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-full w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Next image"
              className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/60 text-white hover:bg-orange hover:text-charcoal sm:right-4"
            >
              <ChevronRight aria-hidden className="h-6 w-6" />
            </button>
          </div>

          <p className="px-6 py-5 text-center text-sm text-white/85" onClick={(e) => e.stopPropagation()}>
            <span className="font-semibold text-white">{current.caption}</span>
            <span className="text-white/60"> · {current.category}</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
