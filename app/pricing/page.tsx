"use client";

import { useMemo, useState } from "react";
import { Loader2, Sparkles, Target, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PricingResult = {
  recommendedPrice: number;
  priceRange: {
    low: number;
    high: number;
  };
  confidence: "low" | "medium" | "high";
  summary: string;
  rationale: string[];
  experiments: string[];
  assumptions: string[];
};

type FormState = {
  businessName: string;
  industry: string;
  offeringType: "product" | "service" | "subscription" | "hybrid";
  monthlyCosts: string;
  monthlySales: string;
  desiredMargin: string;
  competitorLow: string;
  competitorHigh: string;
  marketPosition: "budget" | "balanced" | "premium";
  urgency: "fast" | "normal" | "strategic";
  notes: string;
};

const initialForm: FormState = {
  businessName: "",
  industry: "",
  offeringType: "service",
  monthlyCosts: "",
  monthlySales: "",
  desiredMargin: "35",
  competitorLow: "",
  competitorHigh: "",
  marketPosition: "balanced",
  urgency: "normal",
  notes: "",
};

function asCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PricingToolPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<PricingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const confidenceTone = useMemo(() => {
    if (!result) {
      return "bg-muted text-text-secondary";
    }

    if (result.confidence === "high") {
      return "bg-success/10 text-success";
    }

    if (result.confidence === "medium") {
      return "bg-warning/10 text-warning";
    }

    return "bg-danger/10 text-danger";
  }, [result]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.businessName.trim() || !form.industry.trim()) {
      setError("Business name and industry are required.");
      return;
    }

    if (!form.monthlyCosts || !form.monthlySales || !form.desiredMargin) {
      setError("Monthly costs, monthly sales, and margin target are required.");
      return;
    }

    if (Number(form.monthlySales) <= 0) {
      setError("Monthly sales must be greater than zero.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/pricing-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName.trim(),
          industry: form.industry.trim(),
          offeringType: form.offeringType,
          monthlyCosts: Number(form.monthlyCosts),
          monthlySales: Number(form.monthlySales),
          desiredMargin: Number(form.desiredMargin),
          competitorLow: form.competitorLow ? Number(form.competitorLow) : "",
          competitorHigh: form.competitorHigh ? Number(form.competitorHigh) : "",
          marketPosition: form.marketPosition,
          urgency: form.urgency,
          notes: form.notes.trim(),
        }),
      });

      const payload = (await response.json()) as PricingResult | { error?: string };

      if (!response.ok) {
        throw new Error((payload as { error?: string }).error ?? "Request failed.");
      }

      setResult(payload as PricingResult);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Could not generate a recommendation right now.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative overflow-hidden px-4 py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand-orange/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-info/20 blur-3xl"
      />

      <section className="relative mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-3 py-1 text-sm font-medium text-brand-orange">
            <Sparkles className="h-4 w-4" />
            AI Pricing Tool
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Set smarter prices with live AI strategy support
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Enter your business economics and positioning goals. The tool returns a suggested unit price, a practical range, and test ideas you can run this month.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border/70 bg-card/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Business Inputs</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 md:col-span-1">
                  <span className="text-sm font-medium">Business name</span>
                  <Input
                    value={form.businessName}
                    onChange={(e) =>
                      setForm((current) => ({ ...current, businessName: e.target.value }))
                    }
                    placeholder="Sunset Dental Group"
                    required
                  />
                </label>

                <label className="space-y-2 md:col-span-1">
                  <span className="text-sm font-medium">Industry</span>
                  <Input
                    value={form.industry}
                    onChange={(e) => setForm((current) => ({ ...current, industry: e.target.value }))}
                    placeholder="Dental / Healthcare"
                    required
                  />
                </label>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Offering type</span>
                  <Select
                    value={form.offeringType}
                    onValueChange={(value: FormState["offeringType"]) =>
                      setForm((current) => ({ ...current, offeringType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Market position</span>
                  <Select
                    value={form.marketPosition}
                    onValueChange={(value: FormState["marketPosition"]) =>
                      setForm((current) => ({ ...current, marketPosition: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-medium">Monthly operating costs (USD)</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.monthlyCosts}
                    onChange={(e) => setForm((current) => ({ ...current, monthlyCosts: e.target.value }))}
                    placeholder="12000"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium">Monthly sales volume (units)</span>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={form.monthlySales}
                    onChange={(e) => setForm((current) => ({ ...current, monthlySales: e.target.value }))}
                    placeholder="350"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium">Target gross margin (%)</span>
                  <Input
                    type="number"
                    min="1"
                    max="90"
                    step="1"
                    value={form.desiredMargin}
                    onChange={(e) => setForm((current) => ({ ...current, desiredMargin: e.target.value }))}
                    placeholder="35"
                    required
                  />
                </label>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Decision urgency</span>
                  <Select
                    value={form.urgency}
                    onValueChange={(value: FormState["urgency"]) =>
                      setForm((current) => ({ ...current, urgency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Need answer now</SelectItem>
                      <SelectItem value="normal">Normal planning cycle</SelectItem>
                      <SelectItem value="strategic">Quarterly strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-medium">Competitor low (optional)</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.competitorLow}
                    onChange={(e) => setForm((current) => ({ ...current, competitorLow: e.target.value }))}
                    placeholder="39"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium">Competitor high (optional)</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.competitorHigh}
                    onChange={(e) => setForm((current) => ({ ...current, competitorHigh: e.target.value }))}
                    placeholder="69"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-medium">Context (optional)</span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))}
                    placeholder="Seasonality, customer behavior shifts, upsell plans, channel changes..."
                    className="min-h-[110px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </label>

                <div className="md:col-span-2 flex items-center gap-3 pt-2">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating Recommendation
                      </>
                    ) : (
                      "Generate Price Strategy"
                    )}
                  </Button>
                  {error ? <p className="text-sm text-danger">{error}</p> : null}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {!result && !loading ? (
                <div className="rounded-lg border border-dashed border-border p-6 text-sm text-text-secondary">
                  Submit your inputs to receive a price recommendation, confidence score, and tactical tests.
                </div>
              ) : null}

              {loading ? (
                <div className="space-y-3">
                  <div className="h-7 w-40 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-56 animate-pulse rounded bg-muted" />
                  <div className="h-20 w-full animate-pulse rounded bg-muted" />
                </div>
              ) : null}

              {result ? (
                <>
                  <div className="rounded-xl border border-border bg-bg-page p-5">
                    <p className="text-sm text-text-secondary">Suggested unit price</p>
                    <p className="mt-1 text-4xl font-semibold tracking-tight text-brand-orange">
                      {asCurrency(result.recommendedPrice)}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      Working range: {asCurrency(result.priceRange.low)} to {asCurrency(result.priceRange.high)}
                    </p>
                    <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${confidenceTone}`}>
                      Confidence: {result.confidence}
                    </p>
                  </div>

                  <p className="text-sm text-text-secondary">{result.summary}</p>

                  <div className="space-y-4">
                    <section>
                      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-secondary">
                        <Target className="h-4 w-4" />
                        Why this price
                      </h2>
                      <ul className="space-y-2 text-sm">
                        {result.rationale.map((item) => (
                          <li key={item} className="rounded-md bg-muted/50 px-3 py-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-secondary">
                        <TrendingUp className="h-4 w-4" />
                        Experiments to run
                      </h2>
                      <ul className="space-y-2 text-sm">
                        {result.experiments.map((item) => (
                          <li key={item} className="rounded-md bg-info/10 px-3 py-2 text-text-primary">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-secondary">
                        <ShieldCheck className="h-4 w-4" />
                        Assumptions
                      </h2>
                      <ul className="space-y-2 text-sm">
                        {result.assumptions.map((item) => (
                          <li key={item} className="rounded-md bg-warning/10 px-3 py-2 text-text-primary">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
