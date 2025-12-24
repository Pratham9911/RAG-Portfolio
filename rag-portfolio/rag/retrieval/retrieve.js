import fs from "fs";
import path from "path";
import { embedText } from "../embeddings/embed.js";
import { cosineSimilarity } from "./cosine.js";

const VECTORS_PATH = path.join(
  process.cwd(),
  "rag/embeddings/vectors.json"
);

// 🔹 PURE RETRIEVAL (NO AI, NO ROUTING)
export async function retrieve(query, topK = 3, allowedCategories = []) {
  const vectors = JSON.parse(
    fs.readFileSync(VECTORS_PATH, "utf-8")
  );

  let filtered = vectors;

  if (allowedCategories.length > 0) {
    filtered = filtered.filter(v =>
      allowedCategories.includes(v.category)
    );
  }

  const queryEmbedding = await embedText(query);

  const scored = filtered.map(v => ({
    chunk: v,
    score: cosineSimilarity(queryEmbedding, v.embedding)
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
