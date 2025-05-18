"use client";

import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export function BackButton() {
  return (
    <Link 
      href="/blog"
      className="hover:text-white/80 transition-colors"
      aria-label="Back to blog"
      onClick={() => {
        // Set a flag in localStorage when navigating back
        if (typeof window !== 'undefined') {
          localStorage.setItem('isNavigatingBack', 'true');
        }
      }}
    >
      <ChevronLeftIcon className="h-10 w-10 md:h-12 md:w-12" />
    </Link>
  );
} 