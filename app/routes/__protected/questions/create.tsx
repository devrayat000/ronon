import { Button, Container, Group, Paper, Textarea } from "@mantine/core";
import { hideNotification, showNotification } from "@mantine/notifications";
import { type ActionArgs } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { IconCheck } from "@tabler/icons";
import { useEffect } from "react";
import { api } from "~/modules/axios.server";

import { requireId } from "~/modules/jwt.server";
import { contentHOF } from "~/services/refresh.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { Que } = Object.fromEntries(formData.entries());

  return contentHOF(request, async (accessToken) => {
    const User = requireId(accessToken);
    return api
      .post(
        "/createQuestion/",
        { Que, User },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((r) => ({ ...r.data, status: "ok" }));
  });
}

export default function CreateQuestionPage() {
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === "loading" && transition.type === "actionReload") {
      showNotification({
        id: "ask",
        title: "Successfully asked question",
        message: "Your question has been published.",
        autoClose: 2000,
        color: "green",
        icon: <IconCheck />,
      });
    }

    return () => {
      hideNotification("ask");
    };
  }, [transition.state, transition.type]);

  return (
    <Container>
      <Paper component={Form} method="post" withBorder mt="xl" p="lg">
        <Textarea placeholder="Write question..." name="Que" variant="filled" />
        <Group position="right" mt="md">
          <Button type="submit">Ask</Button>
        </Group>
      </Paper>
    </Container>
  );
}
