import { createCookie, redirect } from "@remix-run/node"; // or cloudflare/deno

export const accessCookie = createCookie("ronon.access", {
  maxAge: 604_800, // one week,
  httpOnly: true,
  sameSite: "lax",
});

export const refreshCookie = createCookie("ronon.refresh", {
  maxAge: 604_800, // one week
  httpOnly: true,
  sameSite: "lax",
  secure: false,
});

export async function getCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await accessCookie.parse(cookieHeader);
  return token;
}

export async function getRefreshCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await refreshCookie.parse(cookieHeader);
  return token;
}

export async function requireCookie(request: Request) {
  const token = await getCookie(request);
  if (!token) {
    const url = new URL(request.url);
    const params = new URLSearchParams([["_next", url.pathname]]);
    throw redirect(`/signin?${params}`);
  }
  return token;
}

export async function requireRefreshCookie(request: Request) {
  const token = await getRefreshCookie(request);
  if (!token) {
    const url = new URL(request.url);
    const params = new URLSearchParams([["_next", url.pathname]]);
    throw redirect(`/signin?${params}`);
  }
  return token;
}
