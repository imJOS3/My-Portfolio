import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FAQS } from "../data/faqs";

const Faqs = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="relative min-h-screen themed-text-primary px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 18% 12%, rgba(34,211,238,0.32), transparent 48%), radial-gradient(ellipse at 88% 8%, rgba(168,85,247,0.38), transparent 42%), radial-gradient(ellipse at 50% 100%, rgba(217,70,239,0.28), transparent 52%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <header className="mb-8 flex items-start justify-between gap-4">
          <Link
            to="/"
            className="hobby-back-link text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            ← Back
          </Link>
          <div className="min-w-0 text-center flex-1">
            <p className="section-kicker mb-2">For recruiters</p>
            <h1 className="themed-headline text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Frequently asked questions
            </h1>
            <p className="mt-2 text-sm themed-text-secondary">
              Age, availability, languages, and the rest of the first-call checklist.
            </p>
          </div>
          <span className="w-12 sm:w-14" aria-hidden />
        </header>

        <ul className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <li key={faq.id} className="themed-surface rounded-2xl overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left flex items-center justify-between gap-3 p-4 sm:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-sm sm:text-base font-semibold themed-text-primary pr-1">
                    {faq.question}
                  </span>
                  <FaChevronRight
                    className={`flex-shrink-0 size-4 sm:size-5 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-90 themed-text-label"
                        : "themed-text-muted"
                    }`}
                  />
                </button>
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed themed-text-secondary">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-xs sm:text-sm themed-text-muted">
          Something else?{" "}
          <Link
            to="/#contact"
            className="themed-text-label underline-offset-2 hover:underline"
          >
            Contact me directly
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Faqs;
