"use client";

import {
  Card,
  CardBody,
  Link,
  Image,
  Chip,
  Avatar,
} from "@heroui/react";
import { ExternalLink, Calendar, User } from "lucide-react";
import { SearchResult } from "@/lib/types";
import { motion } from "framer-motion";

interface SearchResultCardProps {
  result: SearchResult;
  index: number;
}

function formatDate(dateString?: string): string | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  const domain = getDomain(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

export function SearchResultCard({ result, index }: SearchResultCardProps) {
  const formattedDate = formatDate(result.publishedDate);
  const domain = getDomain(result.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="w-full" shadow="sm">
        <CardBody className="p-4 sm:p-5">
          <div className="flex gap-4">
            {result.image && (
              <div className="flex-shrink-0 hidden sm:block">
                <Image
                  src={result.image}
                  alt={result.title}
                  width={120}
                  height={90}
                  className="object-cover rounded-lg"
                  classNames={{
                    wrapper: "w-[120px] h-[90px]",
                  }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar
                  src={getFaviconUrl(result.url)}
                  size="sm"
                  radius="sm"
                  className="w-5 h-5 flex-shrink-0"
                  fallback={
                    <span className="text-xs text-default-500">
                      {domain.charAt(0).toUpperCase()}
                    </span>
                  }
                />
                <span className="text-tiny text-default-400 truncate">
                  {domain}
                </span>
              </div>

              <Link
                href={result.url}
                isExternal
                showAnchorIcon
                anchorIcon={<ExternalLink className="w-3.5 h-3.5 ml-1" />}
                className="text-foreground hover:text-primary transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold line-clamp-2">
                  {result.title}
                </h3>
              </Link>

              {result.text && (
                <p className="text-small text-default-500 line-clamp-2 sm:line-clamp-3">
                  {result.text}
                </p>
              )}

              {result.highlights && result.highlights.length > 0 && (
                <div className="flex flex-col gap-1 mt-1">
                  {result.highlights.slice(0, 2).map((highlight, i) => (
                    <p
                      key={i}
                      className="text-small text-default-600 italic border-l-2 border-primary pl-2 line-clamp-2"
                    >
                      &ldquo;{highlight}&rdquo;
                    </p>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-1">
                {formattedDate && (
                  <Chip
                    size="sm"
                    variant="flat"
                    startContent={<Calendar className="w-3 h-3" />}
                  >
                    {formattedDate}
                  </Chip>
                )}
                {result.author && (
                  <Chip
                    size="sm"
                    variant="flat"
                    startContent={<User className="w-3 h-3" />}
                    classNames={{
                      content: "max-w-[120px] truncate",
                    }}
                  >
                    {result.author}
                  </Chip>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
