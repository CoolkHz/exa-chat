import { NextRequest, NextResponse } from "next/server";
import { exaSearch } from "@/lib/exa-client";
import type { SearchRequest, SearchResponse, SearchResult } from "@/lib/types";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();
    const { query, numResults = 10, type = "auto", useAutoprompt = true } = body;

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (!process.env.EXA_API_KEY) {
      return NextResponse.json(
        { error: "Exa API key not configured" },
        { status: 500 }
      );
    }

    const searchResponse = await exaSearch(query, {
      type,
      numResults,
      useAutoprompt,
      text: { maxCharacters: 500, includeHtmlTags: false },
      highlights: { numSentences: 3, highlightsPerUrl: 3 },
      summary: { query },
    });

    const results: SearchResult[] = (searchResponse.results || []).map((result: Record<string, unknown>) => ({
      id: result.id || crypto.randomUUID(),
      url: result.url,
      title: result.title || "Untitled",
      text: result.text,
      summary: result.summary,
      highlights: result.highlights,
      highlightScores: result.highlightScores,
      publishedDate: result.publishedDate,
      author: result.author,
      score: result.score,
      image: result.image,
    }));

    const response: SearchResponse = {
      results,
      autopromptString: searchResponse.autopromptString,
      requestId: searchResponse.requestId,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Search error:", error);
    const errorMessage = error instanceof Error ? error.message : "Search failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
