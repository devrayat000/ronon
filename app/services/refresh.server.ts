import { json, redirect } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import { getCookieHeader } from "./cookie-header.server";
import { requireCookie, requireRefreshCookie } from "./cookie.server";
import type { Token } from "~/interfaces/token";

export async function refreshToken(request: Request) {
  const refreshToken = await requireRefreshCookie(request);
  const resp = await api.post<Token>("/token/refresh/", {
    refresh: refreshToken,
  });

  const { access, refresh } = resp.data;
  return {
    headers: await getCookieHeader(access, refresh),
    accessToken: access,
  };
}

export async function noAuthHOF<T>(
  request: Request,
  callback: (accessToken: string) => Promise<T>
) {
  console.log("running hof");

  return requireCookie(request)
    .catch(() => {
      console.log("no cookie found!");
      throw json("Enter auth page");
    })
    .then((accessToken) => callback(accessToken))
    .then(() => {
      console.log("user is logged on");
      return redirect("/");
    })
    .catch(async (err) => {
      console.log("error");

      if (err?.response?.data?.code === "token_not_valid") {
        console.log("invalid token");

        const { headers, accessToken } = await refreshToken(request);
        console.log("refreshed");

        await callback(accessToken);
        console.log("ran callback");
        return redirect("/", { headers });
      }
      console.log("Entering auth page");

      return json("Enter auth page");
    });
}

export async function contentHOF<T>(
  request: Request,
  callback: (accessToken: string) => Promise<T>
) {
  return requireCookie(request)
    .catch(() => {
      throw redirect(`/signin`);
    })
    .then((accessToken) => callback(accessToken))
    .then((res) => json(res))
    .catch(async (err) => {
      console.log("error");

      if (err?.response?.data?.code === "token_not_valid") {
        console.log("invalid token");

        const { headers, accessToken } = await refreshToken(request);
        console.log("refreshed");

        const resp = await callback(accessToken);
        console.log("ran callback");

        return json(resp, { headers, status: 200 });
      }
      const url = new URL(request.url);
      const params = new URLSearchParams([["_next", url.pathname]]);
      throw redirect(`/signin?${params}`);
    });
}

export async function rootHOF<T>(
  request: Request,
  callback: (accessToken: string) => Promise<T>
) {
  return requireCookie(request)
    .catch(() => {
      return null;
    })
    .then((accessToken) => callback(accessToken))
    .then((res) => json(res))
    .catch(async (err) => {
      console.log("error");

      if (err?.response?.data?.code === "token_not_valid") {
        console.log("invalid token");

        const { headers, accessToken } = await refreshToken(request);
        console.log("refreshed");

        const resp = await callback(accessToken);
        console.log("ran callback");

        return json(resp, { headers, status: 200 });
      }
      return null;
    });
}
