"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Package,
  ShoppingCart,
  BarChart3,
  Megaphone,
  Store,
  Shield,
  MapPin,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ---------------------------------- motion --------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const viewport = { once: true, margin: "-80px" } as const;

/* ---------------------------------- data ---------------------------------- */

const heroStats = [
  { value: "33+", label: "Ready-to-use tools" },
  { value: "$800+", label: "Avg monthly savings" },
  { value: "20+", label: "Years BD experience" },
  { value: "Local", label: "Dallas on-site service" },
];

const expensiveTools = [
  "Hootsuite",
  "Mailchimp",
  "Monday.com",
  "Jungle Scout",
  "Canva",
  "Yelp",
  "SEMrush",
  "QuickBooks",
  "Salesforce",
  "Slack",
];

const cbrPills = ["CBR Toolkit", "One-time purchase", "AI-powered"];

const steps = [
  {
    num: "01",
    title: "Try a free tool",
    body: "Run our Subscription Stack Audit to see what you spend and how to cut it in half.",
  },
  {
    num: "02",
    title: "See the value",
    body: "Browse 33+ AI tools. Each replaces an expensive subscription.",
  },
  {
    num: "03",
    title: "Let us customize it",
    body: "$199 customization or $149 on-site visit in Dallas.",
  },
];

const categories = [
  {
    name: "Find, source & buy smarter",
    count: 8,
    Icon: Package,
    tint: "bg-info/10 text-info",
  },
  {
    name: "Sell more & sell faster",
    count: 5,
    Icon: ShoppingCart,
    tint: "bg-success/10 text-success",
  },
  {
    name: "Run the business",
    count: 5,
    Icon: BarChart3,
    tint: "bg-warning/10 text-warning",
  },
  {
    name: "Market & grow online",
    count: 5,
    Icon: Megaphone,
    tint: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  },
  {
    name: "Market & grow local",
    count: 5,
    Icon: Store,
    tint: "bg-brand-orange/10 text-brand-orange",
  },
  {
    name: "AI safety & security",
    count: 5,
    Icon: Shield,
    tint: "bg-danger/10 text-danger",
  },
];

const stories = [
  {
    emoji: "📦",
    name: "Jake",
    role: "Online reseller, 3 employees",
    monthly: 331,
    annual: 1662,
    replaced: [
      "Jungle Scout",
      "RepricerExpress",
      "InventoryLab",
      "Mailchimp",
      "Monday.com",
    ],
  },
  {
    emoji: "🍽️",
    name: "Maria",
    role: "Taqueria, 2 locations, 8 employees",
    monthly: 594,
    annual: 5368,
    replaced: ["Yelp Ads", "Hootsuite", "local SEO agency", "Stamp Me", "Canva"],
  },
  {
    emoji: "🛍️",
    name: "Priya",
    role: "Gift shop, solo owner, Deep Ellum",
    monthly: 390,
    annual: 3088,
    replaced: ["Later", "Mailchimp", "freelance social media manager"],
  },
];

