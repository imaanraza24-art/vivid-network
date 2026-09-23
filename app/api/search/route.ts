import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/content";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const results = await searchContent(q);
  return NextResponse.json({ results });
}
