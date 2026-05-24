import { NextRequest, NextResponse } from "next/server";

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error("Missing Supabase environment variables");
  }

  return { url, anon };
}

export async function GET(request: NextRequest) {
  const { url, anon } = getEnv();
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") ?? "signup";
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?message=${encodeURIComponent(errorDescription ?? error)}`, request.url)
    );
  }

  if (!tokenHash) {
    return NextResponse.redirect(new URL("/login?message=Invalid+or+expired+auth+link", request.url));
  }

  const response = await fetch(`${url}/auth/v1/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anon
    },
    body: JSON.stringify({
      token_hash: tokenHash,
      type
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.msg ?? data.error_description ?? "Unable to verify email link";
    return NextResponse.redirect(new URL(`/login?message=${encodeURIComponent(message)}`, request.url));
  }

  const redirect = NextResponse.redirect(new URL("/dashboard", request.url));

  if (data.access_token) {
    redirect.cookies.set("tp_session", "1", {
      httpOnly: false,
      sameSite: "lax",
      path: "/"
    });
  }

  return redirect;
}
