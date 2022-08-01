import { useEffect, useRef } from "react";
import { Button, Group, Paper, Textarea } from "@mantine/core";
import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { requireCookie } from "~/services/cookie.server";
import { requireId } from "~/modules/jwt.server";
import { api } from "~/modules/axios.server";
import { contentHOF } from "~/services/refresh.server";

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const PQue = params.id;
  const { Answer } = Object.fromEntries(formData.entries());
  const accessToken = await requireCookie(request);
  const User = requireId(accessToken);

  return contentHOF(request, (accessToken) =>
    api
      .post(
        "/createAnswer/",
        { PQue, Answer, User },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((r) => r.data)
  );
}

export default function AnswerQuestionPage() {
  const targetRef = useRef<HTMLFormElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
      mounted.current = true;
    }
  }, []);

  return (
    <Paper
      component={Form}
      method="post"
      withBorder
      mt="xl"
      p="lg"
      ref={targetRef}
    >
      <Textarea placeholder="Write answer..." name="Answer" />
      <Group position="right" mt="md">
        <Button type='submit'>Submit Answer</Button>
      </Group>
    </Paper>
  );
}
