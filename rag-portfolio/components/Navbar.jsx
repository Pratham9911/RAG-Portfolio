"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur bg-black/50 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto h-16 px-6 flex items-center justify-between">

        {/* LEFT: BRAND */}
        <div className="flex items-center gap-3 text-white">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          <span className="font-semibold tracking-tight text-white">
            Pratham.dev
          </span>
        </div>

        {/* CENTER: DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="/" className="hover:text-white transition">Dashboard</a>
          <a href="/projects" className="hover:text-white transition">Projects</a>
          <a href="#skills" className="hover:text-white transition">Skills</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-white">

          {/* STATUS */}
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/15 text-xs text-white">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available
          </span>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur border-t border-white/10 animate-[fadeDown_0.25s_ease-out_forwards]">
          <div className="px-6 py-4 flex flex-col gap-4 text-zinc-300 text-sm">
            <a href="/" onClick={() => setOpen(false)} className="hover:text-white">Dashboard</a>
            <a href="/projects" onClick={() => setOpen(false)} className="hover:text-white">Projects</a>
            <a href="#skills" onClick={() => setOpen(false)} className="hover:text-white">Skills</a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-white">Contact</a>
          </div>
        </div>
      )}

      {/* animation */}
      <style jsx global>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
