import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/", hash: "about", label: "About" },
    { to: "/", hash: "legacy", label: "Legacy" },
    { to: "/", hash: "events", label: "Events" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || mobileMenuOpen ? "bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-sm" : "bg-transparent"
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

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
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

        {/* Mobile Hamburger Button */}
        <button
          className="p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col justify-center items-center h-5 w-6 space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-background/95 backdrop-blur-xl lg:hidden border-b border-border/60"
          >
            <nav className="flex flex-col px-6 py-4 pb-8">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 text-base font-medium text-foreground/80 transition-colors hover:text-gold border-b border-border/40"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/diamond-jubilee"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 flex w-full justify-center gap-2 rounded-full border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-navy-deep shadow-md"
              >
                Diamond Jubilee
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
