import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/components/providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Clarity from "@/components/Clarity";
import StructuredData from "@/components/StructuredData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const description =
  "Mpumelelo Mkhize, The Tech Translator — turning manual chaos into working systems: websites, apps, automations & AI for small businesses, teams & ministries.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mpumelelomkhize.com"),
  title: {
    default:
      "Web & App Developer Johannesburg | Mpumelelo Mkhize – The Tech Translator",
    template: "%s | Mpumelelo Mkhize",
  },
  description,
  openGraph: {
    siteName: "The Tech Translator",
    locale: "en_ZA",
    type: "website",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og"],
    creator: "@mpumi_khabazela",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.className}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-YKMJBZ5M3E" />
        <Clarity projectId="utpyyc989u" />
        <StructuredData />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
