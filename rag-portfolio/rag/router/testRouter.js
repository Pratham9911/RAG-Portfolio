import "dotenv/config";
import { generateAnswer } from "../generation/answerGenerator.js";

const queries = [
  "Can you tell me about yourself?",
  
];

for (const q of queries) {
  console.log("\nQUESTION:", q);
  const answer = await generateAnswer(q , "recruiter");
  console.log("ANSWER:\n", answer);
}
