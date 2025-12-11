// Exa API client for Cloudflare Workers (fetch-based, no SDK)

const EXA_API_BASE = "https://api.exa.ai";

interface ExaSearchOptions {
  type?: "keyword" | "neural" | "auto";
  numResults?: number;
  useAutoprompt?: boolean;
  text?: { maxCharacters?: number; includeHtmlTags?: boolean };
  highlights?: { numSentences?: number; highlightsPerUrl?: number };
  summary?: { query?: string };
}

interface ExaAnswerOptions {
  text?: boolean;
  model?: string;
  systemPrompt?: string;
}

interface ExaContentsOptions {
  text?: { maxCharacters?: number; includeHtmlTags?: boolean };
  highlights?: { numSentences?: number; highlightsPerUrl?: number };
  summary?: { query?: string };
}

export async function exaSearch(query: string, options: ExaSearchOptions = {}) {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) throw new Error("EXA_API_KEY not configured");

  const response = await fetch(`${EXA_API_BASE}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      query,
      type: options.type || "auto",
      numResults: options.numResults || 10,
      useAutoprompt: options.useAutoprompt ?? true,
      contents: {
        text: options.text || { maxCharacters: 500, includeHtmlTags: false },
        highlights: options.highlights || { numSentences: 3, highlightsPerUrl: 3 },
        summary: options.summary || { query },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Exa API error: ${error}`);
  }

  return response.json();
}

export async function exaAnswer(query: string, options: ExaAnswerOptions = {}) {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) throw new Error("EXA_API_KEY not configured");

  const response = await fetch(`${EXA_API_BASE}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      query,
      text: options.text ?? true,
      model: options.model || "exa",
      systemPrompt: options.systemPrompt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Exa API error: ${error}`);
  }

  return response.json();
}

export async function exaGetContents(ids: string[], options: ExaContentsOptions = {}) {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) throw new Error("EXA_API_KEY not configured");

  const response = await fetch(`${EXA_API_BASE}/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      ids,
      text: options.text || { maxCharacters: 10000, includeHtmlTags: false },
      highlights: options.highlights || { numSentences: 5, highlightsPerUrl: 5 },
      summary: options.summary || { query: "" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Exa API error: ${error}`);
  }

  return response.json();
}
