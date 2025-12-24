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

 
const [modeOpen, setModeOpen] = useState(false);

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

    {/* ===== TOP LEFT AGENT HEADER (HIDDEN ON MOBILE) ===== */}
    <div className="hidden md:flex fixed top-20 left-6 z-50">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-[#0b0b0b] border border-white/10 text-sm">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-zinc-300">
          pratham-v2 <span className="text-zinc-500">/ ai-agent</span>
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
          className="flex items-center gap-1 px-2 py-1 text-xs
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

        {/* DROPDOWN */}
        {modeOpen && !loading && (
          <div
            className="absolute bottom-full mb-2 left-0
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
