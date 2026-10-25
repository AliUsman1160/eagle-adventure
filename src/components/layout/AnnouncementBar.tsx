import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div role="region" aria-label="Announcement" className="bg-forest-950 text-white">
      <p className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-center text-[0.625rem] font-semibold tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]">
        YOUR NEXT GREAT ADVENTURE STARTS HERE
        <ArrowRight aria-hidden className="h-3.5 w-3.5 text-orange" />
      </p>
    </div>
  );
}
