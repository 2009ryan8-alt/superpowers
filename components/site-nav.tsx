import Link from "next/link";
import { Flame } from "lucide-react";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground transition-transform group-hover:scale-105">
            <Flame className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-serif text-xl tracking-tight">
            Promptsmith
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#forge" className="transition-colors hover:text-foreground">
            The Forge
          </Link>
          <Link href="#framework" className="transition-colors hover:text-foreground">
            Framework
          </Link>
          <Link href="#examples" className="transition-colors hover:text-foreground">
            Examples
          </Link>
        </nav>
        <Link
          href="#forge"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Start forging
        </Link>
      </div>
    </header>
  );
}
