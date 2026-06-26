import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/60 bg-navy-deep">
            <span className="font-display text-xs font-bold text-gold">CETAA</span>
          </div>
          <div className="hidden min-w-0 sm:block">
            <div className="font-display text-base font-semibold leading-tight text-foreground">CET Alumni Association</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Est. College of Engineering Trivandrum</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/", hash: "about", label: "About" },
            { to: "/", hash: "legacy", label: "Legacy" },
            { to: "/", hash: "events", label: "Events" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:scale-x-0 after:origin-left after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          {/* Diamond Jubilee — highlighted CTA nav item */}
          <Link
            to="/diamond-jubilee"
            className="group relative inline-flex items-center gap-2 rounded-full border border-gold bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-navy-deep shadow-[0_0_16px_-4px_var(--gold)] transition-all duration-300 hover:shadow-[0_0_28px_-2px_var(--gold)] hover:scale-105"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-navy-deep animate-[shimmer_1.5s_ease-in-out_infinite]" />
            Diamond Jubilee
          </Link>
        </nav>


      </div>
    </motion.header>
  );
}
