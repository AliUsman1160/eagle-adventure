"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FAQ } from "@/types";
import { cn } from "@/lib/utils";

export default function Accordion({
  items,
  tone = "light",
}: {
  items: FAQ[];
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const dark = tone === "dark";

  return (
    <div className={cn("divide-y border-y", dark ? "divide-white/15 border-white/15" : "divide-forest/15 border-forest/15")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <div key={item.question}>
            <h3 className="text-base font-bold">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-heading text-base font-bold sm:text-lg",
                  dark ? "text-white" : "text-forest",
                )}
              >
                {item.question}
                <Plus
                  aria-hidden
                  className={cn("h-5 w-5 shrink-0 text-orange transition-transform duration-300", isOpen && "rotate-45")}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className={cn("pb-5 pr-8 leading-relaxed", dark ? "text-white/75" : "text-muted")}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
