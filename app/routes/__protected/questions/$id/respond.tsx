import { useEffect, useRef } from "react";
import { Button, Group, Paper, Textarea } from "@mantine/core";
import type { MetaFunction, ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { requireId } from "~/modules/jwt.server";
import { api } from "~/modules/axios.server";
import { contentHOF } from "~/services/refresh.server";

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Answer: ${parentsData.Que} - Ronon`,
  };
};

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const PQue = params.id;
  const { Answer } = Object.fromEntries(formData.entries());

  return contentHOF(request, async (accessToken) => {
    const User = requireId(accessToken);
    return api
      .post(
        "/createAnswer/",
        { "PQue ID": PQue, Answer, User },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((r) => r.data);
  });
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
      reloadDocument
      replace
      method="post"
      withBorder
      mt="xl"
      p="lg"
      ref={targetRef}
    >
      <Textarea placeholder="Write answer..." name="Answer" variant="filled" />
      <Group position="right" mt="md">
        <Button type="submit">Submit Answer</Button>
      </Group>
    </Paper>
  );
}
