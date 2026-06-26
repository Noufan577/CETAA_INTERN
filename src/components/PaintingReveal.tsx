import { motion } from "framer-motion";
import cetPainting from "@/assets/cet-painting.png";

/**
 * Four brush strokes progressively unmask the image.
 * Strokes are thick SVG paths drawn via strokeDashoffset, used as a mask.
 */
export function PaintingReveal() {
  const strokes = [
    // top sky band
    "M -50 120 C 200 60, 500 180, 850 90 C 1050 40, 1200 160, 1400 100",
    // middle building band
    "M -50 360 C 250 280, 600 440, 950 340 C 1150 280, 1300 420, 1450 360",
    // arch + details
    "M -50 560 C 220 480, 520 640, 880 540 C 1100 480, 1300 620, 1450 560",
    // foreground
    "M -50 760 C 240 680, 560 820, 920 720 C 1140 660, 1320 800, 1450 740",
  ];

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] md:aspect-[3/4]">
      <svg viewBox="0 0 1200 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="paint-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
          <mask id="brush-mask">
            <rect width="1200" height="900" fill="black" />
            {strokes.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="white"
                strokeWidth={260}
                strokeLinecap="round"
                fill="none"
                filter="url(#paint-rough)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.55, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              />
            ))}
          </mask>
        </defs>

        {/* paper texture under the painting */}
        <rect width="1200" height="900" fill="var(--ivory)" />

        <motion.image
          href={cetPainting}
          width="1200"
          height="900"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#brush-mask)"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.6, duration: 2.5, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </svg>

      {/* gold light sweep */}
      <motion.div
        className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-gold/60 to-transparent blur-2xl"
        initial={{ x: "-30%", opacity: 0 }}
        animate={{ x: "260%", opacity: [0, 1, 0] }}
        transition={{ delay: 3.0, duration: 1.6, ease: "easeInOut" }}
      />

      {/* College plaque */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 1 }}
        className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-sm border border-gold/40 bg-navy-deep/70 px-4 py-3 backdrop-blur-md"
      >
        <div>
          <div className="font-display text-xs tracking-[0.3em] text-gold/90 uppercase">College of Engineering</div>
          <div className="font-display text-lg font-semibold text-ivory">Trivandrum · since 1939</div>
        </div>
        <div className="font-display text-3xl text-gold/80">86<span className="text-xs align-top">yrs</span></div>
      </motion.div>
    </div>
  );
}
