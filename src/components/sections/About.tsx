import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cetFront from "@/assets/cet-front.jpg.asset.json";
import cetArch from "@/assets/cet-arch.jpg.asset.json";

const paragraph = "Founded on 3rd July 1939, the College of Engineering Trivandrum (CET) is one of India's oldest and most distinguished engineering institutions. Its arched portico, ribbed facade and rust-yellow walls have witnessed generations of engineers walk into the world carrying the same quiet conviction — that engineering is, in the end, an act of service. The CET Alumni Association (CETAA), established in 1976, today unites over 50,000 alumni across 22 global chapters.";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const words = paragraph.split(" ");

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
        <div className="relative h-[520px] md:h-[640px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute left-0 top-0 h-[70%] w-[70%] overflow-hidden rounded-sm shadow-elegant"
          >
            <img src={cetFront.url} alt="CET main building facade" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-0 right-0 h-[55%] w-[55%] overflow-hidden rounded-sm border-2 border-ivory shadow-gold"
          >
            <img src={cetArch.url} alt="CET central arch" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <div className="absolute -bottom-6 left-6 font-display text-[8rem] leading-none text-gold/15 md:text-[12rem]">'39</div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold"
          >
            <span className="h-px w-12 bg-gold" />
            About CET
          </motion.div>

          <h2 className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
            An institution shaped by{" "}
            <em className="not-italic text-gradient-gold font-medium">nearly nine decades</em>{" "}
            of quiet excellence.
          </h2>

          <p className="mt-10 text-lg leading-relaxed text-charcoal/80">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.015 }}
                className="inline-block pr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
            {[
              { k: "1939", v: "Year founded" },
              { k: "125 acres", v: "Campus, Kulathoor" },
              { k: "8", v: "Departments" },
              { k: "50,000+", v: "CETAA alumni" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl text-navy-deep">{s.k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
