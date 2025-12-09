"use client";

import { useState, useCallback } from "react";
import {
  Input,
  Button,
  Chip,
  Spinner,
  Card,
  CardBody,
  Divider,
} from "@heroui/react";
import { Search, Sparkles, AlertCircle, Clock } from "lucide-react";
import { SearchResult as SearchResultType, SearchResponse } from "@/lib/types";
import { SearchResultCard } from "@/components/SearchResultCard";
import { Header } from "@/components/Header";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [autoprompt, setAutoprompt] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, numResults: 10 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Search failed");
      }

      const data: SearchResponse = await response.json();
      setResults(data.results);
      setAutoprompt(data.autopromptString || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const suggestions = [
    "Latest AI news",
    "React best practices",
    "Climate change solutions",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center min-h-[65vh] gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-center">
                <span className="text-primary">Exa</span>{" "}
                <span className="text-foreground">Search</span>
              </h1>
              <p className="text-default-500 text-base sm:text-lg text-center max-w-md">
                AI-powered search engine that finds exactly what you need
              </p>
            </div>

            <Card className="w-full max-w-2xl" shadow="lg">
              <CardBody className="p-5 sm:p-6 gap-4">
                <div className="flex flex-row gap-3 items-center">
                  <Input
                    value={query}
                    onValueChange={setQuery}
                    onKeyDown={handleKeyDown}
                    placeholder="Search anything..."
                    radius="lg"
                    size="lg"
                    isClearable
                    onClear={() => setQuery("")}
                    classNames={{
                      base: "flex-1",
                      mainWrapper: "h-12",
                      inputWrapper: [
                        "h-12",
                        "shadow-sm",
                        "bg-default-100",
                        "dark:bg-default-50/10",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/20",
                        "group-data-[focus=true]:bg-default-100",
                        "dark:group-data-[focus=true]:bg-default-50/10",
                        "!cursor-text",
                      ],
                      innerWrapper: "gap-3",
                      input: [
                        "text-base",
                        "placeholder:text-default-400",
                      ],
                    }}
                    startContent={
                      <Search className="w-5 h-5 text-default-400 shrink-0" />
                    }
                  />
                  <Button
                    color="primary"
                    size="lg"
                    radius="lg"
                    className="font-semibold px-8 h-12 shrink-0"
                    onPress={handleSearch}
                    isLoading={isLoading}
                  >
                    Search
                  </Button>
                </div>

                <Divider />

                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <span className="text-small text-default-400">Try:</span>
                  {suggestions.map((suggestion) => (
                    <Chip
                      key={suggestion}
                      variant="flat"
                      color="default"
                      className="cursor-pointer"
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <Card shadow="md">
              <CardBody className="p-4">
                <div className="flex flex-row gap-3 items-center">
                  <Input
                    value={query}
                    onValueChange={setQuery}
                    onKeyDown={handleKeyDown}
                    placeholder="Search anything..."
                    radius="lg"
                    size="md"
                    isClearable
                    onClear={() => setQuery("")}
                    classNames={{
                      base: "flex-1",
                      mainWrapper: "h-10",
                      inputWrapper: [
                        "h-10",
                        "shadow-sm",
                        "bg-default-100",
                        "dark:bg-default-50/10",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/20",
                        "group-data-[focus=true]:bg-default-100",
                        "dark:group-data-[focus=true]:bg-default-50/10",
                        "!cursor-text",
                      ],
                      innerWrapper: "gap-3",
                      input: [
                        "text-sm",
                        "placeholder:text-default-400",
                      ],
                    }}
                    startContent={
                      <Search className="w-4 h-4 text-default-400 shrink-0" />
                    }
                  />
                  <Button
                    color="primary"
                    radius="lg"
                    className="font-semibold px-6 h-10 shrink-0"
                    onPress={handleSearch}
                    isLoading={isLoading}
                  >
                    Search
                  </Button>
                </div>
              </CardBody>
            </Card>

            {autoprompt && (
              <div className="flex items-center gap-2 text-small text-default-500 px-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>
                  Searched for:{" "}
                  <span className="text-foreground font-medium">
                    {autoprompt}
                  </span>
                </span>
              </div>
            )}

            {isLoading ? (
              <Card>
                <CardBody className="flex flex-col items-center justify-center py-20 gap-4">
                  <Spinner size="lg" color="primary" />
                  <p className="text-default-500">Searching the web...</p>
                </CardBody>
              </Card>
            ) : error ? (
              <Card>
                <CardBody className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="p-4 rounded-full bg-danger/10">
                    <AlertCircle className="w-8 h-8 text-danger" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-danger mb-2">
                      Search Error
                    </h3>
                    <p className="text-default-500 mb-4">{error}</p>
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleSearch}
                    >
                      Try Again
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : results.length === 0 ? (
              <EmptyState query={query} />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-small text-default-500 px-1">
                  <Clock className="w-4 h-4" />
                  <span>Found {results.length} results</span>
                </div>

                <div className="flex flex-col gap-3">
                  {results.map((result, index) => (
                    <SearchResultCard
                      key={result.id}
                      result={result}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
