import { NextRequest, NextResponse } from "next/server";
import { exaAnswer } from "@/lib/exa-client";
import type { AnswerRequest, AnswerResponse, Citation } from "@/lib/types";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body: AnswerRequest = await request.json();
    const { query } = body;

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

    const answerResponse = await exaAnswer(query, { text: true });

    const answerText = answerResponse.answer as string | undefined;
    if (!answerText || answerText.trim().length === 0) {
      return NextResponse.json(
        { error: "Unable to generate an answer. Please try a different question." },
        { status: 404 }
      );
    }

    const citations: Citation[] = (answerResponse.citations || []).map((citation: Record<string, unknown>) => ({
      id: citation.id || crypto.randomUUID(),
      url: citation.url,
      title: citation.title || "Untitled",
    }));

    const response: AnswerResponse = {
      answer: answerText,
      citations,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Answer error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate answer";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
