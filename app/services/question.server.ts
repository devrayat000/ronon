import { json } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import { getAnswers } from "./answer.server";
import type { Question } from "~/interfaces/question";
import { getUser } from "./user.server";

export async function getQuestionById(id: number, accessToken: string) {
  const resp = await api.get<Question[]>("/questions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const question = resp.data.find((q) => q.ID === id);
  if (!question) {
    throw json("Not found", { status: 404 });
  }

  const [answers, user] = await Promise.all([
    getAnswers(question.ID, accessToken),
    getUser(question.User, accessToken),
  ]);
  return Object.assign(question, {
    answers,
    user,
  });
}

export async function getQuestions(accessToken: string) {
  const resp = await api.get<Question[]>("/questions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
    // timeout: 25 * 1000,
  });

  const questions = resp.data;

  return questions;
}
