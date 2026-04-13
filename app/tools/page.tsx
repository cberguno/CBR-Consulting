"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Search, Sparkles, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* ---------------------------------- motion --------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

/* ---------------------------------- types ---------------------------------- */

type CategoryId =
  | "all"
  | "sourcing"
  | "selling"
  | "operations"
  | "digital"
  | "local"
  | "safety";

type Tool = {
  name: string;
  price: string; // "$29" | "$49" | "$79" | "FREE"
  hook: string;
  replaces: { name: string; monthly: number } | null;
  industries: [string, string];
  category: Exclude<CategoryId, "all">;
  slug?: string; // present => LIVE
};

/* ---------------------------------- data ---------------------------------- */

const CATEGORY_META: Record<
  Exclude<CategoryId, "all">,
  { label: string; dot: string }
> = {
  sourcing: { label: "Find & source", dot: "bg-info" },
  selling: { label: "Sell faster", dot: "bg-success" },
  operations: { label: "Run the business", dot: "bg-warning" },
  digital: { label: "Market online", dot: "bg-[#8b5cf6]" },
  local: { label: "Market local", dot: "bg-brand-orange" },
  safety: { label: "AI safety", dot: "bg-danger" },
};

const TOOLS: Tool[] = [
  // ----- FIND & SOURCE -----
  {
    name: "Deal Scout",
    price: "$79",
    hook: "Get a daily shortlist of products worth buying, matched to your margins.",
    replaces: { name: "Jungle Scout", monthly: 49 },
    industries: ["Online retail", "Wholesale"],
    category: "sourcing",
  },
  {
    name: "Supplier Scoreboard",
    price: "$49",
    hook: "Know which suppliers make you money and which waste your time.",
    replaces: null,
    industries: ["Restaurants", "Retail"],
    category: "sourcing",
  },
  {
    name: "Price Check Pulse",
    price: "$49",
    hook: "See what it sells for across channels and your real margin.",
    replaces: { name: "Keepa", monthly: 19 },
    industries: ["Resellers", "Thrift"],
    category: "sourcing",
  },
  {
    name: "Restock Radar",
    price: "$79",
    hook: "AI reorder alerts based on your actual sales velocity.",
    replaces: { name: "RestockPro", monthly: 59 },
    industries: ["Any seller", "Local shops"],
    category: "sourcing",
  },
  {
    name: "Margin Calculator Pro",
    price: "$49",
    hook: "See your REAL profit after every fee, shipping cost, and tax.",
    replaces: null,
    industries: ["Multi-channel", "Amazon"],
    category: "sourcing",
    slug: "margin-calculator",
  },
  {
    name: "Buy or Pass Scorecard",
    price: "$49",
    hook: "Clear yes/no score based on margins, competition, and cash.",
    replaces: null,
    industries: ["Arbitrage", "Wholesale"],
    category: "sourcing",
  },
  {
    name: "Purchase Order Builder",
    price: "$29",
    hook: "Create professional POs in 60 seconds.",
    replaces: null,
    industries: ["Wholesale", "Restaurants"],
    category: "sourcing",
  },
  {
    name: "Cash Flow Forecaster",
    price: "$79",
    hook: "See how much cash you'll have next week, month, quarter.",
    replaces: null,
    industries: ["Any business", "Seasonal"],
    category: "sourcing",
  },

  // ----- SELL FASTER -----
  {
    name: "Listing Launcher",
    price: "$79",
    hook: "Product photo to optimized listings for Amazon, eBay, your site.",
    replaces: { name: "Listing Mirror", monthly: 29 },
    industries: ["Multi-channel", "E-commerce"],
    category: "selling",
  },
  {
    name: "Repricer Lite",
    price: "$79",
    hook: "Daily pricing suggestions based on what competitors charge.",
    replaces: { name: "RepricerExpress", monthly: 85 },
    industries: ["Amazon", "eBay"],
    category: "selling",
  },
  {
    name: "Customer Follow-Up Engine",
    price: "$49",
    hook: "Turn one-time buyers into repeat customers automatically.",
    replaces: null,
    industries: ["Local shops", "Service"],
    category: "selling",
  },
  {
    name: "Promo Planner",
    price: "$49",
    hook: "A calendar that tells you what to discount, when, and how much.",
    replaces: null,
    industries: ["Retail", "Seasonal"],
    category: "selling",
  },
  {
    name: "Proposal & Quote Generator",
    price: "$49",
    hook: "Professional branded quotes in minutes not hours.",
    replaces: { name: "Proposify", monthly: 49 },
    industries: ["B2B", "Services"],
    category: "selling",
  },

  // ----- RUN THE BUSINESS -----
  {
    name: "Daily Dashboard",
    price: "$79",
    hook: "One screen: what sold, what is low, what needs shipping, how much you made.",
    replaces: null,
    industries: ["Any business", "Multi-channel"],
    category: "operations",
    slug: "daily-dashboard",
  },
  {
    name: "Channel P&L Tracker",
    price: "$79",
    hook: "Know which sales channel actually makes you money.",
    replaces: null,
    industries: ["Multi-channel", "Marketplace"],
    category: "operations",
  },
  {
    name: "Task Pilot",
    price: "$29",
    hook: "A daily task list built around what drives revenue.",
    replaces: { name: "Monday.com", monthly: 24 },
    industries: ["Solo operators", "Small teams"],
    category: "operations",
  },
  {
    name: "Subscription Stack Audit",
    price: "FREE",
    hook: "See exactly how much you spend on software and how to cut it.",
    replaces: null,
    industries: ["Any business", "Free tool"],
    category: "operations",
    slug: "subscription-audit",
  },
  {
    name: "Competitor Watch",
    price: "$79",
    hook: "Know what competitors sell, at what price, and where.",
    replaces: null,
    industries: ["E-commerce", "Local retail"],
    category: "operations",
  },

  // ----- MARKET ONLINE -----
  {
    name: "Social Post Factory",
    price: "$49",
    hook: "Product to scroll-stopping social posts in 2 minutes.",
    replaces: { name: "Hootsuite", monthly: 49 },
    industries: ["Any seller", "E-commerce"],
    category: "digital",
    slug: "social-post-factory",
  },
  {
    name: "SEO Listing Optimizer",
    price: "$49",
    hook: "Get found on Google Shopping without an SEO expert.",
    replaces: { name: "SEMrush", monthly: 130 },
    industries: ["E-commerce", "Shopify"],
    category: "digital",
  },
  {
    name: "Email Campaign Builder",
    price: "$49",
    hook: "New arrivals emails that get opened, built from your inventory.",
    replaces: { name: "Mailchimp", monthly: 20 },
    industries: ["Online retailers", "B2B"],
    category: "digital",
  },
  {
    name: "Ad Spend Analyzer",
    price: "$79",
    hook: "See which ads make money and which burn cash.",
    replaces: { name: "AdEspresso", monthly: 49 },
    industries: ["Facebook Ads", "Google Ads"],
    category: "digital",
  },
  {
    name: "Online Reputation Manager",
    price: "$49",
    hook: "More 5-star reviews, respond to bad ones fast.",
    replaces: null,
    industries: ["E-commerce", "Amazon"],
    category: "digital",
  },

  // ----- MARKET LOCAL -----
  {
    name: "Google Business Booster",
    price: "$79",
    hook: "Show up when locals search near me.",
    replaces: { name: "SEO agency", monthly: 200 },
    industries: ["Any local", "Restaurants"],
    category: "local",
    slug: "google-business-booster",
  },
  {
    name: "Foot Traffic Promo Engine",
    price: "$49",
    hook: "Fill empty hours with paying customers.",
    replaces: null,
    industries: ["Restaurants", "Salons"],
    category: "local",
  },
  {
    name: "Menu & Price Board Builder",
    price: "$49",
    hook: "Update your menu in minutes, print and digital ready.",
    replaces: { name: "MustHaveMenus", monthly: 29 },
    industries: ["Restaurants", "Cafes"],
    category: "local",
  },
  {
    name: "Loyalty & Repeat Visit Tracker",
    price: "$49",
    hook: "Know your regulars and send them reasons to come back.",
    replaces: { name: "FiveStars", monthly: 100 },
    industries: ["Restaurants", "Coffee shops"],
    category: "local",
  },
  {
    name: "Local Event & Seasonal Calendar",
    price: "$49",
    hook: "Never miss a local event, get promos for each one.",
    replaces: null,
    industries: ["Any local", "Retail"],
    category: "local",
  },

  // ----- AI SAFETY -----
  {
    name: "AI Safety Checklist",
    price: "$29",
    hook: "Make sure you are not leaking data to AI tools.",
    replaces: null,
    industries: ["Any business", "Compliance"],
    category: "safety",
  },
  {
    name: "Data Privacy Scanner",
    price: "$29",
    hook: "Flag sensitive info before you feed it to AI.",
    replaces: null,
    industries: ["Healthcare", "Legal"],
    category: "safety",
  },
  {
    name: "AI Policy Generator",
    price: "$29",
    hook: "AI usage policy for your business in plain English.",
    replaces: null,
    industries: ["HR", "Compliance"],
    category: "safety",
  },
  {
    name: "Vendor AI Risk Scorecard",
    price: "$29",
    hook: "Score any vendor AI practices before you sign up.",
    replaces: null,
    industries: ["Procurement", "IT"],
    category: "safety",
  },
  {
    name: "Phishing & Scam Detector",
    price: "$29",
    hook: "Paste any suspicious message, real or scam?",
    replaces: null,
    industries: ["Any business", "Non-tech owners"],
    category: "safety",
  },
];

