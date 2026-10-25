import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  /** "light" = on light backgrounds, "dark" = on dark/forest backgrounds */
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-3 flex items-center gap-3", align === "center" && "justify-center", dark ? "text-orange" : "text-orange-600")}>
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag className={cn("text-balance text-3xl sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-forest")}>{title}</Tag>
      {text && <p className={cn("mt-4 text-base sm:text-lg", dark ? "text-white/75" : "text-muted")}>{text}</p>}
    </div>
  );
}
