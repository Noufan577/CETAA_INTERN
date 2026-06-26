import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import ev1 from "@/assets/Screenshot 2026-06-26 234252.png";
import ev2 from "@/assets/Screenshot 2026-06-26 234308.png";
import ev3 from "@/assets/Screenshot 2026-06-26 234324.png";
import ev4 from "@/assets/Screenshot 2026-06-26 234439.png";
import ev5 from "@/assets/Screenshot 2026-06-26 234455.png";
import ev6 from "@/assets/image.png";
import ev7 from "@/assets/image copy.png";

const events = [
  {
    num: "01",
    title: "CETAA Day 2023",
    year: "2023",
    date: "22 July 2023",
    place: "Diamond Jubilee Hall, CET",
    tag: "Annual Meet",
    img: ev1,
    desc: "Annual alumni get-together celebrating 84 years of CET, honouring Silver (1998) and Golden (1973) Jubilee batches.",
  },
  {
    num: "02",
    title: "Swaralahari Relay Singing",
    year: "2022",
    date: "26 February 2022",
    place: "Galaxy Hall, Trivandrum",
    tag: "Cultural",
    img: ev2,
    desc: "Official Guinness World Records attempt — Most People in an Online Singing Video Relay, featuring ~300 CET alumni singers.",
  },
  {
    num: "03",
    title: "Annual General Body Meeting",
    year: "2024",
    date: "25 May 2024",
    place: "CETAA Hall, CET Campus",
    tag: "Governance",
    img: ev3,
    desc: "Election of the new Executive Committee and presentation of the 2023-24 annual report and accounts.",
  },
  {
    num: "04",
    title: "CETAA Award Nite 2021",
    year: "2021",
    date: "25 September 2021",
    place: "Online (Zoom)",
    tag: "Awards",
    img: ev4,
    desc: "The grand night honouring CET's most outstanding achievers across industries and geographies worldwide.",
  },
  {
    num: "05",
    title: "CETAA Guruvandanam 2021",
    year: "2021",
    date: "5 September 2021",
    place: "Online (Zoom)",
    tag: "Teachers' Day",
    img: ev5,
    desc: "A heartfelt tribute to teachers, with Guest of Honour Dr. Devdas Menon, Professor at IIT Madras.",
  },
  {
    num: "06",
    title: "CETAA Day 2022",
    year: "2022",
    date: "23 July 2022",
    place: "Diamond Jubilee Hall, CET",
    tag: "Annual Meet",
    img: ev6,
    desc: "Annual alumni get-together celebrating 83 years of CET (1939–2022), honouring Golden Jubilee (1972) batch and GWR certificate distribution.",
  },
  {
    num: "07",
    title: "HVAC Finishing Program 2020",
    year: "2020",
    date: "15 October 2020",
    place: "Online (Zoom)",
    tag: "Technical",
    img: ev7,
    desc: "18-module deep dive into Heating, Ventilation, Air-conditioning & Refrigeration for Mechanical Engineering students of CET, in association with Voltas.",
  },
];

