import { Metadata } from 'next';
import About from "@/components/about";
import Header from "@/components/header";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import {
  SectionHeading,
  SlideIn,
  TextReveal,
  Transition,
} from "@/components/ui";
import { ServicesBento } from "@/components/services-bento";
import { ClientLogosSection } from "@/components/logo-carousel";
import { SkillsGrid } from "@/components/skills-grid";

import { UserObject } from "@/utils/interfaces";
import Experience from "@/components/experience";
import { ContactUs } from "@/components/contact-us";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { promises as fs } from 'fs';

export const metadata: Metadata = {
  title: { absolute: 'Web & App Developer Johannesburg | Mpumelelo Mkhize – The Tech Translator' },
  description: 'Mpumelelo Mkhize, The Tech Translator — turning manual chaos into working systems: websites, apps, automations & AI for small businesses, teams & ministries. View projects, services, and client testimonials.',
  alternates: { canonical: '/' },
};

export default async function Home() {
 

  const file = await fs.readFile(process.cwd() + '/src/data/profile.json', 'utf8');
  const data = JSON.parse(file);
  
  const { user } = data as UserObject;
  if (!user) return null;
  const {
    about,
    testimonials,
    services,
    skills,
    projects,
    social_handles,
    timeline,
    email,
  } = user;

  return (
    <main className="relative">
      <Transition className="fixed md:top-8 top-6 md:left-8 left-6 z-30 hover:text-white/80 text-white/40">
        <Link href={"/"}>
          <TextReveal className="font-semibold ">The Tech Translator</TextReveal>
        </Link>
      </Transition>
      <Header social={social_handles} />
      <Hero about={about} />

      {/* ===SERVICES SECTION=== */}
      <section className="px-4 md:px-8 py-20 relative" id="services">
        <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10" />
        <SectionHeading className="md:pl-16 overflow-hidden">
          <SlideIn className="text-white/40">Here&apos;s how</SlideIn> <br />
          <SlideIn>I can help you</SlideIn>
        </SectionHeading>
        <div className="pt-10">
          <ServicesBento services={services} />
        </div>
      </section>

      {/* ===ABOUT/PROVERBS SECTION=== */}
      <About about={about} timeline={timeline} />
      <Experience timeline={timeline} />

      {/* ===SKILLS SECTION=== */}
      <SkillsGrid skills={skills} />

      {/* ===CLIENT LOGOS SECTION=== */}
      <ClientLogosSection />

      {/* ===TESTIMONIALS SECTION=== */}
      <section className="md:p-8 p-4 relative" id="testimonials">
        <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
        <SectionHeading className="md:pl-28">
          <SlideIn className="text-white/40">What clients</SlideIn> <br />
          <SlideIn className=""> say about me </SlideIn>
        </SectionHeading>
        {/* <TestimonialsProvider  data={testimonials}>
        <TestimonialSection></TestimonialSection>
        </TestimonialsProvider> */}
        <Testimonials data={testimonials} speed="normal" pauseOnHover />
        {/* <Testimonials data={testimonials} speed="normal" pauseOnHover />
        <Testimonials
          data={testimonials}
          pauseOnHover
          speed="normal"
          direction="left"
        /> */}

      </section>

      {/* ===PROJECTS SECTION=== */}
      <Projects data={projects} />

      {/* ===CONTACT US=== */}
      <div
        className="rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden"
        id="contact"
      >
        <ContactUs email={email} about={about} social_handle={social_handles} />
      </div>
    </main>
  );
}