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
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  function handleSendEmail(data: FormData) {
    setLoading(true);
    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(`data returned ${JSON.stringify(data)}`))
      .catch(error => console.log(`error ${JSON.stringify(error)}`))
      .finally(() => setLoading(false));
  };

  return (
    <motion.section className="relative">
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px]" />
      <div className="w-full flex flex-col items-center p-4 md:p-8 md:px-16">
        <SectionHeading className="text-center w-full">
          <SlideIn className="text-white/40">Interested in Collaborating,</SlideIn>{" "}
          <br /> <SlideIn>let's Chat</SlideIn>
        </SectionHeading>
        
        <div className="flex justify-center mt-12 w-full">
          <div className="glass p-6 rounded-xl w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit(handleSendEmail)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
              </div>

              <div>
                <label htmlFor="from" className="block text-sm font-medium text-white/90 mb-1">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  {...register("from", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  id="from"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="john.doe@example.com"
                />
                {errors.from && <span className="text-red-500 text-sm">Valid email is required</span>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-1">
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  {...register("subject", { required: true })}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="What's this about?"
                />
                {errors.subject && <span className="text-red-500 text-sm">Subject is required</span>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  {...register("message", { required: true })}
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-black font-medium py-3 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
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
