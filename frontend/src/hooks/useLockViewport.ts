import { useEffect } from "react";

/** Lock page scroll only on desktop, matching home snap. */
export function useLockViewport() {
  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const mq = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      if (mq.matches) {
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        return;
      }
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);
}
