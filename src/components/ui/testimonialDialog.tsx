"use client";

import { useTestimonials } from "@/utils/testimonial-context";
import { ExternalLink, Quote, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export const TestimonialDialog = ({ showDialog, setShowDialog }: DialogProps) => {
  const { singleTestimonial } = useTestimonials();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showDialog) {
      setIsAnimating(true);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDialog]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setShowDialog(false), 200);
  };

  if (!singleTestimonial || !showDialog) return null;

  return (
    <div
      className={`
        fixed inset-0 bg-black/70 backdrop-blur-md z-50 grid place-items-center p-4
        transition-opacity duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Dialog Container */}
      <div
        className={`
          relative w-full max-w-2xl max-h-[90vh] overflow-hidden
          transition-all duration-300 ease-out
          ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
      >
        {/* Gradient Border Effect - Orange to Blue theme */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/60 via-amber-500/40 to-blue-600/60 p-[1px]">
          <div className="w-full h-full rounded-2xl bg-[#0a0a0a]" />
        </div>

        {/* Content */}
        <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl overflow-hidden">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-black/70 hover:border-white/40 transition-all duration-200"
            onClick={handleClose}
          >
            <X size={20} />
          </button>

          {/* Scrollable Content */}
          <div className="max-h-[90vh] overflow-y-auto">
            {/* Header Section with Image */}
            <div className="relative">
              {/* Background Gradient - Orange to Blue */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-amber-500/10 to-transparent" />

              {/* Profile Section */}
              <div className="relative px-6 md:px-10 pt-8 pb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 blur-md opacity-60 scale-110" />
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                      {singleTestimonial.image?.url ? (
                        <Image
                          src={singleTestimonial.image.url}
                          fill
                          alt={singleTestimonial.name}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl">
                          {singleTestimonial.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & Position */}
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {singleTestimonial.name}
                    </h3>
                    <p className="text-white/60 text-lg mb-4">
                      {singleTestimonial.position}
                    </p>

                    {/* Company Link */}
                    {singleTestimonial.companyUrl && (
                      <Link
                        href={singleTestimonial.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 text-sm"
                      >
                        <ExternalLink size={16} />
                        Visit Company
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 md:mx-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Testimonial Content */}
            <div className="px-6 md:px-10 py-8">
              {/* Quote Icon - Orange to Blue gradient */}
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 shadow-lg shadow-orange-500/30">
                  <Quote size={28} className="text-white" fill="white" />
                </div>
              </div>

              {/* Summary Quote */}
              {singleTestimonial.summary && (
                <blockquote className="text-center mb-8">
                  <p className="text-xl md:text-2xl text-white/90 font-medium italic leading-relaxed">
                    &ldquo;{singleTestimonial.summary}&rdquo;
                  </p>
                </blockquote>
              )}

              {/* Full Review */}
              {singleTestimonial.review && singleTestimonial.review !== singleTestimonial.summary && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4 text-center">
                    Full Review
                  </h4>
                  <p className="text-white/70 leading-relaxed text-base md:text-lg whitespace-pre-line">
                    {singleTestimonial.review}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Gradient - Orange tint */}
            <div className="h-8 bg-gradient-to-t from-orange-500/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
