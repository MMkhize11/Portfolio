"use client";
import { FC } from 'react';
import { motion } from "framer-motion";
import {
  Input,
  SectionHeading,
  SlideIn,
  Textarea,
  TextReveal,
  Transition,
} from "./ui";
import { ReactNode, useState } from "react";
import { cn } from "@/utils/cn";
import { About, SocialHandle } from "@/utils/interfaces";
import Link from "next/link";
import nodemailer from 'nodemailer';
import sendEmail from "@/utils/email";
import { useForm } from 'react-hook-form';
interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}


export type FormData = {
  name: string;
  from:string;
  subject: string;
  message: string;
};



export const ContactUs = ({ email, social_handle, about }: ContactProps) => {

const [loading,setLoading] = useState<boolean>(false);
const { register, handleSubmit } = useForm<FormData>();



  function handleSendEmail(data:FormData) {
    setLoading(true)

 
    fetch('/api/email',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => response.json()).then(data=>console.log(`data returned  ${JSON.stringify(data)}`)).catch(error => console.log(`error  ${JSON.stringify(error)}`)).finally(()=>setLoading(false));

  };

  
  
  return (
    <motion.section className="relative">
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px]" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">Interested in talking,</SlideIn>{" "}
          <br /> <SlideIn>let’s do it.</SlideIn>
        </SectionHeading>
        <form onSubmit={handleSubmit(handleSendEmail)}>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Transition className="w-full">
                <Input
                  id="full-name"
                  placeholder="Full name"
                  className="border-0 border-b rounded-none"
                  {...register('name',{required:true})}
                />
              </Transition>
              <Transition className="w-full">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  className="border-0 border-b rounded-none"
                  {...register('from',{required:true})}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Input
                  id="subject"
                  {...register('subject',{required:true})}
                  placeholder="Enter the subject"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] rounded-none border-0 border-b resize-none"
                  id="message"
                  placeholder="Enter your message"
                  {...register('message',{required:true})}
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button      onClick={()=>{
                 handleSubmit(handleSendEmail)
                }}
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                >
                  <TextReveal className="uppercase">Lets Chat</TextReveal>
                </motion.button>
              </Transition>
            </div>
          </div>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-white/90">Get in touch</span>
              </Transition>
              <div className="text-2xl md:text-4xl font-bold py-2">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-white/80">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-white/80">{about.address}</div>
              </Transition>
            </div>

            <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
              {social_handle.map((social, index) =>
                social.enabled ? (
                  <Transition
                    key={social._id}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={social.url}>
                      <TextReveal>{social.platform}</TextReveal>
                    </Link>
                  </Transition>
                ) : null
              )}
            </div>
          </div>
        </div>
      </form>
      </div>
      <footer className="flex items-center justify-between md:px-8 px-2 py-4 text-sm">
        <Transition>
          <div>&copy; {new Date().getFullYear()} Mpumelelo Mkhize </div>
        </Transition>
      
      </footer>
    </motion.section>
  );
};

interface BackgroundScaleProps {
  children: ReactNode;
  className?: string;
}

export const BackgroundScale = ({
  children,
  className,
}: BackgroundScaleProps) => {
  return (
    <motion.div
      whileHover="whileHover"
      whileFocus="whileHover"
      whileTap="whileHover"
      initial="initial"
      className={cn("relative p-1 group", className)}
    >
      <motion.span
        variants={{
          initial: { scaleY: 0 },
          whileHover: { scaleY: 1 },
        }}
        className="absolute top-0 left-0 h-full w-full bg-primary -z-10 group-hover:text-black"
      />
      {children}
    </motion.div>
  );
};
