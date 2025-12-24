"use client";

import { useEffect, useRef, useState } from "react";

/* ================= DATA ================= */
const BOOT_LINES = [
  "> npm run build-intelligent-systems",
  "> next build && tsc",
  "✓ Build complete",
];

const MAIN_COMMANDS = [
  "load skills",
  "load projects",
  "whoami",
  "system status",
  "help",
  "clear",
  "sudo teamup",
];

const PROJECT_DOMAINS = ["AI / ML", "AR", "Back"];

const SKILLS = [
  { name: "Java", level: 6, label: "1y" },
  { name: "Python", level: 6, label: "1y" },
  { name: "TensorFlow", level: 2, label: "2m" },
  { name: "React", level: 5, label: "8m" },
  { name: "Node.js", level: 4, label: "6m" },
  { name: "SQL", level: 3, label: "4m" },
  { name: "Docker", level: 2, label: "2m" },
];

const PROJECTS = {
  "AI / ML": [
    {
      name: "Alumni Connection Platform",
      desc: "AI-powered alumni mentorship and networking system.",
    },
    {
      name: "ClimaShield",
      desc: "AI-driven climate, health & disaster risk prediction platform.",
    },
  ],
  AR: [
    {
      name: "InfinityAR",
      desc: "Augmented Reality learning platform for science & space.",
    },
  ],
};

export default function Section1() {
  const ref = useRef(null);

  const [visible, setVisible] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  const [mode, setMode] = useState("main"); // main | projects
  const [active, setActive] = useState(0);

  const [output, setOutput] = useState(null);

  /* ===== Intersection ===== */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* ===== Boot Animation ===== */
  useEffect(() => {
    if (!visible || bootDone) return;

    const t = setTimeout(() => {
      setBootIndex((i) => {
        if (i + 1 >= BOOT_LINES.length) {
          setTimeout(() => setBootDone(true), 600);
          return i;
        }
        return i + 1;
      });
    }, 600);

    return () => clearTimeout(t);
  }, [visible, bootIndex, bootDone]);

  /* ===== Keyboard ===== */
  useEffect(() => {
    if (!bootDone) return;

    const list =
      mode === "projects" ? PROJECT_DOMAINS : MAIN_COMMANDS;

    const handler = (e) => {
      if (e.key === "ArrowDown")
        setActive((i) => (i + 1) % list.length);
      if (e.key === "ArrowUp")
        setActive((i) => (i === 0 ? list.length - 1 : i - 1));
      if (e.key === "Enter") execute(list[active]);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [bootDone, active, mode]);

  /* ===== Execute ===== */
  function execute(cmd) {
    if (cmd === "clear") {
      setOutput(null);
      setMode("main");
      setActive(0);
      return;
    }

    if (cmd === "load projects") {
      setMode("projects");
      setActive(0);
      setOutput(null);
      return;
    }

    if (mode === "projects") {
      if (cmd === "Back") {
        setMode("main");
        setActive(0);
        return;
      }
      setOutput({ type: "projects", value: cmd });
      return;
    }

    if (cmd === "load skills") setOutput({ type: "skills" });
    if (cmd === "whoami") setOutput({ type: "whoami" });
    if (cmd === "system status") setOutput({ type: "system" });
    if (cmd === "help") setOutput({ type: "help" });
    if (cmd === "sudo teamup") setOutput({ type: "sudo" });
  }

  const currentList =
    mode === "projects" ? PROJECT_DOMAINS : MAIN_COMMANDS;

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-6 lg:px-16 pb-24 grid lg:grid-cols-2 gap-10"
    >
      {/* ================= TERMINAL ================= */}
      <div className="bg-[#0d1117] border border-white/30 rounded-xl font-mono text-sm h-[280px] flex flex-col">
        <div className="px-4 py-2 border-b border-white/10 text-zinc-400">
          terminal — interactive shell
        </div>

        <div className="flex-1 px-4 py-3">
          {!bootDone &&
            BOOT_LINES.slice(0, bootIndex + 1).map((l, i) => (
              <div key={i} className="text-green-400">
                {l}
              </div>
            ))}

          {bootDone && (
            <>
              {mode === "projects" && (
                <div className="text-cyan-400 mb-2">
                  Choose domain:
                </div>
              )}

              {currentList.map((c, i) => (
                <div
                  key={c}
                  onClick={() => execute(c)}
                  className={`cursor-pointer px-2 py-1 rounded ${
                    active === i
                      ? "bg-white/20 text-white"
                      : "text-zinc-300"
                  }`}
                >
                  {active === i ? ">" : " "} {c}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ================= OUTPUT ================= */}
      <div className="bg-[#0d1117] border border-white/30 rounded-xl font-mono text-sm h-[280px] flex flex-col">
        <div className="px-4 py-2 border-b border-white/10 text-zinc-400">
          output — renderer
        </div>

        <div className="flex-1 px-4 py-4 text-zinc-300 overflow-hidden">
          {!output && (
            <div className="text-zinc-500">
              Awaiting command selection…
            </div>
          )}

          {output?.type === "skills" &&
            SKILLS.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3 mb-2"
              >
                <span className="w-20">{s.name}</span>
                <span className="text-green-400">
                  {"█".repeat(s.level)}
                  {"░".repeat(8 - s.level)}
                </span>
                <span className="text-zinc-400">{s.label}</span>
              </div>
            ))}

          {output?.type === "projects" &&
            PROJECTS[output.value]?.map((p) => (
              <div key={p.name} className="mb-3">
                <div className="text-white">{p.name}</div>
                <div className="text-zinc-400 text-xs">
                  {p.desc}
                </div>
              </div>
            ))}

          {output?.type === "whoami" && (
            <div>
              Pratham Tiwari
              <br />
              Computer Engineering student
              <br />
              Building AI & AR systems
            </div>
          )}

          {output?.type === "system" && (
            <div className="space-y-1">
              <div>Server        : Active</div>
              <div>Open to Intern: Yes</div>
              <div>Team Up       : Ready</div>
            </div>
          )}

          {output?.type === "help" && (
            <div>
              Explore commands to know more.
              <br />
              Interactive terminal supported.
            </div>
          )}

          {output?.type === "sudo" && (
            <div className="text-green-400">
              Permission granted 😄
              <br />
              Let’s team up.
              <br />
              <a
                href="https://www.linkedin.com/in/pratham-tiwari-29a82b315/"
                target="_blank"
                className="underline text-cyan-400"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
