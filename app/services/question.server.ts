import { json } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import { getAnswers } from "./answer.server";
import type { Question } from "~/interfaces/question";

export async function getQuestionById(id: number, accessToken: string) {
  const resp = await api.get<Question[]>("/questions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const question = resp.data.find((q) => q.ID === id);
  if (!question) {
    throw json("Not found", { status: 404 });
  }

  return Object.assign(question, {
    answers: await getAnswers(question.ID, accessToken),
  });
}

export async function getQuestions(accessToken: string) {
  const resp = await api.get<Question[]>("/questions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const questions = resp.data.map(async (question) => {
    return Object.assign(question, {
      answers: await getAnswers(question.ID, accessToken),
    });
  });

  return await Promise.all(questions);
}
