import {
  Affix,
  Button,
  Container,
  Group,
  Stack,
  Transition,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { ArrowBarUp } from "tabler-icons-react";

import { ScrollContext } from "~/components/common/shell";
import { CommentHtml } from "~/components/question";
import type { Question } from "~/interfaces/question";
import type { Answer } from "~/interfaces/answer";
import { getQuestions } from "~/services/question.server";
import { contentHOF } from "~/services/refresh.server";

export const loader: LoaderFunction = async ({ request }) => {
  return contentHOF(request, (accessToken) => getQuestions(accessToken));
};

type LoaderData = Question & {
  answers: Answer[];
};

export default function QuestionsPage() {
  const questions = useLoaderData<LoaderData[]>();
  const [scroll, scrollTo] = useContext(ScrollContext);

  return (
    <Container>
      <Group position="right">
        <Button component={Link} to="create">
          Ask Question
        </Button>
      </Group>
      <Stack mt="xl">
        {questions.map(({ ID, Que, answers, ...rest }) => (
          <CommentHtml
            key={ID}
            id={ID}
            author={rest["User's Name"]}
            title={Que}
            answerCount={answers.length}
          />
        ))}
      </Stack>

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
