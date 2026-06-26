import { motion } from "framer-motion";

const milestones = [
  { year: "1939", title: "Founded as Travancore's first engineering college", body: "Established under the vision of HH Sree Chithira Thirunal Maharaja with three foundational departments." },
  { year: "1951", title: "Affiliation with University of Kerala", body: "Graduating cohorts begin to shape India's post-independence infrastructure." },
  { year: "1971", title: "Expansion into modern disciplines", body: "Electronics, Computer Science and Industrial Engineering join the fold as the campus matures." },
  { year: "1991", title: "Alumni Association formally constituted", body: "Bringing together generations of CETians under one organised, global fellowship." },
  { year: "2010", title: "International alumni chapters launched", body: "Chapters across North America, the Gulf and Europe begin sustained engagement." },
  { year: "2024", title: "Diamond Jubilee", body: "85 years of legacy — and the launch of the Diamond Jubilee Hall renovation campaign." },
];

export function Timeline() {
  return (
    <section id="legacy" className="relative overflow-hidden bg-navy-deep py-28 text-ivory md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)", backgroundSize: "96px 96px" }} />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent md:block" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-12 bg-gold" />
            Legacy Timeline
          </div>
          <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
            Eight decades, told in <em className="not-italic text-gradient-gold font-medium">light & shadow.</em>
          </h2>
        </div>

        <div className="relative mt-20 space-y-10 md:space-y-0">
          {milestones.map((m, i) => (
            <motion.article
              key={m.year}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.75, delay: 0.04 * i, ease: [0.2, 0.8, 0.2, 1] }}
              className={`relative md:flex ${i % 2 === 0 ? "md:justify-start md:pr-[52%]" : "md:justify-end md:pl-[52%]"}`}
            >
              <div className="group relative overflow-hidden rounded-sm border border-ivory/10 bg-gradient-to-br from-navy to-navy-deep p-7 shadow-elegant md:min-h-[280px]">
                <div className="absolute -right-4 -top-5 font-display text-[6rem] leading-none text-gold/12 md:text-[7.5rem]">{m.year}</div>
                <div className={`absolute top-8 hidden h-px w-16 bg-gold/45 md:block ${i % 2 === 0 ? "-right-16" : "-left-16"}`} />
                <div className={`absolute top-[26px] hidden h-4 w-4 rotate-45 border border-gold bg-navy-deep md:block ${i % 2 === 0 ? "-right-[74px]" : "-left-[74px]"}`} />

                <div className="relative">
                  <div className="mb-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    <span>Chapter {String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-8 bg-gold/50" />
                    <span>{m.year}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight text-ivory md:text-3xl">{m.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-ivory/65">{m.body}</p>
                  <div className="mt-8 h-px w-12 bg-gold transition-all duration-500 group-hover:w-28" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
