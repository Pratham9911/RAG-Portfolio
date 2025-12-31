const KEY = "last_chat";

export function getHistory() {
  if (typeof window === "undefined") return [];

  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!parsed.lastUser || !parsed.lastAssistant) return [];

    // return as LLM-compatible history
    return [
      { role: "user", content: parsed.lastUser },
      { role: "assistant", content: parsed.lastAssistant }
    ];
  } catch {
    return [];
  }
}

export function saveHistory(userMsg, aiMsg) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(
    KEY,
    JSON.stringify({
      lastUser: userMsg,
      lastAssistant: aiMsg
    })
  );
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