const FILTERS: { id: CategoryId; label: string; count: number; dot: string }[] =
  [
    { id: "all", label: "All tools", count: TOOLS.length, dot: "bg-text-primary" },
    {
      id: "sourcing",
      label: "Find & source",
      count: TOOLS.filter((t) => t.category === "sourcing").length,
      dot: CATEGORY_META.sourcing.dot,
    },
    {
      id: "selling",
      label: "Sell faster",
      count: TOOLS.filter((t) => t.category === "selling").length,
      dot: CATEGORY_META.selling.dot,
    },
    {
      id: "operations",
      label: "Run the business",
      count: TOOLS.filter((t) => t.category === "operations").length,
      dot: CATEGORY_META.operations.dot,
    },
    {
      id: "digital",
      label: "Market online",
      count: TOOLS.filter((t) => t.category === "digital").length,
      dot: CATEGORY_META.digital.dot,
    },
    {
      id: "local",
      label: "Market local",
      count: TOOLS.filter((t) => t.category === "local").length,
      dot: CATEGORY_META.local.dot,
    },
    {
      id: "safety",
      label: "AI safety",
      count: TOOLS.filter((t) => t.category === "safety").length,
      dot: CATEGORY_META.safety.dot,
    },
  ];

/* --------------------------------- helpers --------------------------------- */

