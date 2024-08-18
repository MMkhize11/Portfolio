import { Testimonial } from "@/utils/interfaces";
import { TestimonialsProvider, useTestimonials } from "@/utils/testimonial-context";
import test from "node:test";

interface TestimonialProps {
    data: Testimonial[];
  }

const TestimonialCard = (testimonial:Testimonial) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">{testimonial.review}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-gray-500 text-sm">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
  
  const TestimonialSection = () => {

    const { testimonials,setSingleTestimonial,singleTestimonial } = useTestimonials();
    return (
      <div className="bg-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Testimonials</h2>
          <p className="text-2xl text-center mb-12 text-gray-900">We have worked with thousands of amazing people</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialSection;