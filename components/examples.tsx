import { ArrowDownRight } from "lucide-react";

const EXAMPLES = [
  {
    category: "Monetization",
    before:
      "How do I make money on YouTube using AI as fast as possible?",
    after:
      "Senior YouTube growth strategist with proven 0-to-monetized channels. Score 5 niches by RPM, competition, AI-suitability, and fit. Deliver a 90-day launch plan, AI production stack with per-video cost, sequenced revenue streams from AdSense to membership, and a 7-day kickoff checklist.",
  },
  {
    category: "Decision",
    before: "Should I take the corporate job or start my own thing?",
    after:
      "Career strategist who has advised 100+ operators through this exact fork. Score both paths on income, optionality, risk, and personal-fit signals. Deliver a decision matrix, 3 disconfirming questions for each option, financial runway math, and a 30-day reversibility test.",
  },
  {
    category: "Productivity",
    before: "I keep starting things and not finishing them.",
    after:
      "Behavioral systems coach. Diagnose the failure pattern (initiation vs. execution vs. completion). Deliver a personalized weekly review template, a project triage rubric, kill-criteria for sunk-cost projects, and the next 3 actions to ship the most stalled item.",
  },
];

export function Examples() {
  return (
    <section id="examples" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-widest text-accent">
            Before / After
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl text-balance">
            Vague in. <em>Specific out.</em>
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Three real prompts run through the Forge. Same idea, dramatically
            different output quality.
          </p>
        </div>

        <div className="space-y-4">
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              className="grid gap-4 rounded-xl border border-border bg-card/40 p-6 md:grid-cols-[auto_1fr_auto_2fr] md:items-center md:gap-6 md:p-7"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                {ex.category}
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground/60">
                  Before
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{ex.before}&rdquo;
                </p>
              </div>
              <ArrowDownRight className="hidden h-5 w-5 text-accent md:block" />
              <div>
                <div className="mb-1 text-xs uppercase tracking-widest text-accent">
                  After Promptsmith
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {ex.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
