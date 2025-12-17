"use client";

import Image from "next/image";
import { Transition } from "./ui";
import { cn } from "@/utils/cn";

interface Skill {
  _id: string;
  name: string;
  enabled: boolean;
  sequence: number;
  image?: {
    url: string;
  };
}

interface SkillsGridProps {
  skills: Skill[];
}

export const SkillsGrid = ({ skills }: SkillsGridProps) => {
  const enabledSkills = skills
    .filter((s) => s.enabled)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="skills">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-blue-600/10" />
        <span className="blob size-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[120px] opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Transition>
            <span className="text-orange-500 text-sm md:text-base uppercase tracking-[0.3em] font-medium">
              Skills & Experience
            </span>
          </Transition>
          <Transition>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-white">
              Working with Latest
              <br />
              Technologies & Stack
            </h2>
          </Transition>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
          {enabledSkills.map((skill) => (
            <Transition key={skill._id}>
              <div className="flex flex-col items-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 relative mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                  {skill.image?.url ? (
                    <Image
                      src={skill.image.url}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-white/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white/50">
                        {skill.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-white/70 text-xs md:text-sm text-center group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};
