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
import { BookingCalendar } from "./booking-calendar";
interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}


export type FormData = {
  name: string;
  from: string;
  phone?: string;
  company: string;
  projectType: string;
  timeline: string;
  subject: string;
  message: string;
  referralSource?: string;
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
          <br /> <SlideIn>let&apos;s Chat</SlideIn>
        </SectionHeading>
        
        <div className="mt-12 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-3 glass p-6 md:p-8 rounded-xl">
              <form onSubmit={handleSubmit(handleSendEmail)} className="space-y-6">
                {/* Section 1: About You */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white/80 border-b border-white/10 pb-2">About You</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-1">
                      Company / Organization <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("company", { required: true })}
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                      placeholder="Your company name"
                    />
                    {errors.company && <span className="text-red-500 text-sm">Company is required</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                      Phone Number <span className="text-white/40">(optional)</span>
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                      placeholder="+27 XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: About Your Project */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white/80 border-b border-white/10 pb-2">About Your Project</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-white/90 mb-1">
                      Project Type <span className="text-primary">*</span>
                    </label>
                    <select
                      {...register("projectType", { required: true })}
                      id="projectType"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                    >
                      <option value="" className="bg-gray-900">Select type...</option>
                      <option value="app-development" className="bg-gray-900">App Development</option>
                      <option value="web-app" className="bg-gray-900">Web App Development</option>
                      <option value="ai-integration" className="bg-gray-900">AI Integration</option>
                      <option value="automation" className="bg-gray-900">Automation</option>
                      <option value="chatbot" className="bg-gray-900">Chatbot / WhatsApp Bot</option>
                      <option value="consulting" className="bg-gray-900">Consulting / Advisory</option>
                      <option value="other" className="bg-gray-900">Other</option>
                    </select>
                    {errors.projectType && <span className="text-red-500 text-sm">Please select a project type</span>}
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white/90 mb-1">
                      Timeline <span className="text-primary">*</span>
                    </label>
                    <select
                      {...register("timeline", { required: true })}
                      id="timeline"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                    >
                      <option value="" className="bg-gray-900">Select timeline...</option>
                      <option value="asap" className="bg-gray-900">ASAP (within 2 weeks)</option>
                      <option value="1-3-months" className="bg-gray-900">1-3 months</option>
                      <option value="3-6-months" className="bg-gray-900">3-6 months</option>
                      <option value="exploring" className="bg-gray-900">Just exploring</option>
                    </select>
                    {errors.timeline && <span className="text-red-500 text-sm">Please select a timeline</span>}
                  </div>
                </div>
              </div>

              {/* Section 3: Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white/80 border-b border-white/10 pb-2">Project Details</h3>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-1">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("subject", { required: true })}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                    placeholder="Brief summary of your project"
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
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                  {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
                </div>

                <div>
                  <label htmlFor="referralSource" className="block text-sm font-medium text-white/90 mb-1">
                    How did you find me? <span className="text-white/40">(optional)</span>
                  </label>
                  <select
                    {...register("referralSource")}
                    id="referralSource"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  >
                    <option value="" className="bg-gray-900">Select an option...</option>
                    <option value="linkedin" className="bg-gray-900">LinkedIn</option>
                    <option value="google" className="bg-gray-900">Google Search</option>
                    <option value="referral" className="bg-gray-900">Referral from someone</option>
                    <option value="instagram" className="bg-gray-900">Instagram</option>
                    <option value="portfolio" className="bg-gray-900">Saw my portfolio/case study</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-black font-medium py-3 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              <p className="text-center text-white/40 text-sm">
                I typically respond within 24-48 hours
              </p>
            </form>
            </div>

            {/* Right Column - Booking Calendar */}
            <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
              <BookingCalendar />
            </div>
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
