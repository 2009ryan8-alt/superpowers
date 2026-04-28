import {
  UserCircle,
  Layers,
  Target,
  ListChecks,
  ShieldAlert,
  Layout,
  HelpCircle,
} from "lucide-react";

const COMPONENTS = [
  {
    n: "01",
    icon: UserCircle,
    title: "Role",
    body: "Assigns a specific expert with a track record. Forces depth over surface.",
  },
  {
    n: "02",
    icon: Layers,
    title: "Context",
    body: "Your situation, constraints, resources, and starting point — no missing variables.",
  },
  {
    n: "03",
    icon: Target,
    title: "Objective",
    body: "The outcome you want — measurable, with a timeframe attached.",
  },
  {
    n: "04",
    icon: ListChecks,
    title: "Deliverables",
    body: "Numbered list of exactly what to produce, in the order to produce it.",
  },
  {
    n: "05",
    icon: ShieldAlert,
    title: "Constraints",
    body: "What to avoid, what's non-negotiable, what counts as a wrong answer.",
  },
  {
    n: "06",
    icon: Layout,
    title: "Format",
    body: "Structure of the output — headings, tables, length, tone, and reading level.",
  },
  {
    n: "07",
    icon: HelpCircle,
    title: "Clarify First",
    body: "Forces the model to ask before assuming. Eliminates hallucinated context.",
  },
];

export function Framework() {
  return (
    <section
      id="framework"
      className="border-t border-border/60 bg-muted/30 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-accent">
              Framework
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl text-balance">
              Seven components.
              <br />
              <em>Every great prompt.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
              Vague prompts produce vague answers. The 7-component framework
              forces specificity at every layer — so the model can&apos;t
              hallucinate context, dodge specifics, or hand back a generic
              listicle.
            </p>
            <div className="mt-8 rounded-lg border border-border bg-card/50 p-5">
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Quality multipliers
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  Replace soft verbs (help, explore) with hard verbs (rank, score, sequence).
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  Demand specifics: name tools, numbers, thresholds.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  Add a kill-criterion so the plan self-corrects.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  End with a 7-day or 3-action checklist.
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {COMPONENTS.map((c) => (
              <div
                key={c.n}
                className="group relative rounded-lg border border-border bg-card/40 p-5 transition-colors hover:border-accent/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {c.n}
                  </span>
                </div>
                <div className="font-serif text-xl tracking-tight">
                  {c.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
