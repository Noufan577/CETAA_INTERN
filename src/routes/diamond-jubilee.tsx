import { createFileRoute } from "@tanstack/react-router";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import { getLenis } from "@/components/SmoothScroll";
import { Footer } from "@/components/sections/Footer";
import djHall from "@/assets/doamond-jubilee-hall-1.jpg";
import djPanoramic from "@/assets/diamond-jubilee-hall-panamoodu-lane-thiruvananthapuram-auditoriums-worJzusokj.jpg";
import djGate from "@/assets/images (1).jpg";
import djInside from "@/assets/doamond-jubilee-hall-inside.jpg";

export const Route = createFileRoute("/diamond-jubilee")({
  head: () => ({
    meta: [
      { title: "Diamond Jubilee Hall Renovation — CET Alumni Association" },
      { name: "description", content: "Honouring our legacy. Building a modern space for future generations. Join the CET alumni community in renovating the Diamond Jubilee Hall." },
      { property: "og:title", content: "Diamond Jubilee Hall Renovation · CETAA" },
      { property: "og:description", content: "Be part of CET's next chapter. Every contribution strengthens the legacy of CET." },
      { property: "og:image", content: djHall },
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
      <Contribute />
      <Gallery />
      <GlowingFinale />
      <Footer />
    </main>
  );
}

function JubileeHero() {
  const ref = useRef<HTMLDivElement>(null);

  // Progress 0 (b&w) → 1 (full colour), driven by hijacked wheel/touch
  const rawProgress = useMotionValue(0);
  const progress    = useSpring(rawProgress, { stiffness: 45, damping: 16 });

  // Background image filter
  const grayscale  = useTransform(progress, [0, 1], [1,    0   ]);
  const saturation = useTransform(progress, [0, 1], [0,    1.15]);
  const blurPx     = useTransform(progress, [0, 0.4, 1], [5, 1.5, 0]);
  const scale      = useTransform(progress, [0, 1], [1.08, 1.18]);
  const filter     = useTransform(
    [grayscale, saturation, blurPx],
    ([g, s, b]: number[]) => `grayscale(${g}) saturate(${s}) blur(${b}px)`
  );
  const goldOp   = useTransform(progress, [0.4, 1], [0, 0.5]);
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Scroll-lock refs
  const lockedRef = useRef(false);
  const doneRef   = useRef(false);

  const lockScroll = useCallback(() => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    doneRef.current   = true;
    getLenis()?.start();
    document.body.style.overflow = "";
  }, []);

  // Lock immediately when page loads (wait for Lenis to init)
  useEffect(() => {
    const t = setTimeout(() => lockScroll(), 600);
    return () => {
      clearTimeout(t);
      unlockScroll(); // safety on unmount
    };
  }, [lockScroll, unlockScroll]);

  // Wheel & touch hijack
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (doneRef.current) return; // colour done – let page scroll freely
      e.preventDefault();
      e.stopPropagation();
      const next = Math.min(1, Math.max(0, rawProgress.get() + e.deltaY / 480));
      rawProgress.set(next);
      if (next >= 1) setTimeout(unlockScroll, 550);
    };

    let ty = 0;
    const handleTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const handleTouchMove  = (e: TouchEvent) => {
      if (doneRef.current) return;
      e.preventDefault();
      const dy   = ty - e.touches[0].clientY;
      ty         = e.touches[0].clientY;
      const next = Math.min(1, Math.max(0, rawProgress.get() + dy / 250));
      rawProgress.set(next);
      if (next >= 1) setTimeout(unlockScroll, 550);
    };

    window.addEventListener("wheel",      handleWheel,      { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true  });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    return () => {
      window.removeEventListener("wheel",      handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove",  handleTouchMove);
    };
  }, [rawProgress, unlockScroll]);

  return (
    <section ref={ref} className="relative h-screen">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image – starts b&w, colours in as you scroll */}
        <motion.div style={{ filter, scale }} className="absolute inset-0">
          <img src={djHall} alt="Diamond Jubilee Hall" className="h-full w-full object-cover" />
        </motion.div>

        {/* Gold overlay appears once colour fills in */}
        <motion.div
          style={{ opacity: goldOp }}
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy-deep/40" />

        {/* Hero text */}
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

        {/* Gold colour-progress bar along the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ivory/10">
          <motion.div
            style={{ width: barWidth }}
            className="h-full bg-gradient-to-r from-gold via-gold-soft to-gold"
          />
        </div>

        {/* Scroll-to-colourise hint */}
        <motion.div
          style={{ opacity: useTransform(progress, [0, 0.12], [1, 0]) }}
          className="absolute inset-x-0 bottom-10 flex justify-center text-[10px] uppercase tracking-[0.4em] text-ivory/70"
        >
          <span className="animate-bounce mr-2">↓</span> Scroll to colourise
        </motion.div>
      </div>
    </section>
  );
}