const services = [
  {
    title: "Online consultation",
    price: "$99",
    blurb: "Video call. Pick a tool, set it up together.",
  },
  {
    title: "On-site visit",
    price: "$149",
    blurb: "We come to your Dallas business. Flat fee.",
  },
  {
    title: "Custom tool build",
    price: "$499+",
    blurb: "Need something specific? We'll build it.",
  },
];

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  return (
    <>
      {/* ============================ 1. HERO ============================ */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
        {/* decorative orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-orange/40 via-brand-orange/10 to-transparent blur-3xl md:-right-20"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-5xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-1.5 border-brand-orange/30 bg-brand-orange/5 px-3 py-1 text-brand-orange"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Built in Dallas for small business owners
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-text-primary md:text-6xl lg:text-7xl"
          >
            CBR Consulting —{" "}
            <span className="text-brand-orange">Your Local AI Partner</span> for
            Small Business
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-text-secondary md:text-xl"
          >
            Simple AI tools that replace the $800+/month software stack you
            barely use. One-time purchase. No contracts.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/tools/subscription-audit">
                Free AI Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base"
            >
              <Link href="/tools">Browse 33+ tools</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={stagger}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-3xl font-semibold text-text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ========================== 2. THE PROBLEM ======================== */}
      <section className="border-t border-border bg-white px-4 py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              You&apos;re spending{" "}
              <span className="text-danger">$800+/month</span> on software you
              barely use
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Most small businesses stack 8–12 subscriptions. We bundle the
              essentials into AI tools you own.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <motion.div variants={fadeUp}>
              <Card className="h-full border-danger/30 bg-danger/5">
                <CardHeader>
                  <div className="flex items-center gap-2 text-danger">
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      What you&apos;re paying for
                    </span>
                  </div>
                  <CardTitle className="mt-3 text-2xl text-text-primary md:text-3xl">
                    The subscription stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {expensiveTools.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-danger/30 bg-white text-text-primary"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-danger/20 pt-6">
                    <div className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                      Typical cost
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-danger md:text-4xl">
                      $800–$2,500/month
                    </div>
                    <div className="mt-1 text-sm text-text-secondary">
                      $9,600–$30,000 per year
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="h-full border-success/30 bg-success/5">
                <CardHeader>
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      What you could be paying
                    </span>
                  </div>
                  <CardTitle className="mt-3 text-2xl text-text-primary md:text-3xl">
                    The CBR alternative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cbrPills.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-success/30 bg-white text-text-primary"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-success/20 pt-6">
                    <div className="text-sm font-medium uppercase tracking-wider text-text-secondary">
                      Per tool
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-success md:text-4xl">
                      $29–$149
                    </div>
                    <div className="mt-1 text-sm text-text-secondary">
                      One-time. No monthly fees.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================= 3. HOW IT WORKS ======================== */}
      <section className="border-t border-border px-4 py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Three steps. No sales call required.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s) => (
              <motion.div key={s.num} variants={fadeUp} className="relative">
                <div className="pointer-events-none select-none text-[7rem] font-bold leading-none text-text-tertiary/25 md:text-[9rem]">
                  {s.num}
                </div>
                <h3 className="-mt-6 text-2xl font-semibold text-text-primary md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-base text-text-secondary">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ======================= 4. TOOL CATEGORIES ======================= */}
      <section className="border-t border-border bg-white px-4 py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              33+ tools, organized by what you need
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Six categories. Every tool replaces an expensive subscription.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ name, count, Icon, tint }) => (
              <motion.div key={name} variants={fadeUp}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${tint}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-text-primary">
                      {name}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {count} tools
                    </p>
                    <Link
                      href="/tools"
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-orange transition-transform group-hover:translate-x-1"
                    >
                      Explore tools
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ======================= 5. SAVINGS EXAMPLES ====================== */}
      <section className="border-t border-border px-4 py-20 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-success">
              <TrendingDown className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Real outcomes
              </span>
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              Real savings from real businesses
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {stories.map((s) => (
              <motion.div key={s.name} variants={fadeUp}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl" aria-hidden>
                        {s.emoji}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-text-primary">
                          {s.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {s.role}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg bg-muted/50 p-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-text-secondary">
                          Was paying
                        </span>
                        <span className="text-lg font-semibold text-danger">
                          ${s.monthly}/mo
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-sm text-text-secondary">
                          Annual savings
                        </span>
                        <span className="text-2xl font-semibold text-success">
                          ${s.annual.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                        Replaced
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.replaced.map((r) => (
                          <Badge
                            key={r}
                            variant="secondary"
                            className="font-normal"
                          >
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================= 6. DALLAS LOCAL ======================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3a2a] via-[#0d2e24] to-bg-dark px-4 py-20 text-white md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-success/10 blur-3xl"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-success">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Dallas–Fort Worth
              </span>
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              We&apos;re in Dallas. We come to you.
            </h2>
            <p className="mt-5 text-lg text-white/70">
              Try calling Salesforce and asking them to visit your office for
              $149.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {services.map((svc) => (
              <motion.div key={svc.title} variants={fadeUp}>
                <Card className="h-full border-white/10 bg-white/5 text-white backdrop-blur">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="text-sm font-semibold uppercase tracking-wider text-success">
                      {svc.title}
                    </div>
                    <div className="mt-3 text-4xl font-semibold">{svc.price}</div>
                    <p className="mt-3 text-sm text-white/70">{svc.blurb}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/services">
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================== 7. FINAL CTA ========================== */}
      <section className="border-t border-border bg-white px-4 py-24 md:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-6xl"
          >
            Ready to cut your software costs in half?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 flex max-w-xl items-center justify-center gap-2 text-lg text-text-secondary"
          >
            <Clock className="h-5 w-5 text-brand-orange" />
            Free audit. Takes 2 minutes. No signup required.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-base md:text-lg"
            >
              <Link href="/tools/subscription-audit">
                Start your free audit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
