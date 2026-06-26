import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import entranceVideo from "@/assets/entrance.mp4.asset.json";

const SESSION_KEY = "cetaa_entrance_played_v2";

export function EntranceVideo() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  // decide whether to show
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setShow(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setExiting(true);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    document.body.style.overflow = "";
    setTimeout(() => setShow(false), 1400);
  };

  // play and orchestrate
  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    // hard cap: never block the site beyond 6s
    const hardCap = window.setTimeout(finish, 6000);
    if (!v) return () => clearTimeout(hardCap);

    const onReady = () => setReady(true);
    const onEnd = () => finish();
    const onError = () => finish();

    v.addEventListener("loadeddata", onReady);
    v.addEventListener("canplay", onReady);
    v.addEventListener("ended", onEnd);
    v.addEventListener("error", onError);

    const p = v.play();
    if (p && typeof p.then === "function") {
      p.catch(() => {
        // autoplay blocked – just show overlay for a moment then finish
        window.setTimeout(finish, 2400);
      });
    }

    return () => {
      clearTimeout(hardCap);
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="entrance"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Video layer */}
          <video
            ref={videoRef}
            src={entranceVideo.url}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: ready ? 0.85 : 0, transition: "opacity 900ms ease" }}
          />

          {/* Soft dark wash for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0f1d]/70 via-[#0a0f1d]/40 to-[#0a0f1d]/85" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,15,29,0.85)_100%)]" />

          {/* Classical centered crest */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.0, ease: "easeOut" }}
              className="font-display text-[10px] uppercase tracking-[0.6em] text-[#d4af6a]"
            >
              Est. 1939 · Trivandrum
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
              className="my-5 h-px w-40 origin-center bg-[#d4af6a]"
            />

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.1, ease: "easeOut" }}
              className="font-display text-3xl font-medium leading-tight text-white sm:text-5xl md:text-6xl"
              style={{ letterSpacing: "0.02em" }}
            >
              College of Engineering
              <br />
              <span className="italic text-[#e9c98a]">Trivandrum</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1.0 }}
              className="mt-6 font-display text-sm uppercase tracking-[0.45em] text-white/80 sm:text-base"
            >
              Alumni Association
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.0, duration: 0.9, ease: "easeOut" }}
              className="mt-6 h-px w-24 origin-center bg-[#d4af6a]/70"
            />
          </div>

          {/* Skip */}
          <button
            onClick={finish}
            className="absolute bottom-6 right-6 z-20 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/85 backdrop-blur transition hover:bg-white/10"
          >
            Skip
          </button>

          {/* Curtain wipe on exit */}
          {exiting && (
            <>
              <motion.div
                className="absolute inset-x-0 top-0 z-30 bg-[#0a0f1d]"
                initial={{ height: "0%" }}
                animate={{ height: "50%" }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 z-30 bg-[#0a0f1d]"
                initial={{ height: "0%" }}
                animate={{ height: "50%" }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
