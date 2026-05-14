import { cn } from "@/lib/utils";

interface Props {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  center = true,
  light = false,
  className,
}: Props) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold leading-tight",
          light ? "text-white" : "text-[#0a1628]",
          "font-display"
        )}
      >
        {title}{" "}
        {highlight && <span className="text-gradient-gold">{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            light ? "text-gray-300" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
