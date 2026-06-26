import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

// Global Lenis instance so any component can stop/start smooth scroll.
let globalLenis: Lenis | null = null;
export function getLenis() { return globalLenis; }

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    globalLenis = lenis;
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
  return <>{children}</>;
}
