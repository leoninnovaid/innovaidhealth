import { Fragment, useMemo } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { annotateGlossaryText, simplifyContributionText } from "@/knowledge/glossary";
import { cn } from "@/lib/utils";

type GlossaryTextProps = {
  text: string;
  className?: string;
  simplify?: boolean;
};

const GlossaryText = ({ text, className, simplify = true }: GlossaryTextProps) => {
  const processedText = useMemo(() => (simplify ? simplifyContributionText(text) : text), [simplify, text]);
  const segments = useMemo(() => annotateGlossaryText(processedText), [processedText]);

  return (
    <span className={cn("whitespace-pre-line", className)}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <Fragment key={`text-${index}`}>{segment.text}</Fragment>;
        }

        return (
          <Popover key={`term-${segment.entry.id}-${index}`}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline font-medium text-accent underline decoration-dotted underline-offset-2 transition-colors hover:text-accent/80"
              >
                {segment.text}
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-w-xs border-border/70">
              <p className="text-sm font-semibold text-foreground">{segment.entry.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{segment.entry.description}</p>
            </PopoverContent>
          </Popover>
        );
      })}
    </span>
  );
};

export default GlossaryText;
