"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "ClimaShield",
    subtitle: "AI that predicts climate-driven health risks before they happen.",
    meta: "Oct 2025 – Dec 2025 · PCCOE IGC 2026 (2nd Round)",
    tech: [
      "Neural Networks",
      "TensorFlow",
      "PyTorch",
      "LLaMA",
      "React Native",
      "Firebase",
    ],
    image: "/assets/climaShield/front.png",
    cta: "https://github.com/Pratham9911/ClimaShield",
    body: [
      "Climate disasters often lead to sudden health emergencies.",
      "ClimaShield helps people prepare early instead of reacting late.",
    ],
  },
  {
    id: 2,
    question: "What problem does this solve?",
    body: [
      "Climate events directly affect human health.",
      "Heatwaves, floods, and pollution increase medical risk.",
      "People usually receive warnings after damage begins.",
    ],
    image: "/assets/climaShield/Problem.png",
  },
  {
    id: 3,
    question: "What does ClimaShield do?",
    body: [
      "Predicts upcoming climate conditions for the next 7 days.",
      "Identifies health risks linked to those conditions.",
      "Notifies users before the situation becomes dangerous.",
    ],
    image: "/assets/climaShield/solution.png",
  },
  {
    id: 4,
    question: "How early are the warnings?",
    body: [
      "Uses neural networks trained on climate and health data.",
      "Forecasts risk up to one week in advance.",
      "Allows time for prevention instead of emergency response.",
    ],
    image: "/assets/climaShield/feature1.png",
  },
  {
    id: 5,
    question: "How is it personalized?",
    body: [
      "Analyzes the user’s location.",
      "Considers environmental and health-related factors.",
      "Provides guidance tailored to the individual.",
    ],
    image: "/assets/climaShield/feature2.png",
  },
  {
    id: 6,
    question: "How do users interact with it?",
    body: [
      "Simple mobile-first interface.",
      "AI assistant answers health and safety questions.",
      "Designed for everyday people, not experts.",
    ],
    image: "/assets/climaShield/feature3.png",
  },
  {
    id: 7,
    closing: true,
  },
];

export default function ClimaShieldShowcase() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const value = max > 0 ? el.scrollLeft / max : 0;
      setProgress(value);

      const index = Math.round(value * (slides.length - 1)) + 1;
      setActive(index);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
<section className="
  relative 
  w-full 
  min-h-screen 
  bg-gradient-to-b from-blue via-[#0a0a0a] to-black 
  text-white 
  overflow-hidden
  pt-10       
  md:pt-0     
">

      {/* Progress Bar */}
<div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
  <div className="relative w-52 h-[5px] rounded-full bg-white backdrop-blur">
    <div
      className="absolute left-0 top-0 h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"
      style={{ width: `${progress * 100}%` }}
    />
  </div>
</div>


      {/* Slide Counter */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/50 z-50">
        {String(active).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Slides */}
      <div
        ref={ref}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x min-h-[100svh]"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="snap-start flex-shrink-0 w-full min-h-[100svh] flex items-center px-6 md:px-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-center">
              {/* TEXT */}
              <div className="space-y-6 max-w-xl">
                {slide.title && (
                  <>
                    {/* Project Title with Icon */}
                    <div className="flex items-center gap-4">
                      <Image
                        src="/assets/climaShield/icon.png"
                        alt="ClimaShield icon"
                        width={58}
                        height={58}
                        className="rounded-xl border border-white/10"
                      />
                      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
                        {slide.title}
                      </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    <p className="text-sm uppercase tracking-widest text-white/80">
                      {slide.meta}
                    </p>
                  </>
                )}

                {slide.question && (
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                    {slide.question}
                  </h2>
                )}

                {slide.body && (
                  <ul className="space-y-4 text-lg text-white/70 leading-relaxed">
                    {slide.body.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-blue-400 mt-1">●</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {slide.tech && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {slide.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {slide.cta && (
                  <div className="flex items-center gap-4 pt-6">
                    <a
                      href={slide.cta}
                      target="_blank"
                      className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
                    >
                      View Source Code
                    </a>
                    
                  </div>
                )}

                {slide.closing && (
                  <>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                      Built to protect people, not just predict weather.
                    </h2>
                    <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                      ClimaShield focuses on human health by using AI to
                      anticipate climate-related risks before they become
                      emergencies.
                    </p>
                    <a
                      href="https://github.com/Pratham9911/ClimaShield"
                      target="_blank"
                      className="inline-block mt-6 text-lg font-medium border-b border-white/40 hover:border-white transition"
                    >
                      Explore the project →
                    </a>
                  </>
                )}
              </div>

              {/* IMAGE */}
              {slide.image && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  <Image
                    src={slide.image}
                    alt="ClimaShield visual"
                    width={900}
                    height={600}
                    className="object-contain max-h-[70svh]"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
