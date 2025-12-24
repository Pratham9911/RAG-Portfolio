"use client";

import Image from "next/image";
import { useEffect } from "react";
import Section1 from "@/components/section1";

export default function Page() {

  /* ---- reveal on load ---- */
  useEffect(() => {
    document.body.classList.add("loaded");
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 animate-fadeUp">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="relative animate-[fadeUp_0.8s_ease-out_forwards]">

            <h1 className="text-5xl lg:text-7xl font-sans tracking-tight leading-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
              <span className="font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
                Pratham
              </span>{" "}
              <span className="font-light text-zinc-300">
                Tiwari
              </span>
            </h1>

            <p className="mt-5 text-xl text-zinc-400 font-sans">
              Building{" "}
              <span className="font-extrabold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]">
                Intelligent Systems
              </span>{" "}
              & Scalable Architecture
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => (window.location.href = "/chat")}
                className="px-8 py-3 rounded-lg font-semibold text-white bg-[length:200%_200%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[gradientFlow_3s_linear_infinite] shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:shadow-[0_0_55px_rgba(236,72,153,0.8)] transition"
              >
                pratham-v2 / ai-agent →
              </button>

              <button className="px-7 py-3 font-sans bg-zinc-900 border border-white/10 rounded-lg hover:border-white/30 hover:bg-zinc-800/60 transition">
                Resume
              </button>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block">
            <div className="bg-black relative h-[520px] rounded-2xl overflow-hidden">
              <Image
                src="/pratham.jpg"
                alt="Pratham Tiwari"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l" />
            </div>
          </div>
        </div>

        {/* MOBILE IMAGE */}
        <div className="mt-12 lg:hidden flex justify-center">
          <div className="relative w-[300px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/pratham.jpg"
              alt="Pratham Tiwari"
              fill
              className="object-contain bg-black"
            />
          </div>
        </div>
      </section>

      {/* ================= TERMINAL + STACK ================= */}
      <Section1 />

      {/* animations */}
      <style jsx global>{`
        .animate-fadeUp {
          animation: fadeUp 0.9s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </main>
  );
}
