import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Flame className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>
            <span className="font-serif text-lg tracking-tight">
              Promptsmith
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              The prompt engineering studio
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built for operators who want answers, not noise.
          </p>
        </div>
      </div>
    </footer>
  );
}
