"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Phone,
  ArrowUp ,
  ChevronDown, Zap, Code
} from "lucide-react";

/* ================= FAQ BUTTONS ================= */
const faqs = [
  { label: "Tech Stack", icon: Sparkles, query: "What is your tech stack?" },
  { label: "Projects", icon: Briefcase, query: "Tell me about your projects" },
  { label: "Education", icon: GraduationCap, query: "What is your education?" },
  { label: "Contact", icon: Phone, query: "How can I contact you?" }
];

const modes = [
  { key: "casual", label: "Casual", icon: Zap },
  { key: "technical", label: "Technical", icon: Code },
  { key: "recruiter", label: "Recruiter", icon: Briefcase }
];
/* ================= MARKDOWN ================= */
function renderMarkdown(text) {
  let html = text;
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(
    /(https?:\/\/[^\s]+)/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer"
      class="text-blue-400 underline">$1</a>`
  );
  return { __html: html };
}

/* ================= TYPING ================= */
function typeText(fullText, onUpdate, onDone, speed = 14) {
  let i = 0;
  const interval = setInterval(() => {
    onUpdate(fullText.slice(0, i + 1));
    i++;
    if (i >= fullText.length) {
      clearInterval(interval);
      onDone?.();
    }
  }, speed);
}

export default function AiInput() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("casual");
  const [loading, setLoading] = useState(false);
const [showIntro, setShowIntro] = useState(false);

 
const [modeOpen, setModeOpen] = useState(false);
const [agentStatus, setAgentStatus] = useState("waking");

useEffect(() => {
  let resolved = false;

  fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "GET"
  })
    .then(res => {
      if (res.ok) {
        resolved = true;
        setAgentStatus("online");
      } else {
        setAgentStatus("offline");
      }
    })
    .catch(() => {
      setAgentStatus("offline");
    });

  setTimeout(() => {
    if (!resolved) {
      setAgentStatus("waking");
    }
  }, 3000);
}, []);

 useEffect(() => {
  const seen = localStorage.getItem("ai_intro_seen");
  if (!seen) {
    setShowIntro(true);
  }
}, []);

function handleIntroClose() {
  localStorage.setItem("ai_intro_seen", "true");
  setShowIntro(false);
}

const [showModeHint, setShowModeHint] = useState(false);
useEffect(() => {
  const seen = localStorage.getItem("mode_hint_seen");
  if (!seen) {
    setShowModeHint(true);
  }
}, []);

function closeModeHint() {
  localStorage.setItem("mode_hint_seen", "true");
  setShowModeHint(false);
}

  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  /* ================= AUTO GROW TEXTAREA ================= */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [input]);

  async function send(queryText) {
    if (!queryText.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", text: queryText }]);
    setInput("");
    setLoading(true);

    try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ask`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryText, mode })
    }
  );

      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: "" }]);

      typeText(
        data.answer || "No response.",
        typed => {
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1].text = typed;
            return copy;
          });
        },
        () => setLoading(false)
      );
    } catch {
      setLoading(false);
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "Something went wrong." }
      ]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
  <main className="min-h-screen bg-black text-white relative">
{showIntro && (
  <div
    className="
      fixed inset-0 z-[100]
      flex items-center justify-center px-4
      bg-black/2
      backdrop-blur-sm
      animate-fadeIn
    "
  >
    <div
      className="
        w-full max-w-md
        rounded-xl
        bg-gradient-to-b from-zinc-900/90 to-zinc-950/95
        backdrop-blur-xl
        border border-white/20
        shadow-[0_30px_80px_rgba(0,0,0,0.8)]
        px-6 py-5
        text-zinc-100
        animate-scaleIn
      "
    >
      <h2
        className="
          text-[14px]
          font-semibold
          tracking-wide
          text-zinc-200
          mb-2
        "
      >
        About this AI Agent
      </h2>

      <p
        className="
          text-[13px]
          leading-relaxed
          text-zinc-400
          font-light
        "
      >
        This <span className="font-medium text-zinc-100">AI agent</span> is designed to
        answer <span className="font-medium text-zinc-200">professional and portfolio-related</span>{" "}
        questions about{" "}
        <span className="font-medium text-white">Pratham Tiwari</span>.
        <br /><br />
        It focuses on{" "}
        <span className="font-medium text-zinc-200">
          projects, skills, achievements
        </span>, and technical journey.
        Responses outside this scope may be limited or inaccurate.
      </p>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleIntroClose}
          className="
            px-4 py-1.5
            rounded-md
            text-[12px]
            font-bold
            hover:text-white
            hover:bg-blue-900
            bg-white/80
            text-black
            active:scale-[0.98]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500/40
          "
        >
          I understand
        </button>
      </div>
    </div>
  </div>
)}


    {/* ===== TOP LEFT AGENT HEADER (HIDDEN ON MOBILE) ===== */}
    <div className="hidden md:flex fixed top-20 left-6 z-50">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-[#0b0b0b] border border-white/10 text-sm">
       <span
  className={`w-2 h-2 rounded-full animate-pulse ${
    agentStatus === "online"
      ? "bg-green-500"
      : agentStatus === "waking"
      ? "bg-yellow-500"
      : "bg-red-500"
  }`}
/>

<span className="text-zinc-300">
  {agentStatus === "online" && (
    <>
      pratham-v2 <span className="text-zinc-500">/ ai-agent</span>
    </>
  )}

  {agentStatus === "waking" && (
    <>
      AI agent waking up{" "}
      <span className="text-zinc-500">/ please wait</span>
    </>
  )}

  {agentStatus === "offline" && (
    <>
      AI agent offline{" "}
      <span className="text-zinc-500">/ retrying</span>
    </>
  )}
</span>


      </div>
    </div>
{/* ===== MOBILE AGENT STATUS (TOP CENTER) ===== */}
<div className="md:hidden fixed top-14 left-1/2 -translate-x-1/2 z-50">
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
    bg-[#0b0b0b] border border-white/10 text-xs">
    
    <span
      className={`w-2 h-2 rounded-full animate-pulse ${
        agentStatus === "online"
          ? "bg-green-500"
          : agentStatus === "waking"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
    />

    <span className="text-zinc-300 whitespace-nowrap">
      {agentStatus === "online" && "Agent Online"}
      {agentStatus === "waking" && "Agent Waking Up…"}
      {agentStatus === "offline" && "Agent Offline"}
    </span>
  </div>
</div>

    {/* ===== CHAT (SCROLLS UNDER INPUT) ===== */}
    <div
      ref={chatRef}
      className="
        absolute top-16 bottom-0 left-0 right-0
        overflow-y-auto px-4 pb-[300px]
        scrollbar-hide z-0
      "
    >
      <div className="max-w-3xl mx-auto space-y-6 py-8">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "ai" && (
              <Bot className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
            )}

            <div
              className={`px-4 py-3 rounded-xl text-sm max-w-full
                ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : " text-white"
                }
                whitespace-pre-wrap leading-relaxed`}
              dangerouslySetInnerHTML={renderMarkdown(m.text)}
            />

            {m.role === "user" && (
              <User className="w-5 h-5 text-zinc-400 mt-1 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>

   {/* ===== FIXED INPUT DOCK (BLACK, ABOVE CHAT) ===== */}
<div
  className="fixed bottom-0 left-0 right-0 z-50
  bg-black border-t border-white/10
  pb-[env(safe-area-inset-bottom)]"
>
  
  {/* INPUT BAR */}
  <div className="max-w-3xl mx-auto px-4 pt-4">
    <div
      className="relative flex items-center gap-2
      bg-black border border-white/20
      rounded-full px-3 py-2"
    >
      
      {/* MODE DROPDOWN */}
      <div className="relative">
        <button
          disabled={loading}
          onClick={() => setModeOpen(v => !v)}
          className="flex items-center gap-1 px-2 py-1 text-sm
            text-white/80 hover:text-white
            disabled:opacity-40"
        >
          {(() => {
            const current = modes.find(m => m.key === mode);
            const Icon = current.icon;
            return (
              <>
                <Icon size={14} />
                <span>{current.label}</span>
                <ChevronDown size={12} />
              </>
            );
          })()}
        </button>
{showModeHint && (
  <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 z-50">
    <div
      className="
        relative
        bg-black/70 backdrop-blur-sm
        border border-white/25
        rounded-lg
        px-5 py-4
        shadow-2xl
        text-[13px]
        text-white
        whitespace-nowrap
        overflow-visible
      "
    >
      {/* CONTENT */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-white/90">
          Try out modes
        </span>

        <button
          onClick={closeModeHint}
          className="
            px-4 py-1.5
            rounded-md
            bg-white
            text-black
            text-[11px]
            font-semibold
            hover:bg-gray-200
            active:scale-[0.98]
            transition
          "
        >
          Okay
        </button>
      </div>
    </div>
  </div>
)}




        {/* DROPDOWN */}
        {modeOpen && !loading && (
          <div
            className="absolute bottom-full mb-2 right-0
            bg-black border border-white/20
            rounded-xl shadow-lg overflow-hidden"
          >
            {modes.map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.key}
                  onClick={() => {
                    setMode(m.key);
                    setModeOpen(false);
                  }}
                  className="flex items-center gap-2 w-full
                    px-4 py-2 text-xs text-left
                    hover:bg-white hover:text-black"
                >
                  <Icon size={14} />
                  {m.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* TEXT INPUT */}
      <textarea
        ref={textareaRef}
        value={input}
        disabled={loading}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="What do you want to know?"
        className="
          flex-1 bg-black resize-none outline-none
          text-white placeholder-zinc-500
          max-h-40 overflow-hidden
          disabled:opacity-40
        "
      />

      {/* SEND */}
      <button
        disabled={loading}
        onClick={() => send(input)}
        className={`w-9 h-9 rounded-full flex items-center justify-center
          ${
            loading
              ? "bg-white/40 cursor-not-allowed"
              : "bg-white text-black"
          }`}
      >
        <ArrowUp size={16} />
      </button>
    </div>

    {/* DISCLAIMER */}
    <p className="mt-2 text-center text-[11px] text-zinc-300">
      This AI does not store Any data. Responses may be inaccurate.
    </p>
  </div>

  {/* FAQS BELOW INPUT */}
  <div
    className="max-w-3xl mx-auto px-4 pt-3 pb-4
    flex flex-wrap gap-2 justify-center"
  >
    {faqs.map(f => (
      <button
        key={f.label}
        disabled={loading}
        onClick={() => send(f.query)}
        className={`px-3 py-1.5 rounded-full text-xs
          border border-white/20 bg-black
          ${
            loading
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-white hover:text-black"
          }`}
      >
        {f.label}
      </button>
    ))}
  </div>
</div>

  </main>
);

}
