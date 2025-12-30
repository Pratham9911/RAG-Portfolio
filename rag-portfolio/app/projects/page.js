"use client";

import { useEffect, useRef, useState } from "react";
import Climashield from "./components/Climashield";
import InfinityAR from "./components/InfinityAR";
import Footer from "@/components/Footer";
export default function Project() {
  const videoRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

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
      <section className="relative z-10 ">
        <Climashield />
        <InfinityAR />
      </section>
     <Footer />

    </main>
  );
}
