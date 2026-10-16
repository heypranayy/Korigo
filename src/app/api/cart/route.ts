import { NextRequest, NextResponse } from "next/server";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://backend-korigo.sampledomain.online";

export async function GET(req: NextRequest) {
  try {
    const cartToken = req.headers.get("Cart-Token");
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (cartToken) headers["Cart-Token"] = cartToken;

    const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/cart?_nocache=${Date.now()}`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const newCartToken = res.headers.get("Cart-Token");
    const nonce = res.headers.get("Nonce");

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch cart from backend" }, { status: res.status });
    }

    const data = await res.json();
    const response = NextResponse.json(data);
    if (newCartToken) response.headers.set("Cart-Token", newCartToken);
    if (nonce) response.headers.set("Nonce", nonce);
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal cart proxy error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cartToken = req.headers.get("Cart-Token");
    const nonce = req.headers.get("Nonce");

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (cartToken) headers["Cart-Token"] = cartToken;
    if (nonce) headers["Nonce"] = nonce;

    const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/cart/add-item?_nocache=${Date.now()}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const newCartToken = res.headers.get("Cart-Token");
    const newNonce = res.headers.get("Nonce");

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const data = await res.json();
    const response = NextResponse.json(data);
    if (newCartToken) response.headers.set("Cart-Token", newCartToken);
    if (newNonce) response.headers.set("Nonce", newNonce);
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal cart proxy error" }, { status: 500 });
  }
}
