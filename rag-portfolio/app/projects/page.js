"use client";

import { useEffect, useRef, useState } from "react";

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
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

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
          className="absolute inset-0 h-full w-full object-cover "
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Foreground */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center space-y-6 px-4">

          <h1 className="text-5xl md:text-6xl font-semibold tracking-wide">
            Pratham Tiwari
          </h1>

          <p className="text-xs tracking-widest text-gray-400 uppercase">
            AI • Systems • Space
          </p>

          <p className="max-w-md mx-auto text-gray-300 text-base">
            Turning curiosity into intelligent systems.
          </p>

          <div className="mt-10 flex justify-center">
            <input
              type="text"
              placeholder="Ask anything about me…"
              className="w-80 md:w-96 px-4 py-3 bg-transparent border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
            />
          </div>

        </div>
      </div>

    </main>
  );
}
