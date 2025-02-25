import { Outlet, useLoaderData } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";

import { requireId } from "~/modules/jwt.server";
import { getUser } from "~/services/user.server";
import { contentHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  const user = await contentHOF(request, (accessToken) => {
    const id = requireId(accessToken);
    return getUser(id, accessToken);
  });

  return user;
}

export default function () {
  const user = useLoaderData();
  return <Outlet context={{ user }} />;
}
