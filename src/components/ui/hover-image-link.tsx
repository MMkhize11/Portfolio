"use client";

import Link from "next/link";
import Image from "next/image";

interface LinkProps {
  heading: string;
  subheading: string;
  href: string;
  price: string;
  imgSrc: string;
}

export const HoverImageLink = ({
  heading,
  subheading,
  href,
  price,
  imgSrc,
}: LinkProps) => {
  return (
    <Link
      href={href}
      className="group relative flex flex-col md:flex-row items-center justify-between bg-white/10 border border-white/10 rounded-2xl shadow-lg py-8 px-6 md:py-10 md:px-16 mb-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/20"
      tabIndex={0}
    >
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between w-full">
          <h4 className="relative z-10 block text-2xl sm:text-4xl font-bold text-white transition-colors duration-500 md:text-5xl">
            {heading}
          </h4>
          {imgSrc && (
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <Image
                src={imgSrc}
                alt={heading}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <p className="relative z-10 mt-2 block md:text-base text-sm text-foreground/70 transition-colors duration-500">
          {subheading}
        </p>
      </div>
    </Link>
  );
};
