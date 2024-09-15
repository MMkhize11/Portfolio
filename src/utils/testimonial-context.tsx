"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Testimonial,  } from "./interfaces";

interface TestimonialContextProps {
  testimonials: Testimonial[];
  singleTestimonial: Testimonial | null;

  setSingleTestimonial: Dispatch<SetStateAction<Testimonial | null>>;
}

const TestimonialsContext = createContext<TestimonialContextProps>({
 
testimonials:[] as Testimonial[],
  singleTestimonial:null ,

  setSingleTestimonial: () => {},

});

// ProjectsProvider component to manage and expose context values
const TestimonialsProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Testimonial[];
}) => {
  

  const [testimonials, setTestimonials] = useState(data);
  const [singleTestimonial, setSingleTestimonial] = useState<Testimonial | null>(null);

 

 

  const value = {
   testimonials,
    singleTestimonial,
    setSingleTestimonial
  };

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  );
};

// Custom hook to consume the ProjectsContext
const useTestimonials = () => {
  const context = useContext(TestimonialsContext);
  if (context === undefined) {
    throw new Error("useTestimonials must be used within a ProjectsProvider");
  }
  return context;
};

export { TestimonialsProvider, useTestimonials };
