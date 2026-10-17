import pages from '@/data/service-pages.json';

export const SITE = 'https://www.mpumelelomkhize.com';

export interface ServicePage {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  deliverables: string[];
  caseStudies: string[];
  testimonial?: { quote: string; name: string; role: string };
  faqs?: { q: string; a: string }[];
}

export const servicePages: ServicePage[] = pages;

export const getServicePage = (slug: string) => servicePages.find((p) => p.slug === slug);

export const caseStudyTitles: Record<string, string> = {
  'Albany-ntofo-ntofo': 'Albany Ntofo Ntofo: WhatsApp competition bot',
  'FGSA-Footgolf-South-Africa': 'FootGolf South Africa: national federation platform',
  'prompt-pulse-ai-prompt-engineering': 'Prompt Pulse: AI prompt engineering platform',
  'stuurmy-home-services-marketplace': 'Stuurmy: home services marketplace app',
  'sweet-tooth': 'Sweet Tooth: website for a dessert experience brand',
  'tmeg-financial-website': 'TMEG Financial Solutions: website for township entrepreneurs',
  'value-ed-deviare-b2b-integration-apis': 'Value Ed x Deviare: B2B integration APIs',
  'value-ed-educational-app': 'Value Ed: educational community app',
  'voting-manifesto-whatsapp-chatbot': 'Voting Manifesto: WhatsApp chatbot',
};
