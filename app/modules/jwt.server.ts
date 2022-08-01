import { redirect } from "@remix-run/node";
import jwt from "jsonwebtoken";

export function decodeToken(token: string) {
  return jwt.decode(token, { json: true });
}

export function requireId(accessToken: string) {
  const token = decodeToken(accessToken);
  if (!token || !("user_id" in token)) {
    throw redirect(`/signin`);
  }
  return token.user_id;
}
