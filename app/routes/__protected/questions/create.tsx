import { Button, Container, Group, Paper, Textarea } from "@mantine/core";
import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { api } from "~/modules/axios.server";

import { requireId } from "~/modules/jwt.server";
import { requireCookie } from "~/services/cookie.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { Que } = Object.fromEntries(formData.entries());
  const accessToken = await requireCookie(request);
  const User = requireId(accessToken);

  return api
    .post(
      "/createQuestion/",
      { Que, User },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((r) => r.data);
}

export default function CreateQuestionPage() {
  return (
    <Container>
      <Paper component={Form} method="post" withBorder mt="xl" p="lg">
        <Textarea placeholder="Write question..." name="Que" />
        <Group position="right" mt="md">
          <Button type="submit">Ask</Button>
        </Group>
      </Paper>
    </Container>
  );
}
