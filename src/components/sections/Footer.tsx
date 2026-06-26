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

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/60">
                <span className="font-display text-base font-bold text-gold">CET</span>
              </div>
              <div>
                <div className="font-display text-lg">CET Alumni Association</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">College of Engineering Trivandrum</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/65">
              A global fellowship of CETians — bridging eight decades of engineers, scholars and
              builders. We exist to celebrate the legacy, strengthen the present, and shape what
              CET becomes next.
            </p>
          </div>

          <FooterCol title="Explore" links={[["Home","/"],["About CET","/"],["Legacy","/"],["Events","/"]]} />
          <FooterCol title="Engage" links={[["Diamond Jubilee","/diamond-jubilee"],["Contribute","/diamond-jubilee"],["Contact",""],["Chapters",""]]} />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ivory/10 pt-8 text-xs text-ivory/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} CET Alumni Association · College of Engineering Trivandrum</div>
          <div className="flex items-center gap-6">
            {["LinkedIn","Instagram","Facebook","YouTube"].map((s) => (
              <a key={s} href="#" className="uppercase tracking-[0.3em] transition-colors hover:text-gold">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold">{title}</div>
      <ul className="space-y-3 text-sm">
        {links.map(([label, to]) => (
          <li key={label}>
            {to ? (
              <Link to={to} className="text-ivory/80 transition-colors hover:text-gold">{label}</Link>
            ) : (
              <span className="text-ivory/80">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
