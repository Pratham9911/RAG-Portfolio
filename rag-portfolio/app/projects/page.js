"use client";

import { useEffect, useRef, useState } from "react";
import Climashield from "./components/Climashield";
import InfinityAR from "./components/InfinityAR";
import Footer from "@/components/Footer";
export default function Project() {
  const videoRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const hideHint = () => setShowHint(false);

    window.addEventListener("scroll", hideHint, { once: true });
    window.addEventListener("touchstart", hideHint, { once: true });

    return () => {
      window.removeEventListener("scroll", hideHint);
      window.removeEventListener("touchstart", hideHint);
    };
  }, []);
  // fetch video list once
  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setVideos(data);
          setCurrentVideo(data[Math.floor(Math.random() * data.length)]);
        }
      });
  }, []);

  // play next random video
  const playNext = () => {
    if (videos.length === 0) return;

    let next;
    do {
      next = videos[Math.floor(Math.random() * videos.length)];
    } while (videos.length > 1 && next === currentVideo);

    setCurrentVideo(next);
  };

  return (
    <main className="bg-black text-white">

      {/* ================= HERO / LANDING ================= */}
      <section className="relative h-screen overflow-hidden">
        
        {/* Background Video */}
        {currentVideo && (
          <video
            ref={videoRef}
            key={currentVideo}
            src={currentVideo}
            autoPlay
            muted
            playsInline
            onEnded={playNext}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Foreground */}
        <div className="relative z-10 h-full flex items-end">
          <div className="px-6 lg:px-16 pb-16 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
              Projects
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
              Systems I’ve built to solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PROJECT SECTIONS ================= */}
      <section className="relative z-10">
        {/* === UX HINT OVERLAY === */}
        {showHint && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex justify-center">
  <div className="flex flex-col items-center gap-2 animate-fade-in w-full px-4">
    
    {/* Swipe hint */}
    <div className="flex items-center justify-center gap-3 w-full max-w-xs px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur text-center">
      <span className="text-lg">←</span>
      <span className="text-sm tracking-wide text-white/80 whitespace-nowrap">
        Swipe to explore project
      </span>
      <span className="text-lg">→</span>
    </div>

    {/* Scroll hint */}
    <div className="text-xs text-white/60 tracking-widest animate-bounce">
      Scroll ↓
    </div>
  </div>
</div>

        )}

        {/* === PROJECTS === */}
        <Climashield />
        <InfinityAR />
      </section>

      {/* === Animations === */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
     <Footer />

    </main>
  );
}
