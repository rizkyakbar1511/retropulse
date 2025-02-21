// app/api/emulator/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import fs from "node:fs";
import path from "node:path";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const referer = headersList.get("referer");

  if (!referer || !referer.includes(process.env.WEBSITE_URL || "")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const gameUrl = searchParams.get("gameUrl");
  const core = searchParams.get("core");
  const backgroundImage = searchParams.get("backgroundImage");

  // Read the template file
  const templatePath = path.join(process.cwd(), "src", "templates", "emulator.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders with actual values
  html = html.replace("{{gameUrl}}", gameUrl || "");
  html = html.replace("{{core}}", core || "");
  html = html.replace("{{backgroundImage}}", backgroundImage || "");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
