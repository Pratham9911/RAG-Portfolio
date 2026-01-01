import Groq from "groq-sdk";
import { retrieve } from "../retrieval/retrieve.js";
import { routeIntent } from "../router/intentRouter.js";
function getGroqClient() {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    throw new Error("GROQ_API_KEY is missing");
  }

  return new Groq({ apiKey: key });
}


function getSystemPrompt(mode) {
  const baseRules = `
Core rules (follow strictly):
- response wrt Pratham (me , i , my , Ai representing Pratham etc) if needed
- Default response length: under 120 words
- Answer to the point first, then stop
- Conversation history is provided to underatnd context and ask follow-up questions
- Use a short paragraph + bullets only if it improves clarity
- Go detailed ONLY if the user asks or if the topic is complex
- always ask a follow-up question for user engagement
- if unsure say it breifly
- Do NOT invent information; say clearly if something is unknown
- Answer ONLY about Pratham Tiwari, not general topics
- Avoid filler, buzzwords, and repetition
`;

  switch (mode) {
    case "technical":
      return `
You are a technical AI assistant representing Pratham Tiwari.

Style & focus:
- Prioritize clarity, correctness, and system-level understanding
- Mention architecture, tools, or trade-offs only if relevant
- Prefer concise bullets for technical facts
- No marketing language, no exaggeration

${baseRules}
`;

    case "recruiter":
      return `
You are an AI assistant representing Pratham Tiwari for recruiters and hiring managers.

Style & focus:
- Highlight impact, learning ability, ownership, and problem-solving
- Keep answers easy to scan and decision-oriented
- Avoid deep technical details unless asked
- Be honest, professional, and grounded

${baseRules}
`;

    case "casual":
    default:
      return `
You are a friendly AI assistant representing Pratham Tiwari.

Style & focus:
- Keep tone natural and clear
- Explain simply without dumbing down
- Avoid jargon unless needed
- Be helpful but concise

${baseRules}
`;
  }
}



export async function generateAnswer(
  query,
  mode = "casual",
  history = []
) {
 
  const intent = await routeIntent(query, history);
  const categories = intent.categories || [];

  
  const retrieved = await retrieve(query, 6, categories);
  const context = retrieved.length? retrieved
    .map(
      r =>
        `Category: ${r.chunk.category}\nContent:\n${r.chunk.content}`
    )
    .join("\n\n---\n\n") : "No relevant documents found.";

  const systemPrompt = getSystemPrompt(mode);
  const groq = getGroqClient();
const lastUserMessage = Array.isArray(history)
  ? history.findLast(m => m.role === "user")
  : null;

 const messages = [
  {
    role: "system",
    content: systemPrompt
  },

  ...(lastUserMessage
    ? [
        {
          role: "user",
          content: `Previous context to understand past and ans in future: ${lastUserMessage.content}`
        }
      ]
    : []),

  {
    role: "user",
    content: `
Context of only Pratham not user :
${context}

Current question:
${query}
`
  }
];

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    temperature: 0.3
  });

  return response.choices[0].message.content;
}

