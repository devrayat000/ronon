import {
  Affix,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Transition,
} from "@mantine/core";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { useContext } from "react";
import { IconArrowBarUp } from "@tabler/icons";

import { ScrollContext } from "~/components/common/shell";
import { CommentHtml } from "~/components/question";
import Choices from "~/components/questions/choices";
import type { Question } from "~/interfaces/question";
import type { User } from "~/interfaces/user";
import { getFilteredQuestion, getQuestions } from "~/services/question.server";
import { contentHOF } from "~/services/refresh.server";

export const meta: MetaFunction = () => {
  return {
    title: "Questions - Ronon",
    description: "",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const tagId = url.searchParams.get("tagId");

  return contentHOF(request, (accessToken) => {
    if (tagId) {
      return getFilteredQuestion(tagId, accessToken).then((r) => r.reverse());
    }
    return getQuestions(accessToken).then((r) => r.reverse());
  });
};

type LoaderData = Question & {
  user: User;
};

export default function QuestionsPage() {
  const questions = useLoaderData<LoaderData[]>();
  const { subjects } = useOutletContext<{
    subjects: { label: string; value: string }[];
  }>();
  const [scroll, scrollTo] = useContext(ScrollContext);

  return (
    <Container>
      <Group position="right" mt="xl">
        <Button component={Link} to="create">
          Ask Question
        </Button>
      </Group>

      <Paper
        component={Form}
        // reloadDocument
        method="get"
        withBorder
        mt="xl"
        p="lg"
      >
        <Choices subjects={subjects} />
        <Group mt="lg" position="right">
          <Button type="submit">Filter</Button>
        </Group>
      </Paper>

      <Stack mt="xl">
        {questions.map(({ ID, Que, ...rest }) => (
          <CommentHtml key={ID} id={ID} title={Que} {...rest} />
        ))}
      </Stack>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
              <IconArrowBarUp />
            </Button>
          )}
        </Transition>
      </Affix>
    </Container>
  );
}
