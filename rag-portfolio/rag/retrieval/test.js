import { retrieve } from "./retrieve.js";

const queries = [
  "pratham?",
  "what difficulties he faced",
  "tell me about climashield",
  "why should i hire him",
  "how can i contact pratham"
];

for (const q of queries) {
  console.log(`\nQUERY: ${q}`);
  const results = await retrieve(q); // ✅ await is REQUIRED

  results.forEach(r => {
    console.log(
      `→ [${r.chunk.category}] ${r.chunk.id} (${r.score.toFixed(3)})`
    );
  });
}
