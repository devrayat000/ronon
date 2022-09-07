import { json } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import { getAnswers } from "./answer.server";
import type { Question, QuestionResponse } from "~/interfaces/question";
import { getUser } from "./user.server";
import { User } from "~/interfaces/user";

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

type QuestionsReturn = {
  questions: (Question & {
    user: User;
  })[];
  page: number;
  pages: number;
};

export async function getQuestions(
  accessToken: string
): Promise<QuestionsReturn>;
export async function getQuestions(
  accessToken: string,
  page: number
): Promise<QuestionsReturn>;
export async function getQuestions(accessToken: string, page?: number) {
  const resp = await api.get<QuestionResponse>("/questions/", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { page },
    // timeout: 25 * 1000,
  });
  console.log(resp.data);

  const questions = resp.data.questions.map(async (question) => {
    const user = await getUser(question.User, accessToken);
    console.log(user);

    return Object.assign(question, {
      user,
    });
  });

  return {
    questions: await Promise.all(questions),
    page: resp.data.page,
    pages: resp.data.pages,
  };
}

export async function getFilteredQuestion(tagId: string, accessToken: string) {
  const resp = await api.get<Question[]>(`/questions/search/${tagId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const questions = resp.data.map(async (question) => {
    const user = await getUser(question.User, accessToken);
    console.log(user);

    return Object.assign(question, {
      user,
    });
  });

  return Promise.all(questions);
}
