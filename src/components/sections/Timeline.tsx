import { motion } from "framer-motion";

const milestones = [
  { year: "1939", title: "CET Founded", body: "College of Engineering Trivandrum established on 3rd July 1939 — the first engineering college in the former Travancore State. First Principal: Maj T.H. Mathewman. Initial intake: 21 students across Civil, Mechanical & Electrical branches." },
  { year: "1960", title: "Move to current campus", body: "CET shifts to its sprawling 125-acre campus in Kulathoor, Trivandrum — shaping the landscape generations of CETians would call home." },
  { year: "1976", title: "CETAA Formally Established", body: "The College of Engineering Trivandrum Alumni Association (CETAA) is registered, uniting generations of CETians under one organised, global fellowship." },
  { year: "1999", title: "Diamond Jubilee Hall Built", body: "CET celebrates its 60th anniversary (Diamond Jubilee). The iconic Diamond Jubilee Hall — a 1,000-seat auditorium — is built as a lasting monument to the occasion." },
  { year: "2010", title: "Global CETAA chapters launched", body: "CETAA expands internationally with chapters across India, the Gulf (Kuwait, UAE, Qatar, Bahrain), Australia and North America, now totalling 22 chapters worldwide." },
  { year: "2026", title: "CETAA Golden Jubilee & Hall Renovation", body: "2026 marks CETAA's 50th anniversary (Golden Jubilee). The global alumni fellowship unites to renovate and modernise the historic Diamond Jubilee Hall for future generations." },
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
            Nearly nine decades, told in <em className="not-italic text-gradient-gold font-medium">light & shadow.</em>
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
