"use client";

import { cn } from "@/utils/cn";

interface Client {
  name: string;
  logo?: string;
  url?: string;
}

// Client logos
const clients: Client[] = [
  { name: "Value Ed", logo: "/assets/icons/clients/valueed.jpg", url: "https://valueed.co.za" },
  { name: "Motherland OMNi", logo: "/assets/icons/clients/motherland-omni.png", url: "https://motherlandomni.co.za/" },
  { name: "TMEG Financial", logo: "/assets/icons/clients/tmeg.svg", url: "https://www.tmeg.co.za/" },
  { name: "Deviare", logo: "/assets/icons/clients/deviare.png", url: "https://deviare.africa/the-company" },
  { name: "Digi Innovation", logo: "/assets/icons/clients/DIW.jpeg", url: "https://digiinnovation.co.za" },
  { name: "JD Creations", logo: "/assets/icons/clients/jd-creations.avif", url: "https://jdcreations.co.za" },
];

interface LogoCarouselProps {
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  className?: string;
}

export const LogoCarousel = ({
  speed = "normal",
  direction = "left",
  className,
}: LogoCarouselProps) => {
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s",
  };

  return (
    <div className={cn("w-full overflow-hidden py-8", className)}>
      <div
        className="flex w-max gap-16 md:gap-20"
        style={{
          animation: `scroll ${speedMap[speed]} linear infinite ${direction === "right" ? "reverse" : ""}`,
        }}
      >
        {/* First set of logos */}
        {clients.map((client, idx) => (
          <a
            key={`first-${idx}`}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-w-[195px] md:min-w-[260px] h-[84px] md:h-[104px] px-8 md:px-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-[52px] md:h-[73px] w-auto max-w-[156px] md:max-w-[208px] object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-white/50 font-medium text-base md:text-lg whitespace-nowrap">
                {client.name}
              </span>
            )}
          </a>
        ))}
        {/* Duplicate set for seamless loop */}
        {clients.map((client, idx) => (
          <a
            key={`second-${idx}`}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-w-[195px] md:min-w-[260px] h-[84px] md:h-[104px] px-8 md:px-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-[52px] md:h-[73px] w-auto max-w-[156px] md:max-w-[208px] object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-white/50 font-medium text-base md:text-lg whitespace-nowrap">
                {client.name}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export const ClientLogosSection = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <p className="text-center text-white/40 text-sm md:text-base uppercase tracking-widest">
          Trusted by amazing clients
        </p>
      </div>
      <LogoCarousel speed="normal" direction="left" />
    </section>
  );
};
