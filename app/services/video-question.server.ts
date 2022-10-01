import { json } from "@remix-run/node";

import {
  type VideoQuestion,
  type VideoQuestionResponse,
} from "~/interfaces/VideoQuestion";
import { api } from "~/modules/axios.server";

export async function getVideoQuestionById(id: number, accessToken: string) {
  const resp = await api.get<{ question: VideoQuestion }>(
    `/video-questions/${id}/`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  if (!resp.data.question) {
    throw json("Not found", { status: 404 });
  }
  console.log(resp.data);

  return resp.data.question;
}

export async function getVideoQuestions(
  accessToken: string,
  page?: number | string
) {
  const resp = await api.get<VideoQuestionResponse>("/video-questions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { page },
    // timeout: 25 * 1000,
  });

  return resp.data;
}

export async function getFilteredVideoQuestion(
  tagId: string,
  accessToken: string
) {
  const resp = await api.get<{ questions: VideoQuestion[] }>(
    `/video-questions/filter/${tagId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return resp.data.questions;
}
