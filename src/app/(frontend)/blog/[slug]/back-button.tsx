"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  variant?: 'icon' | 'full';
}

export function BackButton({ variant = 'icon' }: BackButtonProps) {
  if (variant === 'full') {
    return (
      <Link
        href="/#projects"
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        <span className="font-medium">Back to Projects</span>
      </Link>
    );
  }

  return (
    <Link
      href="/#projects"
      className="group flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-black/50 hover:text-white hover:border-white/40 transition-all duration-300"
      aria-label="Back to projects"
    >
      <ArrowLeft
        size={24}
        className="group-hover:-translate-x-0.5 transition-transform duration-300"
      />
    </Link>
  );
}
