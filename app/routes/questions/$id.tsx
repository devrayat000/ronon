import {
  Avatar,
  Box,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AnswerCard from "~/components/questions/answer-card";

import { createMockQuestions, type Question } from "~/mocks/question.server";

export const loader: LoaderFunction = async ({ params }) => {
  const qId = parseInt(params.id!);
  return createMockQuestions().find((q) => q.id === qId);
};

export default function QuestionAnswers() {
  const question = useLoaderData<Question>();

  return (
    <Container fluid>
      {/* Author info */}
      <Group>
        <Avatar size="lg" radius="xl">
          {question.askedBy.at(0)?.toUpperCase()}
        </Avatar>
        <Box>
          <Text size="md">{question.askedBy}</Text>
          <Text size="sm" color="dimmed">
            {question.askedDate}
          </Text>
        </Box>
      </Group>

      {/* Original question */}
      <Box mt="xl">
        <Title order={4}>Question:</Title>
        <Text component="p" my="xs">
          {question.question}
        </Text>
      </Box>

      {/* Answers list */}
      <Box mt="xl">
        <Title order={4}>Answers:</Title>
        <Stack mt="md">
          {question.answers.map((ans) => (
            <AnswerCard
              key={ans.id}
              body={ans.answer}
              author={{ name: ans.answeredBy }}
              postedAt={ans.answeredDate}
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
