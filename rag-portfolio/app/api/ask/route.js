export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { query, mode } = await req.json();

    // 🔑 IMPORT ONLY WHEN NEEDED
    const { generateAnswer } = await import(
      "@/rag/generation/answerGenerator"
    );

    const answer = await generateAnswer(query, mode);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { answer: "Internal error" },
      { status: 500 }
    );
  }
}
