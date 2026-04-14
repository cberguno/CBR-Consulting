import Link from "next/link";
import { ArrowRight, Sparkles, Calculator, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TOOL_CARDS = [
  {
    title: "AI Pricing Tool",
    summary:
      "Generate pricing recommendations with margin-aware strategy and practical testing ideas.",
    href: "/pricing",
    cta: "Open pricing tool",
    Icon: Calculator,
  },
  {
    title: "Subscription Savings Audit",
    summary:
      "Identify overlapping software spend and estimate a leaner stack for your team.",
    href: "/contact",
    cta: "Request audit",
    Icon: Sparkles,
  },
  {
    title: "AI Safety Checklist",
    summary:
      "Review policy, access, and data handling safeguards before rolling out AI workflows.",
    href: "/services",
    cta: "View services",
    Icon: ShieldCheck,
  },
] as const;

export default function ToolsPage() {
  return (
    <main className="px-4 py-14 md:py-20">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Business tools built for quick wins
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-text-secondary">
          Start with one tool, validate ROI, then expand into a full operating stack that fits your business.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TOOL_CARDS.map((tool) => (
            <Card key={tool.title} className="h-full border-border/70">
              <CardHeader>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
                  <tool.Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col justify-between gap-6">
                <p className="text-sm text-text-secondary">{tool.summary}</p>
                <Button asChild variant="outline" className="justify-between">
                  <Link href={tool.href}>
                    {tool.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
