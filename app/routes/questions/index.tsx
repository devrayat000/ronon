import {
  Affix,
  Button,
  Center,
  Container,
  Stack,
  Transition,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { ArrowBarUp } from "tabler-icons-react";
import { ScrollContext } from "~/components/common/shell";
import { CommentHtml } from "~/components/question";

import { createMockQuestions, type Question } from "~/mocks/question.server";

export const loader: LoaderFunction = async () => {
  return createMockQuestions();
};

export default function QuestionsPage() {
  const questions = useLoaderData<Question[]>();
  const [scroll, scrollTo] = useContext(ScrollContext);

  return (
    <Container>
      <Stack>
        {questions.map(({ id, answers, ...c }) => (
          <CommentHtml key={id} id={id} {...c} answerCount={answers.length} />
        ))}
      </Stack>

      <Center mt="xl">
        <Button>Load More</Button>
      </Center>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
              <ArrowBarUp />
            </Button>
          )}
        </Transition>
      </Affix>
    </Container>
  );
}
