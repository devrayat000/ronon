import { Outlet, useLoaderData } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";

import { decodeToken } from "~/modules/jwt.server";
import { getUser } from "~/services/user.server";
import { noAuthHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  return noAuthHOF(request, (accessToken) => {
    const token = decodeToken(accessToken);
    if (!token || !("user_id" in token)) {
      throw new Error("");
    }
    return getUser(token.user_id, accessToken);
  });
}

export default function AuthPage() {
  const data = useLoaderData();
  console.log("loader data", data);

  return <Outlet />;
}
