import type { Answer } from "~/interfaces/answer";
import { api } from "~/modules/axios.server";

export async function getAnswers(qid: string | number, accessToken: string) {
  const resp = await api.get<Answer[]>(`/answers/${qid}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return resp.data;
}
