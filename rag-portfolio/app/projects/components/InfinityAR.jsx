"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "InfinityAR",
    subtitle:
      "Turn ordinary textbooks into interactive 3D learning experiences.",
    meta: "Feb 2025 – Apr 2025 · Working Prototype",
    badge: "🏆 1st Place — College Entrepreneurship Challenges (Feb & Oct 2025)",
    image: "/assets/infinityAR/front.jpg",
    live: "https://infinityar.vercel.app/",
  },
  {
    id: 2,
    question: "What problem does InfinityAR solve?",
    body: [
      "Traditional education relies heavily on theory.",
      "Students struggle to visualize complex concepts.",
      "Learning often lacks real-world interaction.",
    ],
    image: "/assets/infinityAR/problem.png",
  },
  {
    id: 3,
    question: "How does InfinityAR work?",
    body: [
      "Scan textbook pages using a mobile device.",
      "Instantly view interactive 3D models.",
      "Rotate, zoom, and explore concepts visually.",
    ],
    image: "/assets/infinityAR/solution.png",
  },
  {
    id: 4,
    question: "Why is InfinityAR effective?",
    body: [
      "Runs on smartphones — no expensive hardware needed.",
      "Ideal for science, math, and visualization-heavy subjects.",
      "Makes learning immersive, engaging, and intuitive.",
    ],
    image: "/assets/infinityAR/keyFeature.png",
  },
  {
    id: 5,
    closing: true,
  },
];

export default function InfinityARShowcase() {
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
    <section className="relative w-full min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white overflow-hidden pt-20 md:pt-0">
      {/* Progress Bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="relative w-52 h-[5px] rounded-full bg-white/10 backdrop-blur">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/60 z-50">
        {String(active).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* Slides */}
      <div
        ref={ref}
className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-auto min-h-[100svh]"
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
                    {/* Title + Icon */}
                    <div className="flex items-center gap-4">
                      <Image
                        src="/assets/infinityAR/icon.png"
                        alt="InfinityAR icon"
                        width={56}
                        height={56}
                        className="rounded-xl border border-white/10"
                      />
                      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
                        {slide.title}
                      </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    {/* Timeline (more visible now) */}
                    <p className="text-sm font-medium uppercase tracking-widest text-white/80">
                      {slide.meta}
                    </p>

                    {slide.badge && (
                      <div className="inline-block mt-3 px-4 py-2 rounded-full bg-white/5 border border-white/20 text-sm text-white/90">
                        {slide.badge}
                      </div>
                    )}

                    {/* LIVE BUTTON */}
                    {slide.live && (
                      <a
                        href={slide.live}
                        target="_blank"
                        className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
                      >
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Live Website
                      </a>
                    )}
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
                        <span className="text-white/40 mt-1">●</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {slide.closing && (
                  <>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                      The future of learning is interactive.
                    </h2>
                    <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                      InfinityAR shows how augmented reality can transform
                      education by helping students understand concepts visually
                      instead of memorizing them.
                    </p>
                    <a
                      href="https://github.com/Pratham9911/InfinityAR"
                      target="_blank"
                      className="inline-flex items-center gap-2 mt-6 text-lg font-medium border-b border-white/40 hover:border-white transition"
                    >
                      View source code →
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
                    alt="InfinityAR visual"
                    width={1000}
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
