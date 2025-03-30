import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();

    // Add IP address from request headers
    data.ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Create a simple log format: date-time | IP | user agent
    const logEntry = `${data.timestamp} | ${data.ip} | ${data.userAgent}\n`;

    // Store in a simple text file
    const filePath = path.join(process.cwd(), "visitor-log.txt");
    fs.appendFileSync(filePath, logEntry);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving analytics:", error);
    return NextResponse.json(
      { error: "Failed to save analytics data" },
      { status: 500 }
    );
  }
}
