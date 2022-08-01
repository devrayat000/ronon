import { Container } from "@mantine/core";
import { useOutletContext } from "@remix-run/react";
import type { User } from "~/interfaces/user";

export default function ProfilePage() {
  const { user } = useOutletContext<{ user: User }>();

  return (
    <Container>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  );
}
