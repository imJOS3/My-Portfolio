import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import ProfileImage from "../../assets/pfpPorfolioCartoon.png";
import { attributionToEventProps, getLastAttribution } from "../../lib/attribution";

const EMAIL = "josebenjuema2005@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/573182893475?text=" +
  encodeURIComponent("Hi Jose, I saw your portfolio and wanted to get in touch.");
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello from your portfolio")}`;

const socials = [
  { id: "github-link", href: "https://github.com/imJOS3", icon: FaGithub, label: "GitHub" },
  { id: "linkedin-link", href: "https://www.linkedin.com/in/jose-benjumea-5167b8271/", icon: FaLinkedin, label: "LinkedIn" },
  { id: "instagram-link", href: "https://instagram.com/injo.se", icon: FaInstagram, label: "Instagram" },
  { id: "facebook-link", href: "https://www.facebook.com/josenakgamer", icon: FaFacebook, label: "Facebook" },
];

const trackContact = (buttonName: string) => {
  window.dataLayer?.push({
    event: "contact_button_click",
    button_name: buttonName,
    page_section: "Contact Section",
    ...attributionToEventProps(getLastAttribution()),
  });
};

const Contact = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="flex h-full w-full items-center justify-center px-1">
      <article className="contact-card grid w-full max-w-4xl items-center gap-6 p-5 sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:p-10">
        <img
          src={ProfileImage}
          alt="Jose Benjumea"
          className="h-36 w-36 justify-self-center object-contain sm:h-44 sm:w-44"
        />

        <div>
          <p className="section-kicker">06 — Contact</p>
          <h2 className="themed-accent-text mt-1 text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-tight">
            Let's talk
          </h2>
          <p className="mt-2 max-w-md text-sm themed-text-secondary">
            Open to internships and junior roles. Bogotá D.C, Colombia.
          </p>

          <div className="mt-5 space-y-1.5 text-sm">
            <a
              href={MAILTO}
              className="block themed-text-primary hover:underline"
            >
              {EMAIL}
            </a>
            <a href="tel:+573182893475" className="block themed-text-secondary hover:underline">
              +57 318 289 3475
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div ref={menuRef} className="relative">
              {open ? (
                <div className="flex overflow-hidden rounded-xl border border-[var(--surface-border)]">
                  <a
                    id="contact-email"
                    href={MAILTO}
                    className="themed-btn-gradient inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
                    onClick={() => trackContact("Write me — Email")}
                  >
                    <FaEnvelope />
                    Email
                  </a>
                  <a
                    id="contact-whatsapp"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[var(--surface-solid)] px-4 py-2.5 text-sm font-bold themed-text-primary transition hover:text-[var(--accent-cyan)]"
                    onClick={() => trackContact("Write me — WhatsApp")}
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </a>
                </div>
              ) : (
                <button
                  id="contact-btn"
                  type="button"
                  className="themed-btn-gradient rounded-xl px-5 py-2.5 text-sm font-bold"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => {
                    trackContact("Write me");
                    setOpen(true);
                  }}
                >
                  Write me
                </button>
              )}
            </div>
            <div className="flex gap-3">
              {socials.map(({ id, href, icon: Icon, label }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-lg themed-text-muted transition hover:text-[var(--accent-cyan)]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Contact;
