import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVICE_ITEMS = [
  {
    title: "AI Setup Session",
    price: "$99",
    detail: "A focused online session to launch one high-value workflow.",
  },
  {
    title: "On-Site Enablement",
    price: "$149",
    detail: "In-person setup in Dallas-Fort Worth with team handoff.",
  },
  {
    title: "Custom Tool Build",
    price: "$499+",
    detail: "Purpose-built automation for your internal process or sales flow.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="px-4 py-14 md:py-20">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Practical AI services for small teams
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-text-secondary">
          Services are scoped to produce measurable savings fast, without locking the business into long contracts.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICE_ITEMS.map((service) => (
            <Card key={service.title} className="h-full border-border/70">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-brand-orange">{service.price}</p>
                <p className="mt-3 text-sm text-text-secondary">{service.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-success/30 bg-success/5 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
            <p className="text-sm text-text-primary">
              Need help selecting the right starting point? A quick consult can map the best first tool based on current software spend and team capacity.
            </p>
          </div>
          <Button asChild className="mt-5">
            <Link href="/contact">
              Contact consulting
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
