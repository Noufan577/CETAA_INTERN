import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 86, suffix: "yrs", label: "CET legacy since 1939" },
  { value: 50000, suffix: "+", label: "CETAA alumni worldwide" },
  { value: 22, suffix: "", label: "Global CETAA chapters" },
  { value: 250, suffix: "+", label: "Events conducted" },
];

export function AlumniImpact() {
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-12 bg-gold" />
          Alumni Impact
        </div>
        <h2 className="max-w-4xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
          A network measured not in numbers — but in{" "}
          <em className="not-italic text-gradient-gold font-medium">consequence.</em>
        </h2>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="group relative bg-card p-8 transition-colors duration-500 hover:bg-navy-deep md:p-10">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-500 group-hover:text-gold">
                {s.label}
              </div>
              <div className="absolute inset-x-8 bottom-6 h-px scale-x-0 origin-left bg-gold transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString());

  useEffect(() => { if (inView) mv.set(value); }, [inView, mv, value]);

  return (
    <div ref={ref} className="flex items-baseline gap-1 font-display text-5xl leading-none text-navy-deep transition-colors duration-500 group-hover:text-ivory md:text-6xl">
      <motion.span>{display}</motion.span>
      <span className="text-2xl text-gold md:text-3xl">{suffix}</span>
    </div>
  );
}
