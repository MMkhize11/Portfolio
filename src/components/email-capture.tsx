"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

interface EmailCaptureProps {
  variant?: "blog" | "inline";
  title?: string;
  description?: string;
}

export const EmailCapture = ({
  variant = "blog",
  title = "Stay in the loop",
  description = "Get notified when I publish new case studies and insights on building successful tech solutions.",
}: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks for subscribing! You'll hear from me soon.");
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (variant === "inline") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle size={20} />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
              <ArrowRight size={18} />
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-2">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600/10 to-primary/10 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-500/20 rounded-full shrink-0">
          <Mail size={24} className="text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-white/60 mb-6">
            {description}
          </p>

          {status === "success" ? (
            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle size={24} className="text-green-400" />
              <span className="text-green-400">{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/40"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {status === "loading" ? "Subscribing..." : "Get updates"}
                  <ArrowRight size={18} />
                </button>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">{message}</p>
              )}
              <p className="text-white/40 text-sm">
                No spam, unsubscribe anytime. Typically 1-2 emails per month.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
