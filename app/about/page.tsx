import { MapPin, Clock3, BadgeCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="px-4 py-14 md:py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          About CBR Consulting
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          CBR Consulting helps small businesses apply AI in ways that lower costs, speed up operations, and stay easy to maintain.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-5">
            <MapPin className="h-5 w-5 text-brand-orange" />
            <h2 className="mt-3 text-lg font-semibold">Local support</h2>
            <p className="mt-2 text-sm text-text-secondary">Based in Dallas and serving the DFW metro area.</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <Clock3 className="h-5 w-5 text-brand-orange" />
            <h2 className="mt-3 text-lg font-semibold">Fast implementation</h2>
            <p className="mt-2 text-sm text-text-secondary">Projects focus on near-term ROI, usually in weeks not quarters.</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <BadgeCheck className="h-5 w-5 text-brand-orange" />
            <h2 className="mt-3 text-lg font-semibold">Practical outcomes</h2>
            <p className="mt-2 text-sm text-text-secondary">Solutions are designed for real operators, not demo-only use cases.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
