import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { PreviousEvents } from "@/components/sections/PreviousEvents";
import { CurrentEvent } from "@/components/sections/CurrentEvent";
import { AlumniImpact } from "@/components/sections/AlumniImpact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "College of Engineering Trivandrum Alumni Association (CETAA) — Connecting Generations, Celebrating Legacy" },
      { name: "description", content: "Over 86 years of engineers, scholars and builders. The CET Alumni Association (CETAA) is the global fellowship of College of Engineering Trivandrum graduates." },
      { property: "og:title", content: "College of Engineering Trivandrum Alumni Association (CETAA)" },
      { property: "og:description", content: "Connecting Generations. Celebrating Legacy. Building the Future." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Timeline />
      <PreviousEvents />
      <CurrentEvent />
      <AlumniImpact />
      <Footer />
    </main>
  );
}
