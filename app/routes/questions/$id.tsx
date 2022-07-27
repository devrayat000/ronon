import {
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";

import AnswerCard from "~/components/questions/answer-card";
import { createMockQuestions, type Question } from "~/mocks/question.server";

export const loader: LoaderFunction = async ({ params }) => {
  const qId = parseInt(params.id!);
  return createMockQuestions().find((q) => q.id === qId);
};

export default function QuestionAnswers() {
  const question = useLoaderData<Question>();

  return (
    <Container>
      {/* Author info */}
      <Group>
        <Avatar src={question.author.image} size="lg" radius="xl" />
        <Box>
          <Text size="md">{question.author.name}</Text>
          <Text size="sm" color="dimmed">
            {question.postedAt}
          </Text>
        </Box>
      </Group>

      {/* Original question */}
      <Box mt="xl">
        <Title order={4}>Question:</Title>
        <Text component="p" my="xs" size="lg" weight={600}>
          {question.title}
        </Text>
        <TypographyStylesProvider>
          <div
            // className={classes.content}
            dangerouslySetInnerHTML={{ __html: question.body }}
          />
        </TypographyStylesProvider>
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
              key={ans.id}
              body={ans.answer}
              author={{ name: ans.answeredBy }}
              postedAt={ans.answeredDate}
            />
          ))}
        </Stack>
      </Box>

      <Outlet />
    </Container>
  );
}
