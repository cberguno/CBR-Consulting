// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

/* ------------------------------------------------------------------ */
/* Brand palette                                                       */
/* ------------------------------------------------------------------ */

export const BRAND = {
  accent: "#D85A30",
  dark: "#1A1A18",
  green: "#1D9E75",
  red: "#E24B4A",
  amber: "#BA7517",
  bg: "#FAFAF7",
  card: "#FFFFFF",
  border: "#E8E6DF",
  textSecondary: "#6B6B65",
  textTertiary: "#A3A39D",
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const CATEGORIES = [
  "Marketing",
  "Sales",
  "Operations",
  "Accounting",
  "AI",
  "Design",
  "Communication",
  "Security",
  "HR",
  "Other",
];

export const CAT_COLORS = {
  Marketing: "#D85A30",
  Sales: "#378ADD",
  Operations: "#1D9E75",
  Accounting: "#BA7517",
  AI: "#8B5CF6",
  Design: "#EC4899",
  Communication: "#06B6D4",
  Security: "#64748B",
  HR: "#F59E0B",
  Other: "#6B6B65",
};

/* ------------------------------------------------------------------ */
/* Known tools database (67 entries)                                   */
/* Fields: name, cost (monthly USD), category, utilization (1-10),     */
/*   cbrTool (string|null), cbrPrice (number|null),                    */
/*   replaces (string|null)                                            */
/* ------------------------------------------------------------------ */

export const KNOWN_TOOLS = [
  // Social scheduling → Social Post Factory
  { name: "Hootsuite", cost: 49, category: "Marketing", utilization: 5, cbrTool: "Social Post Factory", cbrPrice: 49, replaces: "Social scheduling & analytics" },
  { name: "Buffer", cost: 36, category: "Marketing", utilization: 6, cbrTool: "Social Post Factory", cbrPrice: 49, replaces: "Social scheduling & analytics" },
  { name: "Later", cost: 25, category: "Marketing", utilization: 6, cbrTool: "Social Post Factory", cbrPrice: 49, replaces: "Social scheduling & analytics" },

  // Email → Email Campaign Builder
  { name: "Mailchimp", cost: 20, category: "Marketing", utilization: 7, cbrTool: "Email Campaign Builder", cbrPrice: 49, replaces: "Email marketing & automations" },
  { name: "Constant Contact", cost: 35, category: "Marketing", utilization: 6, cbrTool: "Email Campaign Builder", cbrPrice: 49, replaces: "Email marketing & automations" },
  { name: "Klaviyo", cost: 45, category: "Marketing", utilization: 7, cbrTool: "Email Campaign Builder", cbrPrice: 49, replaces: "Email marketing & automations" },

  // Design / AI content → Social Post Factory
  { name: "Canva Pro", cost: 15, category: "Design", utilization: 8, cbrTool: "Social Post Factory", cbrPrice: 49, replaces: "Graphic design for social" },
  { name: "Jasper AI", cost: 49, category: "AI", utilization: 4, cbrTool: "Social Post Factory", cbrPrice: 49, replaces: "AI copywriting for social" },

  // Amazon / reseller suite
  { name: "Jungle Scout", cost: 49, category: "Sales", utilization: 5, cbrTool: "Deal Scout", cbrPrice: 79, replaces: "Product research & scoring" },
  { name: "Keepa", cost: 19, category: "Sales", utilization: 6, cbrTool: "Price Check Pulse", cbrPrice: 49, replaces: "Price history & deal alerts" },
  { name: "RepricerExpress", cost: 85, category: "Sales", utilization: 7, cbrTool: "Repricer Lite", cbrPrice: 79, replaces: "Automated repricing" },
  { name: "InventoryLab", cost: 69, category: "Operations", utilization: 6, cbrTool: "Restock Radar", cbrPrice: 79, replaces: "Inventory & restock planning" },
  { name: "RestockPro", cost: 59, category: "Operations", utilization: 6, cbrTool: "Restock Radar", cbrPrice: 79, replaces: "Inventory & restock planning" },
  { name: "SellerBoard", cost: 19, category: "Operations", utilization: 6, cbrTool: "Channel P&L Tracker", cbrPrice: 79, replaces: "Channel-level P&L tracking" },
  { name: "Listing Mirror", cost: 29, category: "Operations", utilization: 6, cbrTool: "Listing Launcher", cbrPrice: 79, replaces: "Multi-channel listings" },

  // Project mgmt → Task Pilot
  { name: "Monday.com", cost: 24, category: "Operations", utilization: 6, cbrTool: "Task Pilot", cbrPrice: 29, replaces: "Team task tracking" },
  { name: "ClickUp", cost: 19, category: "Operations", utilization: 5, cbrTool: "Task Pilot", cbrPrice: 29, replaces: "Team task tracking" },
  { name: "Asana", cost: 25, category: "Operations", utilization: 6, cbrTool: "Task Pilot", cbrPrice: 29, replaces: "Team task tracking" },
  { name: "Trello", cost: 10, category: "Operations", utilization: 7, cbrTool: "Task Pilot", cbrPrice: 29, replaces: "Team task tracking" },

  // CRM → Customer Follow-Up Engine
  { name: "HubSpot CRM", cost: 50, category: "Sales", utilization: 5, cbrTool: "Customer Follow-Up Engine", cbrPrice: 49, replaces: "CRM & follow-up sequences" },
  { name: "Salesforce", cost: 75, category: "Sales", utilization: 5, cbrTool: "Customer Follow-Up Engine", cbrPrice: 49, replaces: "CRM & follow-up sequences" },

  // Proposals → Proposal & Quote Generator
  { name: "Proposify", cost: 49, category: "Sales", utilization: 5, cbrTool: "Proposal & Quote Generator", cbrPrice: 49, replaces: "Proposal & quote templates" },
  { name: "PandaDoc", cost: 35, category: "Sales", utilization: 6, cbrTool: "Proposal & Quote Generator", cbrPrice: 49, replaces: "Proposal & quote templates" },

  // Local / reviews → Google Business Booster
  { name: "Yelp Business", cost: 150, category: "Marketing", utilization: 3, cbrTool: "Google Business Booster", cbrPrice: 79, replaces: "Local listings & reviews" },

  // SEO → SEO Listing Optimizer
  { name: "SEMrush", cost: 130, category: "Marketing", utilization: 4, cbrTool: "SEO Listing Optimizer", cbrPrice: 49, replaces: "SEO research & tracking" },
  { name: "Ahrefs", cost: 99, category: "Marketing", utilization: 4, cbrTool: "SEO Listing Optimizer", cbrPrice: 49, replaces: "SEO research & tracking" },
  { name: "Moz Pro", cost: 99, category: "Marketing", utilization: 4, cbrTool: "SEO Listing Optimizer", cbrPrice: 49, replaces: "SEO research & tracking" },

  // Ads → Ad Spend Analyzer
  { name: "AdEspresso", cost: 49, category: "Marketing", utilization: 4, cbrTool: "Ad Spend Analyzer", cbrPrice: 79, replaces: "Ad creative & reporting" },

  // Restaurant menu → Menu & Price Board Builder
  { name: "MustHaveMenus", cost: 29, category: "Marketing", utilization: 6, cbrTool: "Menu & Price Board Builder", cbrPrice: 49, replaces: "Menu design & printing" },

  // Loyalty → Loyalty & Repeat Visit Tracker
  { name: "Stamp Me", cost: 45, category: "Marketing", utilization: 5, cbrTool: "Loyalty & Repeat Visit Tracker", cbrPrice: 49, replaces: "Loyalty & repeat-visit program" },
  { name: "FiveStars", cost: 100, category: "Marketing", utilization: 5, cbrTool: "Loyalty & Repeat Visit Tracker", cbrPrice: 49, replaces: "Loyalty & repeat-visit program" },

  // No replacement — accounting
  { name: "QuickBooks", cost: 30, category: "Accounting", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "FreshBooks", cost: 19, category: "Accounting", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Wave", cost: 0, category: "Accounting", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Xero", cost: 40, category: "Accounting", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — AI
  { name: "ChatGPT Plus", cost: 20, category: "AI", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — commerce platforms
  { name: "Shopify", cost: 39, category: "Sales", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "BigCommerce", cost: 39, category: "Sales", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Etsy Plus", cost: 10, category: "Sales", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "DoorDash Merchant", cost: 62, category: "Sales", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "UberEats Merchant", cost: 50, category: "Sales", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — communication / meetings
  { name: "Zoom", cost: 15, category: "Communication", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Slack", cost: 13, category: "Communication", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Google Workspace", cost: 7, category: "Communication", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Microsoft 365", cost: 12, category: "Communication", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Calendly", cost: 12, category: "Sales", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — POS / ops / staff
  { name: "Toast POS", cost: 79, category: "Operations", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Square POS", cost: 29, category: "Operations", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "7Shifts", cost: 35, category: "HR", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Homebase", cost: 25, category: "HR", utilization: 8, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Gusto", cost: 46, category: "HR", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — security / utilities
  { name: "1Password", cost: 8, category: "Security", utilization: 9, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "NordVPN", cost: 9, category: "Security", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Toggl", cost: 10, category: "Operations", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — chat / support
  { name: "Intercom", cost: 89, category: "Communication", utilization: 5, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Drift", cost: 79, category: "Communication", utilization: 5, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Zendesk", cost: 69, category: "Communication", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Freshdesk", cost: 35, category: "Communication", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Tidio", cost: 29, category: "Communication", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "LiveChat", cost: 49, category: "Communication", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Crisp", cost: 25, category: "Communication", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — website builders (used in report logic, not replaced)
  { name: "Wix", cost: 17, category: "Operations", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Squarespace", cost: 27, category: "Operations", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "Weebly", cost: 16, category: "Operations", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "GoDaddy Website", cost: 22, category: "Operations", utilization: 6, cbrTool: null, cbrPrice: null, replaces: null },
  { name: "WordPress.com", cost: 25, category: "Operations", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },

  // No replacement — design suite
  { name: "Adobe Creative Cloud", cost: 55, category: "Design", utilization: 7, cbrTool: null, cbrPrice: null, replaces: null },
];

/* ------------------------------------------------------------------ */
/* Industry presets — arrays of tool names from KNOWN_TOOLS            */
/* ------------------------------------------------------------------ */

export const INDUSTRY_PRESETS = {
  "Online Reseller": [
    "Jungle Scout",
    "Keepa",
    "RepricerExpress",
    "InventoryLab",
    "Mailchimp",
    "Canva Pro",
    "Monday.com",
    "ChatGPT Plus",
    "QuickBooks",
  ],
  Restaurant: [
    "Yelp Business",
    "Constant Contact",
    "Hootsuite",
    "Canva Pro",
    "MustHaveMenus",
    "7Shifts",
    "Toast POS",
    "DoorDash Merchant",
  ],
  "Retail Shop": [
    "Later",
    "Mailchimp",
    "Canva Pro",
    "Square POS",
    "Etsy Plus",
    "Google Workspace",
    "ChatGPT Plus",
  ],
  "Professional Services": [
    "HubSpot CRM",
    "Proposify",
    "Mailchimp",
    "Calendly",
    "Zoom",
    "Slack",
    "QuickBooks",
    "ChatGPT Plus",
  ],
};

/* ------------------------------------------------------------------ */
/* Popular quick-add buttons (8)                                       */
/* ------------------------------------------------------------------ */

export const POPULAR_QUICK_ADD = [
  "Hootsuite",
  "Mailchimp",
  "Monday.com",
  "ChatGPT Plus",
  "Canva Pro",
  "QuickBooks",
  "Jungle Scout",
  "Shopify",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

let __uid = 0;
export function uid() {
  __uid += 1;
  return `sub_${Date.now().toString(36)}_${__uid}`;
}

export function findKnownTool(name) {
  if (!name) return null;
  const target = String(name).trim().toLowerCase();
  if (!target) return null;
  return (
    KNOWN_TOOLS.find((t) => t.name.toLowerCase() === target) ||
    KNOWN_TOOLS.find((t) => t.name.toLowerCase().startsWith(target)) ||
    KNOWN_TOOLS.find((t) => t.name.toLowerCase().includes(target)) ||
    null
  );
}

const currencyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(n) {
  const v = Number(n);
  if (!isFinite(v)) return "$0";
  return currencyFmt.format(Math.round(v));
}

/* ------------------------------------------------------------------ */
/* AnimatedNumber — requestAnimationFrame count-up                     */
/* ------------------------------------------------------------------ */

export function AnimatedNumber({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  format,
  style,
}) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef(null);
  const fromRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const target = Number(value) || 0;
    fromRef.current = displayed;
    startRef.current = 0;

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (target - fromRef.current) * eased;
      setDisplayed(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayed(target);
        rafRef.current = null;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  const rounded = Math.round(displayed);
  const rendered =
    typeof format === "function" ? format(rounded) : rounded.toLocaleString("en-US");

  return (
    <span style={style}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* UtilBar — utilization progress bar                                  */
/*   green  utilization >= 7                                           */
/*   amber  utilization >= 4                                           */
/*   red    utilization <  4                                           */
/* ------------------------------------------------------------------ */

export function UtilBar({ utilization, width = 120, height = 6, showLabel = false }) {
  const u = Math.max(0, Math.min(10, Number(utilization) || 0));
  const pct = u * 10;
  const color = u >= 7 ? BRAND.green : u >= 4 ? BRAND.amber : BRAND.red;
  const label = u >= 7 ? "Well used" : u >= 4 ? "Partial" : "Underused";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <div
        aria-label={`Utilization ${u} of 10`}
        style={{
          width,
          height,
          background: BRAND.border,
          borderRadius: 999,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 999,
            transition: "width 300ms ease-out",
          }}
        />
      </div>
      {showLabel && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component — scaffold only. UI will be filled in next pass.     */
/* ------------------------------------------------------------------ */

export default function SubscriptionStackAudit() {
  const [screen, setScreen] = useState("input");
  const [subscriptions, setSubscriptions] = useState([]);

  // Touch the imports so the bundler keeps them and types resolve.
  // These will all be used by the real UI in the next pass.
  const _unused = useMemo(
    () => [PieChart, Pie, Cell, ResponsiveContainer, Tooltip],
    []
  );
  void _unused;

  const toggleScreen = () =>
    setScreen((s) => (s === "input" ? "report" : "input"));

  const loadSample = () => {
    const sample = INDUSTRY_PRESETS["Online Reseller"]
      .map((name) => {
        const t = findKnownTool(name);
        return t
          ? {
              id: uid(),
              name: t.name,
              cost: t.cost,
              category: t.category,
              utilization: t.utilization,
              cbrTool: t.cbrTool,
              cbrPrice: t.cbrPrice,
              replaces: t.replaces,
            }
          : null;
      })
      .filter(Boolean);
    setSubscriptions(sample);
  };

  return (
    <div
      style={{
        background: BRAND.bg,
        minHeight: "100vh",
        color: BRAND.dark,
        fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          background: BRAND.card,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 16,
          padding: 32,
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: BRAND.accent,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          CBR Consulting
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: "0 0 12px",
            color: BRAND.dark,
          }}
        >
          Subscription Stack Audit
        </h1>
        <p style={{ color: BRAND.textSecondary, margin: 0 }}>
          Data and helpers loaded ({KNOWN_TOOLS.length} known tools,{" "}
          {Object.keys(INDUSTRY_PRESETS).length} industry presets). UI coming
          next.
        </p>
        <p style={{ color: BRAND.textTertiary, fontSize: 13, marginTop: 16 }}>
          Current screen: <code>{screen}</code> · Subscriptions loaded:{" "}
          {subscriptions.length}
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <button
            type="button"
            onClick={loadSample}
            style={{
              background: BRAND.accent,
              color: "#fff",
              border: 0,
              borderRadius: 8,
              padding: "10px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Load sample stack
          </button>
          <button
            type="button"
            onClick={toggleScreen}
            style={{
              background: "transparent",
              color: BRAND.dark,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 8,
              padding: "10px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Toggle screen
          </button>
        </div>
        <div style={{ marginTop: 20 }}>
          <AnimatedNumber
            value={subscriptions.reduce((s, x) => s + (x.cost || 0), 0)}
            prefix="$"
            suffix="/mo"
            style={{ fontSize: 32, fontWeight: 700, color: BRAND.green }}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <UtilBar utilization={7} showLabel />
        </div>
      </div>
    </div>
  );
}
