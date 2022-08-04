import { Outlet } from "@remix-run/react";
import { redirect, type LoaderArgs } from "@remix-run/node";

import { getCookie, getRefreshCookie } from "~/services/cookie.server";
import { decodeToken } from "~/modules/jwt.server";
import { getUser } from "~/services/user.server";
import { contentHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  const accessToken = await getCookie(request);
  const refreshToken = await getRefreshCookie(request);
  console.log("Refresh", refreshToken);
  if (!accessToken) return null;
  const token = decodeToken(accessToken);
  if (!token || !("user_id" in token)) {
    return null;
  }

  try {
    const user = await contentHOF(request, (accessToken) =>
      getUser(token.user_id, accessToken)
    );
    if (user) {
      return redirect("/");
    }
  } catch (error) {
    return null;
  }
}

export default function AuthPage() {
  return <Outlet />;
}
