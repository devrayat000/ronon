import type { ActionArgs } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import { requireId } from "~/modules/jwt.server";
import { contentHOF } from "~/services/refresh.server";

export async function action({ request, params }: ActionArgs) {
  const aid = params.aid;
  const formData = await request.formData();
  const voteStatus = formData.get("status");

  return contentHOF(request, async (accessToken) => {
    const userId = requireId(accessToken);
    return api
      .post(
        `/answers/${aid}/${voteStatus === "like" ? "upvote" : "downvote"}`,
        { userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((r) => r.data)
      .catch(console.log);
  });
}
