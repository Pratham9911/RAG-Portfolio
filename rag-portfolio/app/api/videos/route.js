import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const videosDir = path.join(process.cwd(), "public/videos");

  try {
    const files = fs.readdirSync(videosDir);

    const videos = files
      .filter((file) => file.endsWith(".mp4"))
      .map((file) => `/videos/${file}`);

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
