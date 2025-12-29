"use client";


import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(scrolled);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur bg-black/60 border-b border-white/10">
      {/* SCROLL PROGRESS BAR */}
<div className="absolute top-0 left-0 h-[6px] w-full bg-transparent">
  <div
    className="h-full transition-[width] duration-75 ease-out"
    style={{
      width: `${scrollProgress}%`,
      boxShadow: "0 0 8px rgba(99,102,241,0.6)"
,
      background:
        "linear-gradient(90deg, #22d3ee, #6366f1, #a855f7)",
    }}
  />
</div>

      <div className="max-w-[1400px] mx-auto h-16 px-6 grid grid-cols-3 items-center">
        
        {/* LEFT: BRAND */}
        <div className="flex items-center gap-3 justify-self-start text-white">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          <span className="font-semibold tracking-tight">
            Pratham.dev
          </span>
        </div>

        {/* CENTER: DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm justify-self-center">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative transition ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.name}

                {/* underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* RIGHT */}
<div className="flex items-center justify-end text-white col-span-2 md:col-span-1">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur border-t border-white/10 animate-[fadeDown_0.25s_ease-out_forwards]">
          <div className="px-6 py-5 flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition ${
                  pathname === link.href
                    ? "text-white"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style jsx global>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
