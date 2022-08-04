import { Outlet, useOutletContext } from "@remix-run/react";
import type { User } from "~/interfaces/user";

export default function AccountPage() {
  const { user } = useOutletContext<{ user: User }>();
  return <Outlet context={{ user }} />;
}
