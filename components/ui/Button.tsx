"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-semibold hover:opacity-90 shadow-md",
  secondary:
    "bg-[#0a1628] text-white font-semibold hover:bg-[#1a3560] border border-[#c9a84c]/30",
  outline:
    "border-2 border-[#c9a84c] text-[#c9a84c] font-semibold hover:bg-[#c9a84c]/10",
  ghost: "text-[#c9a84c] font-semibold hover:bg-[#c9a84c]/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
