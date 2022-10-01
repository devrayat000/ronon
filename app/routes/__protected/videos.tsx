import { json, type TypedResponse, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import type { Subject } from "~/interfaces/question";
import { api } from "~/modules/axios.server";
import { contentHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  const result = await contentHOF(request, async (accessToken) => {
    const subjectRes = await api.get<Subject[]>("/options/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(subjectRes.data);

    return {
      subjects: subjectRes.data.map((subject) => ({
        value: subject.subId,
        label: subject.subject,
      })),
    };
  });
  type A = typeof result extends TypedResponse<infer U> ? U : never;
  const headers = new Headers(result.headers);
  headers.append(
    "Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-invalidate=3600"
  );

  return json((await result.json()) as A, {
    headers,
  });
}

export default function VideoQuestionPage() {
  const { subjects } = useLoaderData<typeof loader>();

  return <Outlet context={{ subjects }} />;
}
