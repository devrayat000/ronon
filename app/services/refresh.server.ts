import { json, redirect } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import { getCookieHeader } from "./cookie-header.server";
import { requireCookie, requireRefreshCookie } from "./cookie.server";
import type { Token } from "~/interfaces/token";

export async function refreshToken(request: Request) {
  const refreshToken = await requireRefreshCookie(request);
  const resp = await api.post<Token>("/refresh/", { refresh: refreshToken });
  const { access, refresh } = resp.data;
  return await getCookieHeader(access, refresh);
}

export async function contentHOF<T>(
  request: Request,
  callback: (accessToken: string) => Promise<T>
) {
  const accessToken = await requireCookie(request);
  return callback(accessToken)
    .then((res) => json(res))
    .catch(async (err) => {
      if (err.code === "token_not_valid") {
        const headers = await refreshToken(request);
        const accessToken = await requireCookie(request);
        const resp = await callback(accessToken);
        return json(resp, { headers });
      }
      const url = new URL(request.url);
      const params = new URLSearchParams([["_next", url.pathname]]);
      throw redirect(`/signin?${params}`);
    });
}
