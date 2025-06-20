"use client";

import { useProjects } from "@/utils/project-context";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface DialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export const Dialog = ({ showDialog, setShowDialog }: DialogProps) => {
  const { singleProject } = useProjects();

  return (
    <>
      {showDialog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 grid place-items-center "
          onClick={(e) => e.target === e.currentTarget && setShowDialog(false)}
        >
          <div className="bg-black/80 w-11/12 md:w-1/2 h-4/5 md:h-[93%] overflow-hidden rounded-xl overflow-y-auto">
            {singleProject && (
              <div className="relative ">
                <button
                  className="absolute top-4 right-4 bg-black size-8 rounded-full border border-white/40 grid place-items-center text-white"
                  onClick={() => setShowDialog(false)}
                >
                  <X size={20} />
                </button>
                <Image
                  src={singleProject.image.url || '/placeholder-image.jpg'}
                  width={500}
                  height={300}
                  alt={singleProject.title}
                  className="w-full h-full aspect-video md:aspect-[12/6] object-cover object-center"
                />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-4xl font-bold">
                      {singleProject.title}
                    </h5>
                    
                    <div className="flex items-center gap-4">
                      <Link href={singleProject.liveurl}>
                        <ExternalLink />
                      </Link>
                    </div>
                  </div>
                  <div className="py-3 flex items-center gap-4">
                    {singleProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 border border-white/40 rounded-2xl text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/50">
                    {singleProject.description}
                  </p>

                  <div className="flex overflow-x-auto space-x-4 p-4">
                    {singleProject.projectImages.map((img, index) => (
                      <div key={singleProject.title+"-"+index} className="flex-shrink-0">
                        <Image
                          src={img.url || '/placeholder-image.jpg'}
                          alt=""
                          width={100}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
