import { type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import type { Subject } from "~/interfaces/question";
import { api } from "~/modules/axios.server";
import { contentHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  return contentHOF(request, async (accessToken) => {
    const subjectRes = await api.get<Subject[]>("/options/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      subjects: subjectRes.data.map((subject) => ({
        value: subject.subId,
        label: subject.subject,
      })),
    };
  });
}

export default function QuestionPage() {
  const { subjects } = useLoaderData<{
    subjects: { label: string; value: string }[];
  }>();

  return <Outlet context={{ subjects }} />;
}
