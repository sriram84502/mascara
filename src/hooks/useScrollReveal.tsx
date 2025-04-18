
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that triggers a CSS animation when the element scrolls into view.
 * @param {string} animation The Tailwind/animate.css CSS class to apply, e.g., "animate-fade-in-up".
 * @param {number} [delay=0] Optional delay before the animation triggers.
 * @returns {[React.RefObject<any>, string]} Returns a ref and a className string.
 */
export function useScrollReveal(animation: string, delay: number = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;
    function revealOnScroll(entries: IntersectionObserverEntry[]) {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setTimeout(() => setRevealed(true), delay);
      }
    }

    const observer = new window.IntersectionObserver(revealOnScroll, {
      threshold: 0.15
    });
    observer.observe(node);

    return () => observer.unobserve(node);
  }, [delay]);

  return [ref, revealed ? animation : "opacity-0 translate-y-5"] as const;
}
