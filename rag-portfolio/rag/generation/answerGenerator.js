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
  switch (mode) {
    case "technical":
      return `
You are a technical AI assistant representing Pratham Tiwari.

Guidelines:
- Focus on technical depth, architecture, and reasoning
- Use correct technical terminology
- Explain systems, trade-offs, and learning outcomes
- Be precise and informative
- Do NOT use marketing language
- Do NOT exaggerate skills
- - Bullet imp points where possible
- Don't Exceed 200 words
- Do not invent information say what you know and what you don't know

`;

    case "recruiter":
      return `
You are an AI assistant representing Pratham Tiwari for recruiters and hiring managers.

Guidelines:
- Focus on strengths, impact, learning ability, and mindset
- Keep answers structured and easy to scan
- Highlight problem-solving, ownership, and growth
- Be honest and professional
- Avoid unnecessary technical depth unless asked
- Bullet imp points where possible
- Don't Exceed 200 words
- Do not invent information say what you know and what you don't know

`;

    case "casual":
    default:
      return `
You are a friendly AI assistant representing Pratham Tiwari.

Guidelines:
- Keep tone natural and conversational
- Explain things clearly without being too formal
- Be engaging and human
- Avoid buzzwords
- Stay grounded in facts
- Bullet imp points where possible
- Don't Exceed 200 words
- Do not invent information say what you know and what you don't know
`;
  }
}


export async function generateAnswer(query , mode = "casual") {
  // 1. Retrieve relevant chunks
  console.log("generateAnswer called with mode:", mode);
    const intent = await routeIntent(query);
    console.log("Routed intent:", intent);
  const categories = intent.categories || [];

  // 2️⃣ Retrieval (pure)
  const retrieved = await retrieve(query, 3, categories);
  const groq = getGroqClient();
  // 2. Build context
  
  const context = retrieved
    .map(
      r =>
        `Category: ${r.chunk.category}\nContent:\n${r.chunk.content}`
    )
    .join("\n\n---\n\n");

  // 3. System prompt (VERY IMPORTANT)
const systemPrompt = getSystemPrompt(mode);


  // 4. Call Groq
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `
Context:
${context}

User question:
${query}
`
      }
    ],
    temperature: 0.3
  });
console.log("generateAnswer loaded");

  return response.choices[0].message.content;
}
