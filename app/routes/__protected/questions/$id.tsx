import {
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { json, type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import AnswerCard from "~/components/questions/answer-card";
import { getQuestionById } from "~/services/question.server";
import type { Question } from "~/interfaces/question";
import type { Answer } from "~/interfaces/answer";
import { contentHOF } from "~/services/refresh.server";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${data.Que} - Ronon`,
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  if (!id) {
    return json({ error: "No id provided!" }, { status: 400 });
  }
  return contentHOF(request, (accessToken) =>
    getQuestionById(parseInt(id!), accessToken)
  );
};

type LoaderData = Question & {
  answers: Answer[];
};

export default function QuestionAnswers() {
  const question = useLoaderData<LoaderData>();

  return (
    <Container>
      {/* Author info */}
      <Group>
        <Avatar alt={question["User's Name"]} radius="xl">
          {question["User's Name"].at(0)?.toUpperCase()}
        </Avatar>
        <Box>
          <Text size="md">{question["User's Name"]}</Text>
        </Box>
      </Group>

      {/* Original question */}
      <Box mt="xl">
        <Title order={4}>Question:</Title>
        <Text component="p" my="xs" size="lg" weight={600}>
          {question.Que}
        </Text>
      </Box>

      <Stack my="xl">
        <Button component={Link} to="respond">
          Leave an answer
        </Button>
      </Stack>

      {/* Answers list */}
      <Box mt="xl">
        <Title order={4}>Answers:</Title>
        <Stack mt="md">
          {question.answers.map((ans) => (
            <AnswerCard
              key={ans["Answer ID"]}
              body={ans.Answer}
              author={ans["User Name"]}
            />
          ))}
        </Stack>
      </Box>

      <Outlet />
    </Container>
  );
}