function TransformationStory() {
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* Image */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-elegant"
          >
            <img
              src={djPanoramic}
              alt="Diamond Jubilee Hall – Then to Now"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute -bottom-4 -right-4 rounded-sm border border-gold bg-navy-deep px-5 py-3 font-display text-sm text-gold">
            Then → Now
          </div>
        </div>

        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold"
          >
            <span className="h-px w-12 bg-gold" />
            The Transformation Story
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl"
          >
            From a beloved hall, to a{" "}
            <em className="not-italic text-gradient-gold font-medium">modern stage</em>{" "}
            for the next 87 years.
          </motion.h2>
          <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/80">
            {[
              { k: "01 · Present", v: "The Diamond Jubilee Hall has hosted convocations, cultural nights and generations of CETian milestones — but time and use have worn its fabric." },
              { k: "02 · Vision",  v: "A full sensitive restoration: acoustic redesign, central air-conditioning, modern lighting and stagecraft, while honouring the hall's architectural identity." },
              { k: "03 · Outcome", v: "A versatile, climate-controlled auditorium — equally suited to lectures, performances and the next Diamond Jubilee homecoming." },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
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
  { src: djHall,      span: "md:col-span-2 md:row-span-2", alt: "Diamond Jubilee Auditorium – Front Elevation" },
  { src: djGate,      span: "",                            alt: "Diamond Jubilee Auditorium – Main Gate" },
  { src: djInside,    span: "md:col-span-2",               alt: "Auditorium Stage & Interior – Seating" },
  { src: djPanoramic, span: "",                            alt: "Side Elevation – Entrance Portico" },
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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
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
            The Diamond Jubilee Hall belongs to every CETian. Your contribution directly shapes the venue where the next
            generation will graduate, perform and gather. Every pledge, big or small, helps us build for the future.
          </motion.p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              id="contribute-btn"
              onClick={() => setModalOpen(true)}
              className="magnetic-btn magnetic-btn-after group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-deep"
            >
              Contribute Now
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full border border-ivory/40 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-gold hover:bg-gold/10"
            >
              Contact the Team
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Diamond Jubilee Hall Renovation", url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="rounded-full border border-ivory/40 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:border-gold hover:bg-gold/10"
            >
              Share Campaign
            </button>
          </div>
        </div>
      </section>

      {/* Contact / Contribute Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-gold/30 bg-[oklch(0.12_0.04_260)] p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] sm:p-10"
          >
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-ivory/20 text-ivory/60 transition-colors hover:border-gold hover:text-gold text-sm"
              aria-label="Close"
            >✕</button>

            {/* Gold rule */}
            <div className="mb-6 h-px w-12 bg-gradient-to-r from-gold to-gold-soft" />

            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Get in Touch</div>
            <h3 className="mt-2 font-display text-3xl text-ivory md:text-4xl">
              Contact the <em className="not-italic text-gradient-gold">Alumni Team</em>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/65">
              To make a contribution, discuss batch pledges, or learn more about the renovation
              campaign, reach out to the CET Alumni Association directly.
            </p>

            {/* Contact cards */}
            <div className="mt-8 space-y-4">
              {/* Email */}
              <a
                href="mailto:cetaa@keralaalumni.in"
                className="group flex items-start gap-4 rounded-sm border border-ivory/10 bg-ivory/5 p-5 transition-all duration-400 hover:border-gold/50 hover:bg-gold/10"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-navy-deep text-gold text-lg">✉</div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-ivory/50">Email</div>
                  <div className="mt-0.5 font-medium text-ivory group-hover:text-gold transition-colors">cetaa@keralaalumni.in</div>
                  <div className="mt-1 text-xs text-ivory/40">For contributions, pledges & enquiries</div>
                </div>
              </a>

              {/* Alternate email */}
              <a
                href="mailto:alumni@cet.ac.in"
                className="group flex items-start gap-4 rounded-sm border border-ivory/10 bg-ivory/5 p-5 transition-all duration-400 hover:border-gold/50 hover:bg-gold/10"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-navy-deep text-gold text-lg">✉</div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-ivory/50">Alternate Email</div>
                  <div className="mt-0.5 font-medium text-ivory group-hover:text-gold transition-colors">alumni@cet.ac.in</div>
                  <div className="mt-1 text-xs text-ivory/40">CET Alumni Office, Thiruvananthapuram</div>
                </div>
              </a>
            </div>

            {/* Primary CTA */}
            <a
              href="mailto:cetaa@keralaalumni.in?subject=Diamond%20Jubilee%20Hall%20Renovation%20%E2%80%94%20Contribution%20Enquiry"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Send a Message
              <span>→</span>
            </a>

            <p className="mt-5 text-center text-[10px] text-ivory/35 uppercase tracking-[0.2em]">
              College of Engineering Trivandrum · Est. 1939
            </p>
          </motion.div>
        </div>
      )}
    </>
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
