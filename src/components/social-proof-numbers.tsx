"use client";

import { useEffect, useRef, useState } from "react";
import { Transition } from "./ui";
import { Users, Clock, Briefcase, TrendingUp } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    value: 50,
    suffix: "K+",
    label: "Users on apps built",
    icon: <Users size={24} />,
  },
  {
    value: 5,
    suffix: "+",
    label: "Years in tech",
    icon: <Clock size={24} />,
  },
  {
    value: 10,
    suffix: "+",
    label: "Successful projects",
    icon: <Briefcase size={24} />,
  },
  {
    value: 2,
    suffix: "M+",
    label: "Client value delivered",
    icon: <TrendingUp size={24} />,
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {suffix === "M+" ? (
        <>R{count}{suffix}</>
      ) : (
        <>{count}{suffix}</>
      )}
    </div>
  );
}

export const SocialProofNumbers = () => {
  return (
    <section className="py-16 md:py-20 relative">
      <span className="blob size-1/2 absolute top-0 left-1/4 blur-[100px] -z-10 opacity-50" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <Transition>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Translating Ideas Into Impact
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Numbers that reflect the value delivered through thoughtful tech solutions.
            </p>
          </div>
        </Transition>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <Transition key={stat.label}>
              <div className="relative group">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-primary/30 transition-colors">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                  {/* Label */}
                  <p className="text-white/50 text-sm md:text-base mt-2">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};
