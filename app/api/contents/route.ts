import { NextRequest, NextResponse } from "next/server";
import { exaGetContents } from "@/lib/exa-client";

export const runtime = "edge";

export interface ContentsRequest {
  ids: string[];
}

export interface ContentsResult {
  id: string;
  url: string;
  title: string;
  text?: string;
  highlights?: string[];
  highlightScores?: number[];
  summary?: string;
  publishedDate?: string;
  author?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContentsRequest = await request.json();
    const { ids } = body;

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { error: "IDs are required" },
        { status: 400 }
      );
    }

    if (!process.env.EXA_API_KEY) {
      return NextResponse.json(
        { error: "Exa API key not configured" },
        { status: 500 }
      );
    }

    const contentsResponse = await exaGetContents(ids, {
      text: { maxCharacters: 10000, includeHtmlTags: false },
      highlights: { numSentences: 5, highlightsPerUrl: 5 },
      summary: { query: "" },
    });

    const results: ContentsResult[] = (contentsResponse.results || []).map((result: Record<string, unknown>) => ({
      id: result.id || "",
      url: result.url,
      title: result.title || "Untitled",
      text: result.text,
      highlights: result.highlights,
      highlightScores: result.highlightScores,
      summary: result.summary,
      publishedDate: result.publishedDate,
      author: result.author,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Get contents error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to get contents";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
