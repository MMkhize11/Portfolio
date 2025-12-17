"use client";

import { Transition } from "./ui";
import { Smartphone, Globe, Zap, Bot, Mic, Users } from "lucide-react";

interface Service {
  _id: string;
  name: string;
  charge: string;
  desc: string;
  enabled: boolean;
  image?: {
    url: string;
  };
}

// Map service names to icons and descriptions
// Colors matched to website theme: orange (#c76000) to blue (rgba(7, 29, 228))
const serviceDetails: Record<string, { icon: React.ElementType; description: string; gradient: string }> = {
  "App Development": {
    icon: Smartphone,
    description: "Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android.",
    gradient: "from-orange-600/20 to-amber-500/10",
  },
  "Web App Development": {
    icon: Globe,
    description: "Modern, responsive web applications built with cutting-edge technologies for performance and scalability.",
    gradient: "from-blue-600/20 to-indigo-500/10",
  },
  "Automation": {
    icon: Zap,
    description: "Streamline your workflows and eliminate repetitive tasks with intelligent automation solutions.",
    gradient: "from-amber-500/20 to-orange-600/10",
  },
  "AI Integrations": {
    icon: Bot,
    description: "Leverage the power of artificial intelligence to enhance your products with smart, adaptive features.",
    gradient: "from-indigo-500/20 to-blue-600/10",
  },
  "Master of Ceremonies (MC)": {
    icon: Mic,
    description: "Professional MC services for corporate events, conferences, and special occasions.",
    gradient: "from-orange-500/20 to-blue-600/10",
  },
  "Public Speaking": {
    icon: Users,
    description: "Engaging talks and presentations on technology, innovation, and digital transformation.",
    gradient: "from-blue-500/20 to-orange-500/10",
  },
};

export const ServicesBento = ({ services }: { services: Service[] }) => {
  const enabledServices = services.filter((s) => s.enabled);

  // Define layout patterns for each card position
  const getCardClasses = (index: number) => {
    switch (index) {
      case 0: // First card - featured
        return "min-h-[280px] md:min-h-[320px]";
      case 1: // Second card
        return "min-h-[280px] md:min-h-[320px]";
      case 2: // Third card
        return "min-h-[280px] md:min-h-[320px]";
      case 3: // Fourth card
        return "min-h-[240px] md:min-h-[280px]";
      case 4: // Fifth card
        return "min-h-[240px] md:min-h-[280px]";
      case 5: // Sixth card
        return "min-h-[240px] md:min-h-[280px]";
      default:
        return "min-h-[240px] md:min-h-[280px]";
    }
  };

  const isFeatured = (index: number) => index === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
      {enabledServices.map((service, index) => {
        const details = serviceDetails[service.name] || {
          icon: Globe,
          description: service.desc || "Professional services tailored to your needs.",
          gradient: "from-gray-500/20 to-slate-500/20",
        };
        const Icon = details.icon;
        const featured = isFeatured(index);

        return (
          <Transition key={service._id} className="h-full">
            <div
              className={`
                group relative overflow-hidden rounded-3xl border border-white/10
                bg-gradient-to-br ${details.gradient} backdrop-blur-sm
                transition-all duration-500 hover:border-white/30 hover:scale-[1.02]
                h-full ${getCardClasses(index)}
              `}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className={`relative h-full flex flex-col justify-between p-6 md:p-8 ${featured ? "lg:p-10" : ""}`}>
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white/80" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className={`font-bold text-white mb-3 ${featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}>
                    {service.name}
                  </h3>
                  <p className={`text-white/60 leading-relaxed ${featured ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
                    {details.description}
                  </p>
                </div>

                {/* Hover arrow indicator */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Transition>
        );
      })}
    </div>
  );
};
