import { motion } from "framer-motion";
import cetAerial from "@/assets/cet-aerial.jpg.asset.json";
import cetArch from "@/assets/cet-arch.jpg.asset.json";
import cetFront from "@/assets/cet-front.jpg.asset.json";

const events = [
  { title: "Global Alumni Meet", year: "2023", place: "Trivandrum", tag: "Reunion" },
  { title: "Silver Jubilee Reunion '98", year: "2023", place: "CET Campus", tag: "Batch Meet" },
  { title: "CETAA Tech Conclave", year: "2022", place: "Bengaluru", tag: "Conclave" },
  { title: "Founders' Day Gala", year: "2022", place: "Trivandrum", tag: "Tradition" },
  { title: "Gulf Chapter Convention", year: "2021", place: "Dubai", tag: "Chapter" },
  { title: "Annual Endowment Lecture", year: "2021", place: "CET Campus", tag: "Lecture" },
];

const placeholders = [
  cetFront.url,
  cetArch.url,
  cetAerial.url,
  cetFront.url,
  cetArch.url,
  cetAerial.url,
];

export function PreviousEvents() {
  return (
    <section id="events" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-12 bg-gold" />
          Previous Events
        </div>
        <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
          A gallery of <em className="not-italic text-gradient-gold font-medium">gatherings</em>,
          <br className="hidden md:block" /> frozen in time.
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Moments from reunions, conclaves and chapter conventions across the years —
          carrying the CET spirit across geographies and generations.
        </p>

        <div className="mt-16 [perspective:1600px]">
          <div className="flex snap-x gap-6 overflow-x-auto pb-8 pr-6 [scrollbar-width:none] lg:overflow-visible lg:pr-0 [&::-webkit-scrollbar]:hidden">
          {events.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 34, rotateY: i % 2 ? -10 : 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: i % 2 ? -4 : 4 }}
              whileHover={{ y: -12, rotateY: 0, scale: 1.02 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative w-[78vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-sm border border-gold/20 bg-card shadow-elegant sm:w-[46vw] lg:w-[31%] lg:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
                <img
                  src={placeholders[i % placeholders.length]}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-navy-deep/5" />
                <div className="absolute left-4 top-4 h-10 w-10 border border-gold/40" />
                <div className="absolute right-4 top-4 rounded-full border border-ivory/35 bg-navy-deep/45 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ivory/90 backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
                </div>
                <div className="absolute inset-x-6 bottom-6 text-ivory">
                  <div className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
                    <span>{e.year}</span>
                    <span className="h-px w-8 bg-gold/60" />
                    <span>{e.tag}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl">{e.title}</h3>
                  <div className="mt-2 text-sm text-ivory/70">{e.place}</div>
                  <div className="mt-5 h-px w-12 bg-gold transition-all duration-500 group-hover:w-24" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/60" />
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
