// rag/embeddings/embed.js
// export async function embedText(text) {
//   throw new Error(
//     "Embedding not available. Use precomputed vectors only."
//   );
// }
import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedder;
}

export async function embedText(text) {
  const model = await getEmbedder();
  const output = await model(text, {
    pooling: "mean",
    normalize: true
  });
  return Array.from(output.data);
}
