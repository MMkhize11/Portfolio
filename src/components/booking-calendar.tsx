"use client";

import { useEffect } from "react";
import { Calendar, ArrowRight } from "lucide-react";

interface BookingCalendarProps {
  calLink?: string;
}

declare global {
  interface Window {
    Cal?: any;
  }
}

export const BookingCalendar = ({
  calLink = "mpumelelo-mkhize/15min",
}: BookingCalendarProps) => {
  useEffect(() => {
    // Cal.com embed initialization - must create stub before loading script
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            (api as any).q = (api as any).q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize the calendar
    window.Cal("init", "15min", { origin: "https://app.cal.com" });

    window.Cal.ns["15min"]("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: calLink,
    });

    window.Cal.ns["15min"]("ui", {
      theme: "dark",
      cssVarsPerTheme: {
        dark: {
          "cal-brand": "#c76000",
          "cal-bg": "hsl(240, 10%, 8%)",
          "cal-bg-emphasis": "hsl(240, 10%, 12%)",
          "cal-bg-subtle": "hsl(240, 10%, 10%)",
          "cal-bg-muted": "hsl(240, 10%, 6%)",
          "cal-bg-inverted": "hsl(240, 5.79%, 76.27%)",
          "cal-text": "hsl(240, 5.79%, 76.27%)",
          "cal-text-emphasis": "hsl(0, 0%, 98%)",
          "cal-text-subtle": "hsl(240, 5%, 60%)",
          "cal-text-muted": "hsl(240, 5%, 45%)",
          "cal-border": "hsl(37, 18%, 25%)",
          "cal-border-emphasis": "hsl(37, 18%, 35%)",
          "cal-border-subtle": "hsl(240, 10%, 15%)",
        },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [calLink]);

  return (
    <div className="w-full">
      {/* Cal.com Inline Embed */}
      <div
        id="my-cal-inline-15min"
        className="w-full min-h-[500px] rounded-lg overflow-hidden"
      />
    </div>
  );
};

// Compact version for use alongside the contact form
export const BookingCalendarCompact = ({
  calLink = "mpumelelo-mkhize/15min",
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
        href={`https://cal.com/${calLink}`}
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
