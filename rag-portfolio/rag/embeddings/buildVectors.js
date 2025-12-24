import fs from "fs";
import path from "path";
import { embedText } from "./embed.js";

const CHUNKS_PATH = path.join(process.cwd(), "rag/chunks/chunks.json");
const VECTORS_PATH = path.join(process.cwd(), "rag/embeddings/vectors.json");

async function buildVectors() {
  const chunks = JSON.parse(fs.readFileSync(CHUNKS_PATH, "utf-8"));
  const vectors = [];

  for (const chunk of chunks) {
    console.log(`Embedding: ${chunk.id}`);
    const embedding = await embedText(chunk.content);

    vectors.push({
      id: chunk.id,
      category: chunk.category,
      source: chunk.source,
      content: chunk.content,
      embedding
    });
  }

  fs.writeFileSync(VECTORS_PATH, JSON.stringify(vectors, null, 2));
  console.log("✅ Embeddings generated");
}

buildVectors();
