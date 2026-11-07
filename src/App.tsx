import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Interests } from "@/components/sections/Interests";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Marquee } from "@/components/ui/Marquee";

const marqueeItems = ["Frontend", "Backend", "Databases", "Intelligent Systems", "Financial Markets", "Data"];

export default function App() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(!reduce);
  const done = useCallback(() => setLoading(false), []);

  return (
    // reducedMotion="user": transforms/layout animations are skipped for users who ask.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[90] -translate-y-20 rounded-full bg-paper px-4 py-2 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <AnimatePresence>{loading && <Preloader key="preloader" onComplete={done} />}</AnimatePresence>
      <Cursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main id="main">
        <Hero ready={!loading} />
        <Marquee items={marqueeItems} />
        <About />
        <TechStack />
        <Projects />
        <Journey />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
