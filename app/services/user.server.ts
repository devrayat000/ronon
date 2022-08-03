import { api } from "~/modules/axios.server";
import type { User } from "~/interfaces/user";
import type { Question } from "~/interfaces/question";
import type { Answer } from "~/interfaces/answer";

export async function getUser(id: string | number, accessToken: string) {
  const resp = await api.get<User>(`/profileAPI/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return resp.data;
}

export async function getUserQuestions(
  id: string | number,
  accessToken: string
) {
  const resp = await api.get<Pick<Question, "Que">[]>(`/userQueAPI/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return resp.data;
}

type Anss = {
  Ans: Pick<Answer, "Answer">["Answer"];
};

export async function getUserAnswers(id: string | number, accessToken: string) {
  const resp = await api.get<Anss>(`/userAnsAPI/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return resp.data;
}
