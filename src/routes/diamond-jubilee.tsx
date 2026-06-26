import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Footer } from "@/components/sections/Footer";
import cetFront from "@/assets/cet-front.jpg.asset.json";
import cetAerial from "@/assets/cet-aerial.jpg.asset.json";
import cetArch from "@/assets/cet-arch.jpg.asset.json";
import cetPainting from "@/assets/cet-painting.png.asset.json";

export const Route = createFileRoute("/diamond-jubilee")({
  head: () => ({
    meta: [
      { title: "Diamond Jubilee Hall Renovation — CET Alumni Association" },
      { name: "description", content: "Honouring our legacy. Building a modern space for future generations. Join the CET alumni community in renovating the Diamond Jubilee Hall." },
      { property: "og:title", content: "Diamond Jubilee Hall Renovation · CETAA" },
      { property: "og:description", content: "Be part of CET's next chapter. Every contribution strengthens the legacy of CET." },
      { property: "og:image", content: cetFront.url },
    ],
  }),
  component: DiamondJubilee,
});

function DiamondJubilee() {
  return (
    <main className="overflow-x-hidden bg-background">
      <JubileeHero />
      <TransformationStory />
      <Objectives />
      <Gallery />
      <Contribute />
      <GlowingFinale />
      <Footer />
    </main>
  );
}

function JubileeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const saturate = useTransform(scrollYProgress, [0, 0.6], [0, 1.1]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [4, 0]);
  const filter = useTransform([saturate, blur], ([s, b]: number[]) => `saturate(${s}) blur(${b}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const goldOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.6]);

  return (
    <section ref={ref} className="relative h-[140vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ filter, scale }} className="absolute inset-0">
          <img src={cetFront.url} alt="Diamond Jubilee Hall" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div style={{ opacity: goldOpacity }} className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy-deep/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-3xl text-ivory"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-navy-deep/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Diamond Jubilee · Renovation Campaign
              </div>
              <h1 className="font-display text-5xl leading-[0.95] md:text-7xl lg:text-[5.5rem]">
                Diamond Jubilee <em className="not-italic text-gradient-gold font-medium">Hall</em>
                <br />Renovation.
              </h1>
              <p className="mt-8 max-w-xl font-display text-xl italic text-ivory/85 md:text-2xl">
                Honouring our legacy.<br />
                Building a modern space for future generations.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="absolute inset-x-0 bottom-10 flex justify-center text-[10px] uppercase tracking-[0.4em] text-ivory/60"
        >
          Scroll to bring it to life ↓
        </motion.div>
      </div>
    </section>
  );
}

function TransformationStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const grayscale = useTransform(scrollYProgress, [0.1, 0.55], [1, 0]);
  const overlay = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const filter = useTransform(grayscale, (g) => `grayscale(${g})`);

  return (
    <section ref={ref} className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative">
          <motion.div style={{ filter }} className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-elegant">
            <img src={cetArch.url} alt="Hall today" className="h-full w-full object-cover" />
            <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-gradient-to-t from-gold/30 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute -bottom-4 -right-4 rounded-sm border border-gold bg-navy-deep px-5 py-3 font-display text-sm text-gold">
            Then → Now
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-12 bg-gold" />
            The Transformation Story
          </div>
          <h2 className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
            From a beloved hall, to a{" "}
            <em className="not-italic text-gradient-gold font-medium">modern stage</em>{" "}
            for the next 85 years.
          </h2>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/80">
            {[
              { k: "01 · Present", v: "The Diamond Jubilee Hall has hosted convocations, cultural nights and generations of CETian milestones — but time and use have worn its fabric." },
              { k: "02 · Vision", v: "A full sensitive restoration: acoustic redesign, central air-conditioning, modern lighting and stagecraft, while honouring the hall's architectural identity." },
              { k: "03 · Outcome", v: "A versatile, climate-controlled auditorium — equally suited to lectures, performances and the next Diamond Jubilee homecoming." },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="border-l-2 border-gold/40 pl-5"
              >
                <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-gold">{s.k}</div>
                <p>{s.v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const objectives = [
  { t: "Acoustic Restoration", d: "A redesigned acoustic envelope tuned for orchestral, spoken-word and conference use." },
  { t: "Central Air-Conditioning", d: "Quiet, energy-efficient climate control suited to year-round Trivandrum events." },
  { t: "Stagecraft & Lighting", d: "Modern stage rigging, programmable lighting and visual systems for a true performance venue." },
  { t: "Ancillary Spaces", d: "Refurbished green rooms, backstage and accessible entries for performers and guests." },
  { t: "Heritage Sensitivity", d: "Material and detail choices that honour the hall's mid-century institutional character." },
  { t: "Future Readiness", d: "Networked AV, streaming and hybrid-event infrastructure for a global alumni audience." },
];

function Objectives() {
  return (
    <section className="relative bg-navy-deep py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-12 bg-gold" />
          Project Objectives
        </div>
        <h2 className="max-w-4xl font-display text-4xl leading-[1.05] md:text-6xl">
          Six commitments. One <em className="not-italic text-gradient-gold font-medium">restored</em> hall.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o, i) => (
            <motion.div
              key={o.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative bg-navy-deep p-10 transition-colors duration-500 hover:bg-navy"
            >
              <div className="font-display text-5xl text-gold/30 transition-colors duration-500 group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-8 font-display text-2xl">{o.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">{o.d}</p>

              {/* blueprint hover line */}
              <div className="absolute inset-x-10 bottom-8 h-px scale-x-0 origin-left bg-gold transition-transform duration-700 group-hover:scale-x-100" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ backgroundImage: "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(60% 60% at 50% 50%, black, transparent)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const gallery = [
  { src: cetFront.url, span: "md:col-span-2 md:row-span-2", alt: "Hall facade" },
  { src: cetArch.url, span: "", alt: "Central arch" },
  { src: cetAerial.url, span: "md:col-span-2", alt: "Aerial view" },
  { src: cetPainting.url, span: "", alt: "Artist's impression" },
];

function Gallery() {
  return (
    <section className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-12 bg-gold" />
          Gallery
        </div>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
          The hall, in <em className="not-italic text-gradient-gold font-medium">moments.</em>
        </h2>

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-sm border border-transparent transition-all duration-500 hover:border-gold ${g.span}`}
            >
              <img src={g.src} alt={g.alt} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-2 text-[10px] uppercase tracking-[0.3em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contribute() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28 text-ivory md:py-40">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--gold) 25%, transparent), transparent)" }} />
      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="font-display text-5xl leading-[1.0] md:text-7xl lg:text-8xl"
        >
          Be Part of CET's<br />
          <em className="not-italic text-gradient-gold font-medium">Next Chapter.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ivory/70 md:text-lg"
        >
          The Diamond Jubilee Hall belongs to every CETian. Your contribution — whether a personal
          gift, a batch pool, or a corporate match — directly shapes the venue where the next
          generation will graduate, perform and gather.
        </motion.p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button className="magnetic-btn magnetic-btn-after group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-deep">
            Contribute
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
          <button className="rounded-full border border-ivory/40 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-gold hover:bg-gold/10">
            Contact the team
          </button>
          <button className="rounded-full border border-ivory/40 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-gold hover:bg-gold/10">
            Share campaign
          </button>
        </div>
      </div>
    </section>
  );
}

function GlowingFinale() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="absolute block h-1 w-1 rounded-full bg-gold"
            style={{ left: `${(i * 31) % 100}%`, animation: `float-up ${8 + (i % 6)}s linear ${(i * 0.4) % 8}s infinite` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center text-ivory md:px-10">
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: "70%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto mb-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          style={{ boxShadow: "0 0 30px var(--gold)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          className="font-display text-3xl italic leading-snug text-ivory md:text-5xl"
        >
          “Every contribution strengthens the<br /><span className="text-gradient-gold not-italic font-medium">legacy of CET.</span>”
        </motion.p>
      </div>
    </section>
  );
}
