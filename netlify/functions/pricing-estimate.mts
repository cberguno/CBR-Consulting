import OpenAI from "openai";

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

type PricingRequest = {
  businessName: string;
  industry: string;
  offeringType: "product" | "service" | "subscription" | "hybrid";
  monthlyCosts: number;
  monthlySales: number;
  desiredMargin: number;
  competitorLow?: number;
  competitorHigh?: number;
  marketPosition: "budget" | "balanced" | "premium";
  urgency: "fast" | "normal" | "strategic";
  notes?: string;
};

type PricingResponse = {
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

const MAX_BODY_CHARS = 1500;

function toFiniteNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeRequest(payload: unknown): PricingRequest | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const body = payload as Record<string, unknown>;
  const businessName = String(body.businessName ?? "").trim();
  const industry = String(body.industry ?? "").trim();
  const offeringType = String(body.offeringType ?? "") as PricingRequest["offeringType"];
  const monthlyCosts = toFiniteNumber(body.monthlyCosts);
  const monthlySales = toFiniteNumber(body.monthlySales);
  const desiredMargin = toFiniteNumber(body.desiredMargin);
  const marketPosition = String(body.marketPosition ?? "") as PricingRequest["marketPosition"];
  const urgency = String(body.urgency ?? "") as PricingRequest["urgency"];
  const competitorLow = body.competitorLow === "" ? null : toFiniteNumber(body.competitorLow);
  const competitorHigh = body.competitorHigh === "" ? null : toFiniteNumber(body.competitorHigh);
  const notes = String(body.notes ?? "").trim().slice(0, MAX_BODY_CHARS);

  if (!businessName || !industry) {
    return null;
  }

  if (!["product", "service", "subscription", "hybrid"].includes(offeringType)) {
    return null;
  }

  if (!["budget", "balanced", "premium"].includes(marketPosition)) {
    return null;
  }

  if (!["fast", "normal", "strategic"].includes(urgency)) {
    return null;
  }

  if (monthlyCosts === null || monthlySales === null || desiredMargin === null) {
    return null;
  }

  if (monthlyCosts < 0 || monthlyCosts > 50000000) {
    return null;
  }

  if (monthlySales <= 0 || monthlySales > 1000000) {
    return null;
  }

  if (desiredMargin < 1 || desiredMargin > 90) {
    return null;
  }

  if (competitorLow !== null && competitorLow < 0) {
    return null;
  }

  if (competitorHigh !== null && competitorHigh < 0) {
    return null;
  }

  if (
    competitorLow !== null &&
    competitorHigh !== null &&
    competitorLow > competitorHigh
  ) {
    return null;
  }

  return {
    businessName,
    industry,
    offeringType,
    monthlyCosts,
    monthlySales,
    desiredMargin,
    marketPosition,
    urgency,
    competitorLow: competitorLow ?? undefined,
    competitorHigh: competitorHigh ?? undefined,
    notes: notes || undefined,
  };
}

function fallbackResponse(input: PricingRequest): PricingResponse {
  const unitCost = input.monthlyCosts / input.monthlySales;
  const targetMargin = clamp(input.desiredMargin / 100, 0.01, 0.9);
  let recommended = unitCost / (1 - targetMargin);

  if (input.marketPosition === "budget") {
    recommended *= 0.94;
  }

  if (input.marketPosition === "premium") {
    recommended *= 1.08;
  }

  if (typeof input.competitorLow === "number" && typeof input.competitorHigh === "number") {
    const competitorMid = (input.competitorLow + input.competitorHigh) / 2;
    recommended = recommended * 0.55 + competitorMid * 0.45;
  }

  recommended = Number(recommended.toFixed(2));
  const low = Number((recommended * 0.9).toFixed(2));
  const high = Number((recommended * 1.12).toFixed(2));

  return {
    recommendedPrice: recommended,
    priceRange: { low, high },
    confidence: "medium",
    summary:
      "Baseline recommendation was generated from unit economics and target margin because AI output was unavailable.",
    rationale: [
      `Unit cost estimated at $${unitCost.toFixed(2)} per sale.`,
      `Target margin of ${input.desiredMargin}% implies break-even-plus price near $${recommended.toFixed(2)}.`,
      "Market positioning was applied as a modest adjustment.",
    ],
    experiments: [
      "A/B test headline price vs anchored option bundles.",
      "Offer a limited-time intro rate to validate conversion elasticity.",
      "Track gross margin weekly and adjust after 2-4 weeks of data.",
    ],
    assumptions: [
      "Monthly costs and sales volume are representative of a typical month.",
      "Price elasticity is moderate and not extreme in this segment.",
      "No major channel or product mix shift happens in the next 30 days.",
    ],
  };
}

