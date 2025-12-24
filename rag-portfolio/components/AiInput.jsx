"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Phone,
  ArrowUp
} from "lucide-react";

/* ================= FAQ BUTTONS ================= */
const faqs = [
  { label: "Tech Stack", icon: Sparkles, query: "What is your tech stack?" },
  { label: "Projects", icon: Briefcase, query: "Tell me about your projects" },
  { label: "Education", icon: GraduationCap, query: "What is your education?" },
  { label: "Contact", icon: Phone, query: "How can I contact you?" }
];

/* ================= MODES ================= */
const modes = ["casual", "technical", "recruiter"];

/* ================= TEXT UTILS ================= */

/* Convert markdown-ish text to HTML */
function renderMarkdown(text) {
  let html = text;

  // Escape basic HTML
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic *text*
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Clickable links
  html = html.replace(
    /(https?:\/\/[^\s]+)/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer"
       class="text-blue-400 underline hover:text-blue-300">$1</a>`
  );

  return { __html: html };
}

/* Typing animation */
function typeText(fullText, onUpdate, speed = 12) {
  let i = 0;
  const interval = setInterval(() => {
    onUpdate(fullText.slice(0, i + 1));
    i++;
    if (i >= fullText.length) clearInterval(interval);
  }, 1);
}

export default function AiInput() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hello! I am **Pratham's personalized AI assistant**.\n\nAsk me anything about his skills, projects, or experience."
    }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("casual");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  /* Auto scroll to bottom */
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, loading]);

  async function send(queryText) {
    if (!queryText.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", text: queryText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, mode })
      });

      const data = await res.json();

      // placeholder AI message
      setMessages(prev => [...prev, { role: "ai", text: "" }]);

      typeText(data.answer || "No response.", typed => {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1].text = typed;
          return copy;
        });
      });
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "Something went wrong." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-[#0b1220] rounded-2xl border border-[#1f2a3a] text-white overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="px-4 py-3 border-b border-[#1f2a3a] text-sm text-zinc-400">
        Pratham.ai_agent — v2.0
      </div>

      {/* ================= CHAT ================= */}
      <div
        ref={chatRef}
        className="h-[55vh] md:h-[420px] overflow-y-auto px-4 py-4 space-y-4"
      >
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
              className={`max-w-[75%] px-4 py-3 rounded-xl text-sm
                ${
                  m.role === "user"
                    ? "bg-blue-600"
                    : "bg-[#111a2c] text-zinc-200"
                }
                whitespace-pre-wrap text-left leading-relaxed`}
              dangerouslySetInnerHTML={renderMarkdown(m.text)}
            />

            {m.role === "user" && (
              <User className="w-5 h-5 text-zinc-400 mt-1 shrink-0" />
            )}
          </div>
        ))}

        {loading && (
          <div className="text-xs text-zinc-400">Thinking…</div>
        )}
      </div>

      {/* ================= FAQS ================= */}
      <div className="px-4 py-3 border-t border-[#1f2a3a] flex gap-2 flex-wrap">
        {faqs.map(f => (
          <button
            key={f.label}
            onClick={() => send(f.query)}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full
              bg-[#111a2c] border border-[#1f2a3a]
              hover:bg-[#16213a] transition"
          >
            <f.icon size={14} />
            {f.label}
          </button>
        ))}
      </div>

      {/* ================= INPUT ================= */}
      <div className="px-4 py-3 border-t border-[#1f2a3a] flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send(input)}
          placeholder="Ask me anything about Pratham…"
          className="flex-1 bg-transparent outline-none
            text-sm md:text-base placeholder-zinc-500"
        />

        <button
          onClick={() => send(input)}
          className="w-10 h-10 rounded-full bg-blue-600
            flex items-center justify-center
            hover:bg-blue-500 transition"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      {/* ================= MODES ================= */}
      <div className="px-4 py-3 border-t border-[#1f2a3a] flex gap-2 justify-center">
        {modes.map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`text-xs px-4 py-1.5 rounded-full border transition
              ${
                mode === m
                  ? "bg-[#1a233a] border-blue-500"
                  : "border-[#1f2a3a] text-zinc-400 hover:text-white"
              }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
