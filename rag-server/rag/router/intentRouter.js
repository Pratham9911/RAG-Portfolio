import Groq from "groq-sdk";

function getGroqClient() {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    throw new Error("GROQ_API_KEY is missing");
  }

  return new Groq({ apiKey: key });
}

export async function routeIntent(query, history = []) {
  const groq = getGroqClient();

  const conversationContext = history
    .map(
      m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
    )
    .join("\n");

  const prompt = `
You are an intent classifier for Pratham Tiwari's personal AI portfolio.

Allowed categories:
about, philosophy, education, skills, project, challenge,
journey, interests, achievement, current_focus,
future_goals, why_hire_me, work_preferences, contact

Projects:
- ClimaShield
- InfinityAR
- Rag-Portfolio

Achievements:
- Entrepreneurship (ECC)
- AlgoArena

Rules:
- Return ONLY the most relevant categories
- Prefer specific categories over general ones
- Use "project" when referring to any project
- Use "achievement" when referring to awards or wins
- Respond in STRICT JSON ONLY
- Do NOT explain anything

Conversation so far (for context only): focus on last questions asked and find intent if required else ignore history :
${conversationContext || "None"}

Current user query:
"${query}"

Output format:
{
  "categories": []
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  const raw = response.choices[0].message.content;
  console.log("\nCategories detected:", raw);
// console.log("Intent routing response:", raw ,"History", conversationContext);
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("INTENT PARSE FAILED:", raw);
    return { categories: [] };
  }
}
