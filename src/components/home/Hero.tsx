"use client";

import { motion } from "framer-motion";
import { ArrowDown, Compass } from "lucide-react";
import { IMG } from "@/data/images";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import { ButtonLink } from "@/components/ui/Button";

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-36px)] items-end overflow-hidden bg-charcoal pb-24 pt-36 sm:pb-28">
      <SafeImage
        src={IMG.hero}
        alt="Snow-covered mountain peaks glowing at sunrise"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[60%_center]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />

      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="max-w-4xl"
        >
          <motion.p variants={item} className="eyebrow flex items-center gap-3 text-orange">
            <span aria-hidden className="h-px w-8 bg-current" />
            EXPLORE BEYOND THE ORDINARY
          </motion.p>
          <motion.h1 variants={item} className="mt-5 text-balance text-[2.5rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            <span className="block">Adventure Is Out There.</span> <span className="text-orange">Let&rsquo;s Find It.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Discover breathtaking destinations, unforgettable outdoor experiences, and journeys that bring people closer to nature.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/adventures" size="lg">Explore Adventures</ButtonLink>
            <ButtonLink href="/about" size="lg" variant="outline-light">Discover Our Story</ButtonLink>
          </motion.div>
        </motion.div>
      </Container>

      <div aria-hidden className="absolute bottom-24 right-10 hidden text-white/25 lg:block">
        <Compass className="h-40 w-40" strokeWidth={0.75} />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Container className="flex items-center justify-between pb-6">
          <p className="hidden rounded border border-white/25 bg-charcoal/40 px-3 py-1.5 text-[0.6875rem] font-bold tracking-[0.22em] text-white backdrop-blur-sm sm:block">
            ADVENTURE • NATURE • DISCOVERY
          </p>
          <a
            href="#stats"
            aria-label="Scroll to content"
            className="mx-auto flex flex-col items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.2em] text-white/80 hover:text-white sm:mx-0"
          >
            SCROLL
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 pt-1.5"
            >
              <ArrowDown aria-hidden className="h-3.5 w-3.5" />
            </motion.span>
          </a>
        </Container>
      </div>
    </section>
  );
}
