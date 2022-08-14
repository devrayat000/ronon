import type { ActionArgs } from "@remix-run/node";

import type { Chapter } from "~/interfaces/question";
import { api } from "~/modules/axios.server";
import { contentHOF } from "~/services/refresh.server";

export async function action({ params, request }: ActionArgs) {
  const sid = params.sid;
  if (!sid) return null;

  return contentHOF(request, async (accessToken) => {
    const chapterRes = await api
      .get<Chapter[]>("/options/" + sid, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(console.log);
    console.log("choices", chapterRes?.data);

    return {
      chapters: chapterRes?.data?.map((chapter) => ({
        value: chapter.tagId,
        label: chapter.chapter,
      })),
    };
  });
}
