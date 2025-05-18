import { Testimonial } from "@/utils/interfaces";
import { TestimonialsProvider, useTestimonials } from "@/utils/testimonial-context";
import Image from "next/image";

interface TestimonialProps {
  data: Testimonial[];
}

const TestimonialSection = () => {
  const { testimonials, setSingleTestimonial, singleTestimonial } = useTestimonials();
  return (
    <div className="bg-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Testimonials</h2>
        <p className="text-2xl text-center mb-12 text-gray-900">We have worked with thousands of amazing people</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105 max-w-lg mx-auto">
      <Image
        src={testimonial.image?.url || "/placeholder-image.jpg"}
        alt={testimonial.name}
        width={64}
        height={64}
        className="rounded-full mb-4 object-cover"
      />
      <p className="text-lg font-semibold text-white/90 mb-2">
        {testimonial.summary}
      </p>
      <p className="text-white/60 text-sm mb-1">{testimonial.name}</p>
      <p className="text-white/40 text-xs">{testimonial.position}</p>
    </div>
  );
}

export { TestimonialSection };