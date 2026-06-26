import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import entranceVideo from "@/assets/entrance-full.mp4.asset.json";
import entranceFinalFrame from "@/assets/entrance-final.jpg.asset.json";

const headline = ["CET", "Alumni", "Association"];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFinalFrame, setShowFinalFrame] = useState(false);

  const handlePlay = () => {
    setShowFinalFrame(false);
    const v = videoRef.current;
    if (!v) return;
    v.loop = false;
  };

  const handleEnded = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      v.loop = false;
      if (Number.isFinite(v.duration)) v.currentTime = Math.max(0, v.duration - 0.08);
      setShowFinalFrame(true);
    } catch {}
  };


  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28 pb-16">
      {/* decorative grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(var(--charcoal) 1px, transparent 1px), linear-gradient(90deg, var(--charcoal) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
      />
      <div className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-navy/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Painting */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-gold/30 bg-navy-deep/40 shadow-elegant md:aspect-[3/4]">
              <video
                ref={videoRef}
                src={entranceVideo.url}
                autoPlay
                muted
                playsInline
                preload="auto"
                loop={false}
                poster={entranceFinalFrame.url}
                onPlay={handlePlay}
                onEnded={handleEnded}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={entranceFinalFrame.url}
                alt="College of Engineering Trivandrum name frame"
                aria-hidden={!showFinalFrame}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${showFinalFrame ? "opacity-100" : "opacity-0"}`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-navy-deep/20" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                  className="rounded-sm border border-gold/25 bg-navy-deep/45 px-5 py-4 backdrop-blur-sm"
                >
                  <div className="font-display text-[10px] uppercase tracking-[0.3em] text-gold/90">College of Engineering Trivandrum</div>
                  <div className="mt-2 h-px w-16 bg-gold/60 mx-auto" />
                  <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-ivory/75">Est. 1939 · 85 Years of Legacy</div>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 3.8, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute -bottom-3 left-0 h-px bg-gold"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-gold/60" />
            An artist's impression · CET Main Block
          </motion.div>
        </div>

        {/* Text */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-ivory px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-navy-deep"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-[shimmer_2s_ease-in-out_infinite]" />
            Diamond Jubilee · 1939 — 2024
          </motion.div>

          <h1 className="font-display text-5xl leading-[0.95] text-foreground md:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {headline.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  className="inline-block"
                >
                  {i === 1 ? <em className="not-italic text-gradient-gold font-medium">{word}</em> : word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mt-8 font-display text-xl italic text-charcoal/80 md:text-2xl"
          >
            Connecting Generations.<br />
            Celebrating Legacy.<br />
            <span className="text-gradient-gold not-italic font-medium">Building the Future.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.9 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            For over eight decades, the College of Engineering Trivandrum has shaped engineers,
            entrepreneurs and leaders who carry its quiet, formidable legacy across the world.
            The Alumni Association is the bridge that keeps that fellowship alive — across
            batches, borders and generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/"
              hash="legacy"
              className="magnetic-btn magnetic-btn-after group relative inline-flex items-center gap-3 rounded-full bg-navy-deep px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-ivory shadow-elegant"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              Explore Legacy
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/diamond-jubilee"
              className="group inline-flex items-center gap-3 rounded-full border border-navy-deep/30 bg-transparent px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-navy-deep transition-all duration-500 hover:border-gold hover:bg-gold/10"
            >
              Diamond Jubilee Hall
              <span className="text-gold transition-transform duration-500 group-hover:translate-x-1">◆</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-border/60 pt-6"
          >
            {[
              { k: "85+", v: "Years of legacy" },
              { k: "30K+", v: "Alumni worldwide" },
              { k: "60+", v: "Countries reached" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-navy-deep md:text-4xl">{s.k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
