import { api } from "~/modules/axios.server";
import type { User } from "~/interfaces/user";

export async function getUser(id: string | number, accessToken: string) {
  const resp = await api.get<User>(`/profileAPI/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return resp.data;
}