function priceBadgeClass(price: string) {
  if (price === "FREE") {
    return "border-success/30 bg-success/10 text-success";
  }
  return "border-border bg-white text-text-primary";
}

function annualSavings(monthly: number) {
  return (monthly * 12).toLocaleString();
}

/* ---------------------------------- page ---------------------------------- */

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory =
        activeFilter === "all" || tool.category === activeFilter;
      const matchesQuery = q === "" || tool.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-bg-dark px-4 pb-16 pt-20 text-white md:pb-20 md:pt-28">
        {/* decorative orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-orange/40 via-brand-orange/10 to-transparent blur-3xl md:-right-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-success/10 blur-3xl"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-1.5 border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-brand-orange"
            >
              <Sparkles className="h-3.5 w-3.5" />
              33 AI tools. One-time purchase.
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
          >
            AI-powered tools for every part of your business
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/70 md:text-xl"
          >
            33 tools that replace expensive subscriptions. One-time purchase. No
            monthly fees.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 flex w-full max-w-xl items-center"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools by name…"
                aria-label="Search tools"
                className="h-12 rounded-full border-white/15 bg-white/10 pl-11 pr-4 text-base text-white placeholder:text-white/50 focus-visible:border-brand-orange/60 focus-visible:ring-brand-orange/30"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================= CATEGORY FILTERS ======================= */}
      <section className="sticky top-16 z-30 border-b border-border bg-bg-page/90 px-4 py-5 backdrop-blur">
        <div className="mx-auto max-w-6xl">
          <div
            role="tablist"
            aria-label="Filter tools by category"
            className="flex flex-wrap items-center justify-start gap-2 md:justify-center"
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(f.id)}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "border-text-primary bg-text-primary text-white shadow-sm"
                      : "border-border bg-white text-text-secondary hover:border-text-primary/30 hover:text-text-primary"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 w-2 rounded-full",
                      f.dot,
                      active && f.id === "all" && "bg-white"
                    )}
                  />
                  {f.id === "all" ? (
                    <span>{f.label}</span>
                  ) : (
                    <span>
                      {f.label}{" "}
                      <span
                        className={cn(
                          "ml-0.5 tabular-nums",
                          active ? "text-white/70" : "text-text-tertiary"
                        )}
                      >
                        ({f.count})
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ TOOL GRID ============================ */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* results meta */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Showing{" "}
              <span className="font-semibold text-text-primary tabular-nums">
                {filteredTools.length}
              </span>{" "}
              {filteredTools.length === 1 ? "tool" : "tools"}
              {activeFilter !== "all" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-text-primary">
                    {CATEGORY_META[activeFilter as Exclude<CategoryId, "all">]
                      .label}
                  </span>
                </>
              )}
              {query.trim() !== "" && (
                <>
                  {" "}
                  matching{" "}
                  <span className="font-semibold text-text-primary">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </>
              )}
            </p>
          </div>

          {filteredTools.length === 0 ? (
            <div className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-white p-10 text-center">
              <div className="text-lg font-semibold text-text-primary">
                No tools match your search
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Try a different keyword or clear the filter.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveFilter("all");
                }}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${activeFilter}-${query}`}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTools.map((tool) => {
                const isLive = Boolean(tool.slug);
                const meta = CATEGORY_META[tool.category];
                return (
                  <motion.div
                    key={tool.name}
                    variants={fadeUp}
                    layout
                    className="h-full"
                  >
                    <Card
                      className={cn(
                        "group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md",
                        isLive
                          ? "border-brand-orange/60 ring-1 ring-brand-orange/20"
                          : "border-border"
                      )}
                    >
                      <CardContent className="flex h-full flex-col p-6 pt-6">
                        {/* category dot + LIVE ribbon */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
                            <span
                              aria-hidden
                              className={cn("h-2 w-2 rounded-full", meta.dot)}
                            />
                            {meta.label}
                          </div>
                          {isLive && (
                            <Badge className="border-transparent bg-brand-orange px-2 py-0.5 text-[10px] uppercase tracking-wider text-white hover:bg-brand-orange">
                              Live
                            </Badge>
                          )}
                        </div>

                        {/* name + price */}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold leading-tight text-text-primary">
                            {tool.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums",
                              priceBadgeClass(tool.price)
                            )}
                          >
                            {tool.price === "FREE" ? "Free" : tool.price}
                          </Badge>
                        </div>

                        {/* hook */}
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                          {tool.hook}
                        </p>

                        {/* replaces row */}
                        {tool.replaces && (
                          <div className="mt-4 flex items-start gap-2 rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-xs">
                            <TrendingDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                            <div className="text-text-secondary">
                              Replaces{" "}
                              <span className="font-semibold text-text-primary">
                                {tool.replaces.name}
                              </span>{" "}
                              (${tool.replaces.monthly}/mo) ·{" "}
                              <span className="font-semibold text-success">
                                Save ${annualSavings(tool.replaces.monthly)}/yr
                              </span>
                            </div>
                          </div>
                        )}

                        {/* industry tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {tool.industries.map((industry) => (
                            <Badge
                              key={industry}
                              variant="secondary"
                              className="font-normal"
                            >
                              {industry}
                            </Badge>
                          ))}
                        </div>

                        {/* footer CTA */}
                        <div className="mt-auto pt-6">
                          {isLive ? (
                            <Link
                              href={`/tools/${tool.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange transition-transform group-hover:translate-x-1"
                            >
                              Try it
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center text-sm font-medium text-text-tertiary">
                              Coming soon
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
