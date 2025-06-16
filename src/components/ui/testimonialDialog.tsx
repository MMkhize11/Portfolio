"use client";

import { useTestimonials } from "@/utils/testimonial-context";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface DialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export const TestimonialDialog = ({ showDialog, setShowDialog }: DialogProps) => {
  const { singleTestimonial } = useTestimonials();

  if (!singleTestimonial) return null;

  console.log(`what is single Testimonial  ${JSON.stringify(singleTestimonial)}`);
  
  return (
    <>
      {showDialog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 grid place-items-center "
          onClick={(e) => e.target === e.currentTarget && setShowDialog(false)}
        >
          <div className="bg-black/80 w-11/12 md:w-1/2 h-4/5 md:h-[93%] overflow-hidden rounded-xl overflow-y-auto">
            {singleTestimonial && (
              <div className="relative ">
                <button
                  className="absolute top-4 right-4 bg-black size-8 rounded-full border border-white/40 grid place-items-center text-white"
                  onClick={() => setShowDialog(false)}
                >
                  <X size={20} />
                </button>
                <Image
                  src={singleTestimonial.image.url || '/placeholder-image.jpg'}
                  width={500}
                  height={300}
                  alt={singleTestimonial.image.public_id}
                  className="w-full h-full aspect-video md:aspect-[12/6] object-cover object-center"
                />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-4xl font-bold">
                      {singleTestimonial.name}
                    </h5>
                    
                    <div className="flex items-center gap-4">
                      <Link href={singleTestimonial.companyUrl}>
                        <ExternalLink />
                      </Link>
                    </div>
                  </div>
                 
                  <p className="text-white/50">
                    {singleTestimonial.review}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
