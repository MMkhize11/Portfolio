"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface Heading {
  id: string;
  text: string;
}

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// Chapter list (left, xl screens only) + back-to-top button (bottom right)
export function ArticleNav({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);

      // Active chapter = last heading that has reached the top of the screen
      let current: string | null = null;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) current = id;
      }
      // A short final chapter may never reach the top, so mark it once the page bottoms out
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && headings.length) current = headings[headings.length - 1].id;
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const shown = scrolled ? "opacity-100 visible" : "opacity-0 invisible";

  return (
    <>
      {headings.length > 1 && (
        <nav
          aria-label="Chapters"
          className={`hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 w-56 z-40 transition-[opacity,visibility] duration-300 ${shown}`}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">
            Chapters
          </p>
          <ol className="border-l border-white/10 max-h-[70vh] overflow-y-auto">
            {headings.map(({ id, text }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => goTo(e, id)}
                  aria-current={active === id ? "location" : undefined}
                  className={`block -ml-px border-l-2 pl-4 py-1.5 text-sm leading-snug transition-colors ${
                    active === id
                      ? "border-orange-500 text-white"
                      : "border-transparent text-white/50 hover:text-white/80"
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 ${shown} ${
          scrolled ? "translate-y-0" : "translate-y-4"
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
