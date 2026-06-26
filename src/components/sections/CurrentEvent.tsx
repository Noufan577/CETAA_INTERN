import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

export function CurrentEvent() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 14 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <section className="relative overflow-hidden bg-navy-deep py-28 md:py-40">
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(80% 60% at 50% 30%, color-mix(in oklab, var(--gold) 25%, transparent), transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-5xl"
          onMouseMove={onMove}
          onMouseLeave={reset}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            className="relative overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-br from-navy to-navy-deep p-10 shadow-gold md:p-16"
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
            <motion.div
              className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-[shimmer_1.5s_ease-in-out_infinite]" />
                Happening now
              </div>

              <h3 className="font-display text-5xl leading-[1.0] text-ivory md:text-7xl">
                Diamond Jubilee <em className="not-italic text-gradient-gold font-medium">Homecoming</em>
              </h3>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/70 md:text-lg">
                A weekend of remembrance, reunion and reinvention — featuring the unveiling of
                the renovated Diamond Jubilee Hall, alumni keynotes, and a candlelight gala
                under the central arch.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ivory/10 pt-8 md:grid-cols-4">
                {[
                  { k: "Date", v: "Dec 14 — 16" },
                  { k: "Venue", v: "CET Campus" },
                  { k: "Format", v: "On-campus + Live" },
                  { k: "Audience", v: "All batches" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{s.k}</div>
                    <div className="mt-1 font-display text-lg text-ivory">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <button className="magnetic-btn magnetic-btn-after group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-navy-deep">
                  Reserve your seat
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
                <button className="rounded-full border border-ivory/30 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-ivory transition-all duration-500 hover:border-gold hover:bg-gold/10">
                  View agenda
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ParticleField() {
  const items = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => (
        <span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-gold/70"
          style={{
            left: `${(i * 37) % 100}%`,
            animation: `float-up ${10 + (i % 7)}s linear ${(i * 0.6) % 8}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
