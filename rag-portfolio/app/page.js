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
      <section className="pt-20 lg:pt-28 pb-20 animate-fadeUp">
  <div className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-10 items-center">

    {/* LEFT */}
    <div className="relative animate-[fadeUp_0.8s_ease-out_forwards]">

      {/* NAME */}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans tracking-tight leading-tight text-white">
        <span className="font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
  Pratham Tiwari
</span>

        {/* <span className="font-light text-zinc-300">Tiwari</span> */}
      </h1>

      {/* TITLE */}
      <p className="mt-4 text-lg sm:text-xl text-zinc-400 font-sans">
        Building{" "}
        <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]">
          Intelligent Systems
        </span>{" "}
        & Scalable Architecture
      </p>

      {/* MOBILE IMAGE */}
      <div className="mt-8 lg:hidden flex justify-center">
        <div className="relative w-[260px] sm:w-[300px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/Pratham.jpg"
            alt="Pratham Tiwari"
            fill
            priority
            className="object-cover object-top bg-black"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-8 flex gap-3 justify-center lg:justify-start">
   <button
  onClick={() => (window.location.href = "/chat")}
  className="px-8 py-3 rounded-lg font-semibold text-white bg-[length:200%_200%] bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-[gradientFlow_3s_linear_infinite] shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:shadow-[0_0_55px_rgba(99,102,241,0.9),0_0_35px_rgba(168,85,247,0.75)] transition-all duration-200 ease-out hover:scale-[1.04] active:scale-[0.96]"
>
  pratham-v2 / ai-agent →
</button>


        <button className="px-6 sm:px-7 py-3 rounded-lg border border-white/20 bg-zinc-900/80 text-white transition-all duration-200 hover:bg-zinc-800 hover:border-white/40 hover:scale-[1.03]">
          Resume
        </button>
      </div>
    </div>

    {/* RIGHT IMAGE (DESKTOP ONLY) */}
    <div className="relative hidden lg:block">
      <div className="bg-black relative h-[520px] rounded-2xl overflow-hidden">
        <Image
          src="/My.jpg"
          alt="Pratham Tiwari"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l" />
      </div>
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
