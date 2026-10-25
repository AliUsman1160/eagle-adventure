"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/config";
import { cn, isActivePath } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

export default function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Close on route change.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-108px)] overflow-y-auto bg-forest lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 pb-10 pt-4 sm:px-8">
            <ul className="divide-y divide-white/10">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center justify-between font-heading text-xl font-bold",
                        active ? "text-orange" : "text-white",
                      )}
                    >
                      {link.label}
                      {active && <span aria-hidden className="h-2 w-2 rounded-full bg-orange" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href="/adventures" size="lg" className="mt-8 w-full">
              Explore Adventures
            </ButtonLink>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
