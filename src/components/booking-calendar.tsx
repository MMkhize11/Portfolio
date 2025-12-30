"use client";

import { Calendar, Clock, Video, ArrowRight } from "lucide-react";

interface BookingCalendarProps {
  calendarUrl?: string;
}

export const BookingCalendar = ({
  // Replace with your actual Cal.com or Calendly link
  // calendarUrl = "https://cal.com/khabazela/discovery",
  calendarUrl = "https://cal.com/mpumelelo-mkhize/15min",
}: BookingCalendarProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-600/10 to-primary/10 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-4">
          <Calendar size={32} className="text-primary" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Book a Free Discovery Call
        </h3>

        <p className="text-white/60 mb-6 max-w-md mx-auto">
          Let&apos;s discuss your project in a quick 15-minute call. No pressure, just a conversation about your goals.
        </p>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 text-sm text-white/50">
          <div className="flex items-center justify-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>15 minutes</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Video size={16} className="text-primary" />
            <span>Google Meet / Zoom</span>
          </div>
        </div>

        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors text-lg"
        >
          Schedule a call
          <ArrowRight size={20} />
        </a>

        <p className="text-white/40 text-sm mt-4">
          Pick a time that works for you
        </p>
      </div>
    </div>
  );
};

// Compact version for use alongside the contact form
export const BookingCalendarCompact = ({
  calendarUrl = "https://cal.com/khabazela/discovery",
}: BookingCalendarProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 border border-white/10 rounded-xl bg-white/5">
      <div className="p-3 bg-primary/20 rounded-full mb-3">
        <Calendar size={24} className="text-primary" />
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">
        Prefer to talk?
      </h4>
      <p className="text-white/50 text-sm mb-4">
        Book a free 15-min discovery call
      </p>
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-black transition-colors text-sm"
      >
        Book a call
        <ArrowRight size={16} />
      </a>
    </div>
  );
};
