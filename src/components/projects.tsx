"use client";

import { Project } from "@/utils/interfaces";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import Filters from "./filters";
import { SectionHeading, SlideIn, TextReveal, Transition } from "./ui";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { Button } from "./ui/button";
import { useCursorVariants } from "@/utils/context";
import { Dialog } from "./ui/dialog";
import { ProjectsProvider, useProjects } from "@/utils/project-context";

interface ProjectProps {
  data: Project[];
}

const Projects = ({ data }: ProjectProps) => {
  return (
    <ProjectsProvider data={data}>
      <section className="md:p-8 p-4 relative" id="projects">
        <SectionHeading>
          <SlideIn className="text-white/40">Selected</SlideIn>
          <br />
          <SlideIn>works</SlideIn>
        </SectionHeading>
        <Filters />
        <ProjectContainer />
      </section>
    </ProjectsProvider>
  );
};

export default Projects;

const ProjectContainer = () => {
  const { filteredProjects, setSingleProject, singleProject } = useProjects();
  const [showMore, setShowMore] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const numProjectToShow = isMobile ? 6 : 8;

  // Open dialog when singleProject is set
  useEffect(() => {
    if (singleProject) {
      setShowDialog(true);
    }
  }, [singleProject]);

  // Clear singleProject when dialog closes
  useEffect(() => {
    if (!showDialog && singleProject) {
      setSingleProject(null);
    }
  }, [showDialog, singleProject, setSingleProject]);

  return (
    <AnimatePresence>
      <motion.div
        className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3"
        key="Project-container"
      >
        {filteredProjects
          .slice(0, showMore ? filteredProjects.length : numProjectToShow)
          .map((project, index) =>
            project.enabled ? (
              <Transition
                transition={{ delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                key={project._id+"-"+index}
              >
                <Card {...project} />
              </Transition>
            ) : null
          )}
      </motion.div>
      <div className="grid place-items-center py-8">
        {filteredProjects.length > numProjectToShow && (
          <Button onClick={() => setShowMore(!showMore)}>
            <TextReveal>{showMore ? "Show less" : "Show more"}</TextReveal>
          </Button>
        )}
      </div>
      <Dialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </AnimatePresence>
  );
};

const Card = ({ _id, title, image, description, liveurl, techStack, projectImages }: Project) => {
  const [hover, setHover] = useState(false);
  const { setVariant } = useCursorVariants();
  const { setSingleProject } = useProjects();

  const mouseEnter = () => {
    setHover(true);
    setVariant("PROJECT");
  };
  const mouseLeave = () => {
    setHover(false);
    setVariant("DEFAULT");
  };

  const handleReadMore = () => {
    setSingleProject({ _id, title, image, description, liveurl, techStack, projectImages, githuburl: "", sequence: 0, enabled: true });
  };

  return (
    <AnimatePresence>
      <div
        className={
          `relative rounded-2xl overflow-hidden aspect-square bg-secondary/30 transition-transform duration-300 ` +
          (hover ? "scale-105 shadow-2xl z-10" : "")
        }
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        key={title}
      >
        {/* Project Image */}
        <Image
          src={image.url || '/placeholder-image.jpg'}
          width={600}
          height={500}
          alt={title}
          className="object-cover h-full w-full object-center rounded-2xl transition-transform duration-300"
        />
        {/* Glassmorphism Overlay */}
        <div
          style={{ opacity: hover ? 1 : 0, pointerEvents: hover ? 'auto' : 'none', transition: 'opacity 0.3s' }}
          className="absolute inset-0 flex flex-col justify-end p-6 bg-black/40 backdrop-blur-md"
        >
          <div className="mb-auto" />
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{title}</h3>
          <p className="text-white/80 text-sm mb-4 line-clamp-3 drop-shadow-md">{description}</p>
          <div className="flex gap-2">
          {/* <button
              onClick={handleReadMore}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition font-semibold text-sm backdrop-blur-sm"
            >
              Read More
            </button> */}
            {liveurl && (
              <a
                href={liveurl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition font-semibold text-sm backdrop-blur-sm"
              >
                Visit
                <ArrowUpRight className="inline ml-2 size-4 align-text-bottom" />
              </a>
            )}
          
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