const responseSchema = {
  name: "pricing_recommendation",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      recommendedPrice: {
        type: "number",
        minimum: 0,
      },
      priceRange: {
        type: "object",
        additionalProperties: false,
        properties: {
          low: { type: "number", minimum: 0 },
          high: { type: "number", minimum: 0 },
        },
        required: ["low", "high"],
      },
      confidence: {
        type: "string",
        enum: ["low", "medium", "high"],
      },
      summary: {
        type: "string",
        minLength: 50,
        maxLength: 260,
      },
      rationale: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: { type: "string", minLength: 12, maxLength: 180 },
      },
      experiments: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: { type: "string", minLength: 12, maxLength: 180 },
      },
      assumptions: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: { type: "string", minLength: 12, maxLength: 180 },
      },
    },
    required: [
      "recommendedPrice",
      "priceRange",
      "confidence",
      "summary",
      "rationale",
      "experiments",
      "assumptions",
    ],
  },
} as const;

export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let input: PricingRequest | null = null;

  try {
    input = normalizeRequest(await req.json());
  } catch {
    return Response.json({ error: "Malformed JSON body" }, { status: 400 });
  }

  if (!input) {
    return Response.json(
      {
        error:
          "Invalid request. Check required fields, numeric ranges, and option values.",
      },
      { status: 400 },
    );
  }

  const openai = new OpenAI({
    apiKey: Netlify.env.get("OPENAI_API_KEY"),
    baseURL: Netlify.env.get("OPENAI_BASE_URL"),
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      temperature: 0.25,
      max_completion_tokens: 700,
      response_format: {
        type: "json_schema",
        json_schema: responseSchema,
      },
      messages: [
        {
          role: "system",
          content:
            "You are a pricing strategist for small businesses. Recommend a single unit price in USD using cost structure, demand context, and positioning. Keep advice practical and cautious.",
        },
        {
          role: "user",
          content: JSON.stringify({
            request_type: "pricing_estimate",
            output_currency: "USD",
            business: input,
            rules: [
              "Ensure recommendedPrice is inside priceRange.",
              "Ensure priceRange.high is at least 10% above priceRange.low.",
              "Reflect margin target and market position in reasoning.",
              "Do not mention being an AI model.",
            ],
          }),
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return Response.json(fallbackResponse(input), {
        headers: { "x-pricing-fallback": "true" },
      });
    }

    const parsed = JSON.parse(content) as PricingResponse;

    if (parsed.priceRange.low > parsed.priceRange.high) {
      [parsed.priceRange.low, parsed.priceRange.high] = [
        parsed.priceRange.high,
        parsed.priceRange.low,
      ];
    }

    parsed.recommendedPrice = clamp(
      parsed.recommendedPrice,
      parsed.priceRange.low,
      parsed.priceRange.high,
    );

    parsed.recommendedPrice = Number(parsed.recommendedPrice.toFixed(2));
    parsed.priceRange.low = Number(parsed.priceRange.low.toFixed(2));
    parsed.priceRange.high = Number(parsed.priceRange.high.toFixed(2));

    return Response.json(parsed);
  } catch {
    return Response.json(fallbackResponse(input), {
      headers: { "x-pricing-fallback": "true" },
    });
  }
};

export const config = {
  path: "/api/pricing-estimate",
  method: "POST",
};
