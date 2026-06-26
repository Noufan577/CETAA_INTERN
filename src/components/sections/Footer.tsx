import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-ivory">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="absolute block h-1 w-1 rounded-full bg-gold/60"
            style={{ left: `${(i * 53) % 100}%`, animation: `float-up ${12 + (i % 5)}s linear ${(i * 0.7) % 10}s infinite` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10">
        {/* Top: Branding + description */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/60">
              <span className="font-display text-sm font-bold text-gold">CETAA</span>
            </div>
            <div>
              <div className="font-display text-lg">CETAA</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">College of Engineering Trivandrum Alumni Association</div>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-ivory/60">
            A global fellowship of 50,000+ CETians across 22 chapters worldwide.
            CETAA (est. 1976) — celebrating legacy, building the future.
          </p>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-ivory/10" />

        {/* Bottom: horizontal nav + socials */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Horizontal explore links */}
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold mr-2">Explore</div>
            {[
              { label: "Home", to: "/" },
              { label: "About CET", to: "/", hash: "about" },
              { label: "Legacy", to: "/", hash: "legacy" },
              { label: "Events", to: "/", hash: "events" },
              { label: "Diamond Jubilee Hall", to: "/diamond-jubilee" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className="text-sm text-ivory/75 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/school/college-of-engineering-trivandrum" },
              { label: "Instagram", href: "#" },
              { label: "Facebook", href: "https://www.facebook.com/College-of-Engineering-Trivandrum-Alumni-Association-595120010597674" },
              { label: "YouTube", href: "https://www.youtube.com/channel/UCJI_IdamgOdlw8ZcyDpQeRg" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.3em] text-ivory/50 transition-colors hover:text-gold">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-ivory/10 pt-6 text-xs text-ivory/35">
          © {new Date().getFullYear()} CETAA · College of Engineering Trivandrum Alumni Association · Thiruvananthapuram 695016
        </div>
      </div>
    </footer>
  );
}
