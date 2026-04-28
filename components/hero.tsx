import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grain">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-accent" />
            <span>The prompt engineering studio</span>
          </div>

          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-8xl">
            Turn rough questions
            <br />
            into <em className="text-accent">10/10 prompts.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
            Stop wrestling with vague AI outputs. Promptsmith forges your half-formed
            ideas into structured, expert-grade prompts using a proven 7-component
            framework — then runs them for you.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="#forge"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Forge a prompt
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#framework"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/30 px-6 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See the framework
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground/70">
            <span>7-Component Framework</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
            <span>Live Streaming</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
            <span>Execute With One Click</span>
          </div>
        </div>
      </div>
    </section>
  );
}
