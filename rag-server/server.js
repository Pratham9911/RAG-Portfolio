import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateAnswer } from "./rag/generation/answerGenerator.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { query, mode } = req.body;
    const answer = await generateAnswer(query, mode || "casual");
    console.log("answer", answer);
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

