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



  const { singleTestimonial,setSingleTestimonial } = useTestimonials();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleScroll = (direction: string) => {
    const container = document.getElementById('testimonial-container');
    const scrollAmount = direction === 'left' ? -300 : 300;
    container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };


  const openDialog = (testimonial: Testimonial) => {
    setSingleTestimonial(testimonial)
    setIsDialogOpen(true)
    console.log(`opened dialog method  , what is testimonial ${JSON.stringify(testimonial)}`)
  }
  return (
<TestimonialsProvider data={data}>
<section  id="testimonials">
<button 
          onClick={() => handleScroll('left')} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
        >
          <ChevronLeft size={24} />
        </button>


        <div id="testimonial-container" className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
          {data.map((testimonial) => (
            <Card 
              key={testimonial._id} 
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
        <TestimonialDialog showDialog={isDialogOpen} setShowDialog={setIsDialogOpen}  />
   </section>

    </TestimonialsProvider>
         

  );
};


// const TestimonialContainer = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const { testimonials,setSingleTestimonial,singleTestimonial } = useTestimonials();
//   const openDialog = (testimonial: Testimonial) => {
//     setSingleTestimonial(testimonial)
//     setIsDialogOpen(true)
//     console.log(`opened dialog method`)
//   }
      
//   return ( 

    
//     testimonials.map((val,index) => (
//       <button  key={val._id} onClick={() => openDialog(val)} >
//     <li  
     
//       className="md:p-6 p-4 bg-secondary md:w-[500px] w-[375px] rounded-2xl space-y-2 relative overflow-hidden z-0"
//     >
//       <div className="relative">
//         <span className="text-9xl absolute -top-9 -left-2 size-10 text-[#4f4f4f]">
//           &quot;
//         </span>
//         <p className="md:line-clamp-4 line-clamp-3 opacity-90 md:text-xl">
//           {val.review}
//         </p>
//       </div>
//       <div className="flex gap-3 pt-6">
//         <Image
//           src={val.image.url}
//           width={50}
//           height={50}
//           alt={val.name}
//           className="object-scale-down size-10 bg-black rounded-full"
//         />
//         <div>
//           <h4 className="md:font-semibold font-medium">{val.name}</h4>
//           <h5 className="md:text-sm text-xs opacity-60">
//             {val.position}
//           </h5>
//         </div>
//       </div>
//       <span className="absolute -bottom-6 -z-10 -right-0 ">
//         <svg
//           width="80"
//           height="176"
//           viewBox="0 0 80 176"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M80 0.311005L80 75.7528L66.8466 87.9639L79.9853 100.869L79.9853 176H57.5783L57.5783 123.751L22.9432 157.376L6.80805 142.143L50.6601 99.1772L0 99.1772L0 77.0325L49.6613 77.0325L6.90351 34.3051L22.7082 18.7178L56.9467 52.1552L56.9467 0H80"
//             fill="#34363C"
//           />
//         </svg>
//       </span>
 
  
//           </li>
//           {/* showDialog={isDialogOpen} setShowDialog={setIsDialogOpen} */}
//           {/* <TestimonialDialog showDialog={!!singleTestimonial} setShowDialog={setIsDialogOpen} /> */}
//           </button>
      
//   ))


// )
// };


 {/* <Transition viewport={{ once: true }}   >
      <InfiniteScroll
        direction={direction}
        speed={speed}
        // pauseOnHover={pauseOnHover}
        className="pb-4"
      >
    {data.map((testimonial) => (
            <Card 
              key={testimonial._id} 
              className="flex-shrink-0 w-64 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => setSingleTestimonial(testimonial)}
            >
              <CardHeader>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}

        {/* <TestimonialContainer></TestimonialContainer> }
      
     
      </InfiniteScroll>
   </Transition> */}

export default Testimonials;
