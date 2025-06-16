"use client";

import { Testimonial } from "@/utils/interfaces";
import Image from "next/image";
import {  InfiniteScroll, Transition } from "./ui";
import { TestimonialDialog } from "./ui/testimonialDialog";

import { TestimonialsProvider, useTestimonials } from "@/utils/testimonial-context";
import { useState } from "react";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <TestimonialsContent />
    </TestimonialsProvider>
  );
};

const TestimonialsContent = () => {
  const { testimonials, setSingleTestimonial } = useTestimonials();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleScroll = (direction: string) => {
    const container = document.getElementById('testimonial-container');
    const scrollAmount = direction === 'left' ? -300 : 300;
    container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const openDialog = (testimonial: Testimonial) => {
    setSingleTestimonial(testimonial);
    setIsDialogOpen(true);
    console.log(`opened dialog method  , what is testimonial ${JSON.stringify(testimonial)}`);
  };

  return (
    <section id="testimonials">
      <button 
        onClick={() => handleScroll('left')} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <div id="testimonial-container" className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={testimonial._id+"-"+index} 
            className="flex-shrink-0 w-64 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => openDialog(testimonial)}
          >
            <CardHeader>
              <h3 className="font-bold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{testimonial.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
   
      <button 
        onClick={() => handleScroll('right')} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
      >
        <ChevronRight size={24} />
      </button>
      <TestimonialDialog showDialog={isDialogOpen} setShowDialog={setIsDialogOpen} />
    </section>
  );
};

export default Testimonials;
