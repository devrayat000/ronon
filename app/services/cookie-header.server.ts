import { accessCookie, refreshCookie } from "./cookie.server";

export async function getCookieHeader(
  accessToken: string,
  refreshToken: string
) {
  const headers = new Headers();
  headers.append("Set-Cookie", await accessCookie.serialize(accessToken));
  headers.append("Set-Cookie", await refreshCookie.serialize(refreshToken));
  return headers;
}