export function PreviousEvents() {
  const [active, setActive]   = useState(2);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [inSection, setInSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ── Custom cursor ring ── */
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  /* ── Nav ── */
  const prev = useCallback(() => setActive((a) => (a - 1 + events.length) % events.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % events.length), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) { if (e.key === "Escape") setLightbox(null); return; }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, lightbox]);

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* ──────────────── LIGHTBOX ──────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightbox(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />

            {/* Poster */}
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative z-10 flex max-h-[90vh] max-w-[520px] w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Event poster — full size, no overlay */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-gold/40 shadow-[0_60px_160px_-20px_rgba(0,0,0,0.95)]">
                <img
                  src={events[lightbox].img}
                  alt={events[lightbox].title}
                  className="w-full object-contain"
                  style={{ maxHeight: "78vh" }}
                />
                {/* Thin gold rim */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/30" />
              </div>

              {/* Caption bar */}
              <div className="mt-4 flex w-full items-center justify-between rounded-xl border border-gold/20 bg-navy-deep/80 px-5 py-3 backdrop-blur">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-gold">{events[lightbox].tag} · {events[lightbox].date}</div>
                  <div className="mt-0.5 font-display text-base text-ivory">{events[lightbox].title}</div>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-ivory/20 text-ivory/60 transition-colors hover:border-gold hover:text-gold text-sm"
                  aria-label="Close"
                >✕</button>
              </div>

              {/* Prev / Next inside lightbox */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setLightbox((l) => ((l! - 1 + events.length) % events.length))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 bg-navy-deep/70 text-ivory transition-colors hover:border-gold hover:text-gold"
                >←</button>
                <span className="flex items-center text-[10px] tracking-[0.3em] text-ivory/40 uppercase">{events[lightbox].num} / 05</span>
                <button
                  onClick={() => setLightbox((l) => ((l! + 1) % events.length))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 bg-navy-deep/70 text-ivory transition-colors hover:border-gold hover:text-gold"
                >→</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────── SECTION ──────────────── */}
      <section
        id="events"
        className="relative overflow-hidden bg-background py-28 md:py-36"
        onMouseEnter={() => setInSection(true)}
        onMouseLeave={() => setInSection(false)}
      >
        {/* Cursor ring */}
        <motion.div
          style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: inSection && lightbox === null ? 1 : 0, scale: inSection ? 1 : 0.4 }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          className="pointer-events-none fixed left-0 top-0 z-[999] h-16 w-16 rounded-full border-2 border-gold mix-blend-difference"
        />
        <motion.div
          style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: inSection && lightbox === null ? 1 : 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          className="pointer-events-none fixed left-0 top-0 z-[999] h-2.5 w-2.5 rounded-full bg-gold"
        />

        {/* Top rule */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Header */}
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-12 bg-gold" />
            Previous Events
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
              A gallery of{" "}
              <em className="not-italic text-gradient-gold font-medium">gatherings</em>,
              <br className="hidden md:block" /> frozen in time.
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground sm:text-right">
              Click any card to view the full event poster. Use ← → to navigate.
            </p>
          </div>
        </div>

        {/* ── Fan carousel ── */}
        <div className={`relative mt-16 flex items-center justify-center ${isMobile ? "h-[520px]" : "h-[680px]"}`}>
          {events.map((e, i) => {
            const offset   = i - active;
            const abs      = Math.abs(offset);
            const rotDeg   = offset * (isMobile ? 6 : 11);
            const tx       = offset * (isMobile ? 120 : 260);
            const ty       = abs * (isMobile ? 25 : 50);
            const scale    = Math.max(isMobile ? 0.75 : 0.70, 1 - abs * 0.09);
            const opacity  = Math.max(isMobile ? 0.2 : 0.50, 1 - abs * (isMobile ? 0.35 : 0.18));
            const zIndex   = 30 - abs * 5;
            const isActive = offset === 0;

            return (
              <motion.div
                key={e.title}
                style={{ zIndex, willChange: "transform" }}
                animate={{ rotate: rotDeg, x: tx, y: ty, scale, opacity }}
                transition={{
                  duration: 0.85,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={!isActive ? { y: ty - 20 } : {}}
                onClick={() => isActive ? setLightbox(i) : setActive(i)}
                className="absolute cursor-pointer"
                title={isActive ? "Click to view full poster" : `View ${e.title}`}
              >
                {/* Ambient glow */}
                {isActive && (
                  <div className="pointer-events-none absolute -inset-10 -z-10 rounded-3xl bg-gold/18 blur-3xl" />
                )}

                {/* ── Card ── */}
                <div
                  className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isMobile ? "h-[460px] w-[310px]" : "h-[580px] w-[380px]"
                  } ${
                    isActive
                      ? "border-gold/55 shadow-[0_50px_120px_-15px_rgba(0,0,0,0.9)]"
                      : "border-white/8 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)]"
                  }`}
                >
                  {/* Poster */}
                  <img
                    src={e.img}
                    alt={e.title}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04040e] via-[#04040e]/55 to-[#04040e]/5" />

                  {/* Top row */}
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-7">
                    <div className="font-display text-[4.5rem] font-bold leading-none tracking-tight text-ivory/55">
                      {e.num}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="rounded-full border border-ivory/20 bg-navy-deep/50 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-ivory/70 backdrop-blur">
                        {e.tag}
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-gold backdrop-blur"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                          Tap to open
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold">
                      <span className="h-px w-6 bg-gold/60" />
                      {e.date}
                    </div>
                    <h3 className="font-display text-[1.6rem] font-medium leading-tight text-ivory">
                      {e.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-ivory/50">
                      <span>📍</span>
                      {e.place}
                    </div>

                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 30, delay: isActive ? 0.1 : 0 }}
                      className="mt-3 overflow-hidden text-sm leading-[1.7] text-ivory/45"
                    >
                      {e.desc}
                    </motion.p>

                    <motion.div
                      animate={{ width: isActive ? 64 : 20 }}
                      transition={{ type: "spring", stiffness: 320, damping: 36 }}
                      className="mt-5 h-[1.5px] rounded-full bg-gradient-to-r from-gold to-gold/20"
                    />
                  </div>

                  {/* Gold rim */}
                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/35" />
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Nav buttons */}
          <button onClick={prev} className={`absolute z-40 grid place-items-center rounded-full border border-ivory/25 bg-navy-deep/70 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold ${isMobile ? "left-2 h-10 w-10 p-2 text-base" : "left-4 lg:left-10 h-13 w-13 p-3 text-lg"}`} aria-label="Previous">←</button>
          <button onClick={next} className={`absolute z-40 grid place-items-center rounded-full border border-ivory/25 bg-navy-deep/70 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold ${isMobile ? "right-2 h-10 w-10 p-2 text-base" : "right-4 lg:right-10 h-13 w-13 p-3 text-lg"}`} aria-label="Next">→</button>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to event ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === active ? "h-2 w-9 bg-gold" : "h-2 w-2 bg-ivory/25 hover:bg-ivory/50"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
