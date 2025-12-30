"use client";

import Image from "next/image";
import { SlideIn, TextReveal, Transition } from "./ui";
import { About } from "@/utils/interfaces";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { PageLoad } from "./ui/page-load";

export const Hero = ({ about }: { about: About }) => {
  const [hideLoader, setHideLoader] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setHideLoader(false);
    } else {
      setHideLoader(true);
    }
  }, []);

  const handleLoaderComplete = (value: boolean) => {
    setHideLoader(value);
    sessionStorage.setItem("hasSeenLoader", "true");
  };

  return (
    <section className="min-h-dvh w-full overflow-hidden relative">
      <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      {hideLoader === null ? null : hideLoader ? (
        <PageLoad hideLoader={hideLoader} setHideLoader={handleLoaderComplete} />
      ) : (
        <div className="relative h-full w-full min-h-dvh">
          {/* Split Screen Container - 60/40 split */}
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-dvh">
            {/* Left Side - Text Content (60%) */}
            <div className="lg:col-span-3 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 xl:px-24 py-24 lg:py-0 order-2 lg:order-1">

              {/* Name - The Hero */}
              <div className="mb-4">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1]">
                  <SlideIn>Khabazela</SlideIn>
                </h1>
              </div>

              {/* Role */}
              <Transition>
                <p className="text-2xl sm:text-3xl md:text-4xl text-white/60 font-light">
                  The Tech Translator
                </p>
              </Transition>

              {/* Tagline */}
              <Transition viewport={{ once: true }}>
                <p className="text-white/40 text-base md:text-lg mt-8 max-w-sm leading-relaxed">
                  Demystifying tech, one translation at a time.
                </p>
              </Transition>

              {/* CTAs */}
              <Transition viewport={{ once: true }}>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
                  <Link
                    href={"#contact"}
                    className="px-7 py-4 rounded-full bg-primary text-black font-medium flex items-center gap-4 group hover:bg-primary/90 transition-all duration-300"
                  >
                    <TextReveal>Let&apos;s talk</TextReveal>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  <Link
                    href={"/blog"}
                    className="px-7 py-4 rounded-full border border-white/30 flex items-center gap-4 group hover:border-white/60 transition-all duration-300"
                  >
                    <TextReveal>View case studies</TextReveal>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </Transition>

              {/* Trust Signals */}
              <Transition viewport={{ once: true }}>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-white/40 text-sm mb-3">Trusted by</p>
                  <div className="flex flex-wrap justify-center items-center gap-6 text-white/50">
                    <span className="text-sm font-medium">Albany</span>
                    <span className="text-white/20">|</span>
                    <span className="text-sm font-medium">Value Ed</span>
                    <span className="text-white/20">|</span>
                    <span className="text-sm font-medium">Motherland Omni</span>
                    <span className="text-white/20">|</span>
                    <span className="text-sm font-medium">JD Creations</span>
                  </div>
                </div>
              </Transition>
            </div>

            {/* Right Side - Large Image (40%) */}
            <div className="lg:col-span-2 relative flex items-center justify-center p-4 lg:p-6 order-1 lg:order-2">
              <Transition className="w-full h-full">
                <div className="relative w-full h-[50vh] lg:h-[90vh] rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image
                    src={about.avatar.url || '/placeholder-image.jpg'}
                    fill
                    alt="Khabazela"
                    className="object-cover"
                    priority
                  />
                </div>
              </Transition>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
