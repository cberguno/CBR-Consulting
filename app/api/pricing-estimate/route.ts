export async function POST(request: Request) {
  const body = await request.text();
  const origin = new URL(request.url).origin;

  const upstreamResponse = await fetch(`${origin}/.netlify/functions/pricing-estimate`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  const payload = await upstreamResponse.text();

  return new Response(payload, {
    status: upstreamResponse.status,
    headers: {
      "content-type": upstreamResponse.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
