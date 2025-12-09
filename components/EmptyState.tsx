"use client";

import { Card, CardBody } from "@heroui/react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <Card>
      <CardBody className="flex flex-col items-center justify-center py-16 sm:py-20 gap-4">
        <div className="p-4 rounded-full bg-default-100">
          <SearchX className="w-8 h-8 text-default-400" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No results found
          </h3>
          <p className="text-default-500 max-w-sm">
            No results found for &ldquo;{query}&rdquo;. Try a different search
            term or check your spelling.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
