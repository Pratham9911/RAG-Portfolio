import { Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur bg-black/40 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto h-16 px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          <span className="font-semibold tracking-tight">Pratham.dev</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a className="hover:text-white transition">Dashboard</a>
          <a className="hover:text-white transition">Projects</a>
          <a className="hover:text-white transition">Skills</a>
          <a className="hover:text-white transition">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-white/10 text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available
          </span>
          <Settings size={18} className="text-zinc-400" />
        </div>

      </div>
    </nav>
  );
}
