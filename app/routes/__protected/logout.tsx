import { redirect } from "@remix-run/node";
import { accessCookie, refreshCookie } from "~/services/cookie.server";

export async function action() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    await accessCookie.serialize("", { maxAge: -100 })
  );
  headers.append(
    "Set-Cookie",
    await refreshCookie.serialize("", { maxAge: -100 })
  );

  return redirect(`/signin`, {
    headers,
  });
}
