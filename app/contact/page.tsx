import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="px-4 py-14 md:py-20">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Contact CBR Consulting
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          Share current pain points, software spend, and top priorities to get a focused recommendation.
        </p>

        <div className="mt-10 grid gap-4">
          <article className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 text-text-primary">
              <Mail className="h-5 w-5 text-brand-orange" />
              <p className="font-medium">Email</p>
            </div>
            <p className="mt-2 text-sm text-text-secondary">Reach the team directly to schedule a consultation.</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 text-text-primary">
              <Phone className="h-5 w-5 text-brand-orange" />
              <p className="font-medium">Call or text</p>
            </div>
            <p className="mt-2 text-sm text-text-secondary">Available for Dallas-Fort Worth businesses looking for quick support.</p>
          </article>
        </div>

        <Button asChild className="mt-8">
          <Link href="/pricing">
            Try the AI Pricing Tool
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
