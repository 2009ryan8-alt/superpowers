"use client";

import { useState, useRef, useEffect } from "react";
import {
  Flame,
  Copy,
  Check,
  Play,
  RotateCcw,
  Wand2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "monetization", label: "Monetization" },
  { id: "productivity", label: "Productivity" },
  { id: "decision", label: "Decision" },
  { id: "learning", label: "Learning" },
  { id: "creative", label: "Creative" },
  { id: "technical", label: "Technical" },
  { id: "general", label: "General" },
];

const EXAMPLES: Record<string, string> = {
  monetization:
    "How do I monetize YouTube videos using AI for maximum cash flow as fast as possible and keep it sustainable?",
  productivity:
    "I keep starting projects and never finishing them. Help me actually ship things.",
  decision:
    "Should I take a stable corporate job or bootstrap my own SaaS for the next 12 months?",
  learning:
    "I want to become genuinely good at machine learning in 6 months starting from scratch.",
  creative:
    "Generate a brand identity and naming options for a premium ethical coffee subscription.",
  technical:
    "Architect a real-time collaborative whiteboard that scales to 10k concurrent rooms.",
  general:
    "Help me design a weekly review system that actually moves my goals forward.",
};

type Phase = "idle" | "forging" | "forged" | "executing" | "executed";

async function streamFromEndpoint(
  url: string,
  body: object,
  onChunk: (text: string) => void,
  signal: AbortSignal,
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    if (chunk) onChunk(chunk);
  }
}

export function Forge() {
  const [rawInput, setRawInput] = useState(EXAMPLES.monetization);
  const [category, setCategory] = useState("monetization");
  const [forged, setForged] = useState("");
  const [executed, setExecuted] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const isLoading = phase === "forging" || phase === "executing";

  const handlePickCategory = (id: string) => {
    setCategory(id);
    if (phase === "idle") {
      setRawInput(EXAMPLES[id]);
    }
  };

  const handleForge = async () => {
    if (!rawInput.trim() || isLoading) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setForged("");
    setExecuted("");
    setError(null);
    setPhase("forging");

    try {
      await streamFromEndpoint(
        "/api/forge",
        { rawInput, category },
        (chunk) => setForged((prev) => prev + chunk),
        controller.signal,
      );
      setPhase("forged");
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("Something went wrong. Please try again.");
        setPhase("idle");
      }
    }
  };

  const handleExecute = async () => {
    if (!forged.trim() || isLoading) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setExecuted("");
    setError(null);
    setPhase("executing");

    try {
      await streamFromEndpoint(
        "/api/execute",
        { prompt: forged },
        (chunk) => setExecuted((prev) => prev + chunk),
        controller.signal,
      );
      setPhase("executed");
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("Execution failed. Please try again.");
        setPhase("forged");
      }
    }
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setForged("");
    setExecuted("");
    setError(null);
    setPhase("idle");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(forged);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <section id="forge" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-widest text-accent">
            The Forge
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl text-balance">
            Drop in a rough idea. Get a structured prompt.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Type your half-formed question, pick a category, and watch
            Promptsmith forge a 10/10 prompt in real time. Then execute it with
            one click to see the actual answer.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* INPUT PANEL */}
          <div className="rounded-xl border border-border bg-card/40 p-6 md:p-7">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                Your raw input
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                01 / Source
              </span>
            </div>

            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Type your rough question or goal..."
              className="min-h-[140px] w-full resize-none rounded-md border border-border bg-input/60 p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
              disabled={isLoading}
            />

            <div className="mt-5">
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                Category
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handlePickCategory(c.id)}
                    disabled={isLoading}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs transition-all",
                      category === c.id
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card/30 text-muted-foreground hover:text-foreground hover:border-muted-foreground/40",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleForge}
                disabled={!rawInput.trim() || isLoading}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-accent-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {phase === "forging" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Forging...
                  </>
                ) : (
                  <>
                    <Flame className="h-4 w-4" />
                    Forge prompt
                  </>
                )}
              </button>
              {phase !== "idle" && (
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-md border border-border bg-card/30 p-3 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </div>

          {/* OUTPUT PANEL */}
          <div className="rounded-xl border border-border bg-card/40 p-6 md:p-7">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                {phase === "forging" ? (
                  <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
                ) : (
                  <span
                    className={cn(
                      "inline-block h-2 w-2 rounded-full",
                      forged ? "bg-accent" : "bg-muted-foreground/30",
                    )}
                  />
                )}
                {phase === "forging"
                  ? "Forging..."
                  : forged
                    ? "Forged prompt"
                    : "Awaiting input"}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                02 / Forged
              </span>
            </div>

            <div className="relative">
              <pre
                className={cn(
                  "max-h-[420px] min-h-[200px] overflow-y-auto whitespace-pre-wrap rounded-md border border-border bg-background/50 p-4 font-mono text-[13px] leading-relaxed scroll-fade",
                  !forged && "text-muted-foreground/60",
                )}
              >
                {forged ||
                  "Your structured 10/10 prompt will stream here.\n\nROLE\nCONTEXT\nOBJECTIVE\nDELIVERABLES\nCONSTRAINTS\nFORMAT\nCLARIFY FIRST"}
                {phase === "forging" && (
                  <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
                )}
              </pre>
            </div>

            {forged && (
              <div className="mt-5 flex flex-wrap items-center gap-3 fade-in-up">
                <button
                  onClick={handleExecute}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {phase === "executing" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Execute prompt
                    </>
                  )}
                </button>
                <button
                  onClick={handleCopy}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/30 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {forged.length.toLocaleString()} chars
                </span>
              </div>
            )}
          </div>
        </div>

        {/* EXECUTION OUTPUT */}
        {(phase === "executing" || executed) && (
          <div className="mt-6 rounded-xl border border-border bg-card/40 p-6 md:p-7 fade-in-up">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                {phase === "executing" ? (
                  <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
                ) : (
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                )}
                {phase === "executing" ? "Running prompt..." : "Result"}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                03 / Executed
              </span>
            </div>
            <div className="prose-invert max-w-none whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
              {executed}
              {phase === "executing" && (
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
              )}
            </div>
          </div>
        )}

        {phase === "idle" && (
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Wand2 className="h-3.5 w-3.5 text-accent" />
            Pick a category above to autofill an example prompt.
          </div>
        )}
      </div>
    </section>
  );
}
