import {
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
  Image,
  SimpleGrid,
  Anchor,
} from "@mantine/core";
import { json, type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import AnswerCard from "~/components/questions/answer-card";
import { getQuestionById } from "~/services/question.server";
import type { Question } from "~/interfaces/question";
import type { Answer } from "~/interfaces/answer";
import { contentHOF } from "~/services/refresh.server";
import type { User } from "~/interfaces/user";
import dayjs from "dayjs";

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
  user: User;
};

export default function QuestionAnswers() {
  const question = useLoaderData<LoaderData>();

  return (
    <Container mt="xl">
      {/* Author info */}
      <Group>
        {question.user.profile_pic ? (
          <Avatar
            src={question.user.profile_pic}
            alt={question["User's Name"]}
            size="lg"
            radius="xl"
          />
        ) : (
          <Avatar alt={question["User's Name"]} size="lg" radius="xl">
            {question["User's Name"].at(0)?.toUpperCase()}
          </Avatar>
        )}
        <Box>
          <Text size="md">{question["User's Name"]}</Text>
        </Box>

        <div style={{ flexGrow: 1 }} />
        <Text size="xs">
          {dayjs(question.created_at).format("hh:mm a, DD MMM, YYYY")}
        </Text>
      </Group>

      {/* Original question */}
      <Box mt="xl">
        <Title order={4}>Question:</Title>
        <Text component="p" my="xs" size="lg" weight={600}>
          {question.Que}
        </Text>
        {question.img && (
          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt="xl"
          >
            <Anchor href={question.img} target="_blank" rel="norefer">
              <Image src={question.img} alt={question.Que} />
            </Anchor>
          </SimpleGrid>
        )}
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
              id={ans["Answer ID"]}
              qid={ans["PQue ID"]}
              body={ans.Answer}
              author={ans["User Name"]}
              img={ans.img}
              {...ans}
            />
          ))}
        </Stack>
      </Box>

      <Outlet />
    </Container>
  );
}
