import fs from "fs";


import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateAnswer } from "./rag/generation/answerGenerator.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ REQUIRED health check
app.get("/", (req, res) => {
  res.send("RAG backend is alive");
});

app.post("/ask", async (req, res) => {
  try {
    const { query, mode } = req.body;

    // 🔹 LOG QUERY (minimal, anonymous)
    const logEntry = {
      time: new Date().toISOString(),
      query,
      mode: mode || "casual"
    };

    fs.appendFile(
      "query_logs.jsonl",
      JSON.stringify(logEntry) + "\n",
      () => {}
    );

    const answer = await generateAnswer(query, mode || "casual");
    res.json({ answer });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ answer: "Internal server error" });
  }
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`RAG server running on port ${PORT}`);
});
