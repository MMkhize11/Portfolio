"use client";

import { Testimonial } from "@/utils/interfaces";
import Image from "next/image";
import { TestimonialDialog } from "./ui/testimonialDialog";
import { TestimonialsProvider, useTestimonials } from "@/utils/testimonial-context";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialProps {
  data: Testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const Testimonials = ({
  data,
  direction,
  speed,
  pauseOnHover,
}: TestimonialProps) => {
  return (
    <TestimonialsProvider data={data}>
      <TestimonialsContent pauseOnHover={pauseOnHover} />
    </TestimonialsProvider>
  );
};

const TestimonialsContent = ({ pauseOnHover }: { pauseOnHover?: boolean }) => {
  const { testimonials, setSingleTestimonial } = useTestimonials();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enabledTestimonials = testimonials.filter((t) => t.enabled);
  const totalSlides = enabledTestimonials.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-rotation
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, totalSlides]);

  const openDialog = (testimonial: Testimonial) => {
    setSingleTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  // Get visible testimonials for carousel (show 3 on desktop, 1 on mobile)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((currentIndex + i + totalSlides) % totalSlides);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section
      id="testimonials-carousel"
      className="relative py-8 md:py-12"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel Container */}
      <div className="max-w-6xl mx-auto px-12 md:px-20">
        <div className="flex items-center justify-center gap-4 md:gap-6 pt-6">
          {visibleIndices.map((idx, position) => {
            const testimonial = enabledTestimonials[idx];
            const isCenter = position === 1;

            return (
              <div
                key={testimonial._id}
                onClick={() => openDialog(testimonial)}
                className={`
                  relative group cursor-pointer transition-all duration-500 ease-out
                  ${isCenter
                    ? 'w-full md:w-[400px] scale-100 opacity-100 z-10'
                    : 'hidden md:block md:w-[300px] scale-90 opacity-50 z-0'
                  }
                `}
              >
                {/* Gradient Border - Orange to Blue theme */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/50 via-amber-500/30 to-blue-600/50 p-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full rounded-2xl bg-[#0a0a0a]" />
                </div>

                {/* Card Content */}
                <div className={`
                  relative rounded-2xl bg-white/[0.03] backdrop-blur-sm p-6 md:p-8
                  border border-white/10
                  transition-all duration-300
                  ${isCenter ? 'group-hover:bg-white/[0.06] group-hover:translate-y-[-8px] group-hover:shadow-2xl group-hover:shadow-orange-500/10' : ''}
                `}>
                  {/* Quote Icon - Orange to Blue gradient */}
                  <div className="absolute -top-4 -left-2 md:left-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 shadow-lg shadow-orange-500/30">
                      <Quote size={20} className="text-white" fill="white" />
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="mt-4 mb-6">
                    <p className={`
                      text-white/80 leading-relaxed
                      ${isCenter ? 'text-base md:text-lg line-clamp-4' : 'text-sm line-clamp-3'}
                    `}>
                      &ldquo;{testimonial.summary}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 blur-sm opacity-60" />
                      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20">
                        {testimonial.image?.url ? (
                          <Image
                            src={testimonial.image.url}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name & Position */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`
                        font-semibold text-white truncate
                        ${isCenter ? 'text-base md:text-lg' : 'text-sm'}
                      `}>
                        {testimonial.name}
                      </h4>
                      <p className={`
                        text-white/50 truncate
                        ${isCenter ? 'text-sm' : 'text-xs'}
                      `}>
                        {testimonial.position}
                      </p>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  {isCenter && (
                    <div className="absolute bottom-3 right-3 text-white/30 text-xs group-hover:text-white/60 transition-colors">
                      Click to read more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots - Orange to Blue gradient for active */}
      <div className="flex justify-center gap-2 mt-8">
        {enabledTestimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`
              transition-all duration-300 rounded-full
              ${idx === currentIndex
                ? 'w-8 h-2 bg-gradient-to-r from-orange-500 to-blue-600'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }
            `}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>

      <TestimonialDialog showDialog={isDialogOpen} setShowDialog={setIsDialogOpen} />
    </section>
  );
};

export default Testimonials;
