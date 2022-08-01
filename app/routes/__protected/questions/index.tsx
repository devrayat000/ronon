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
import { requireCookie } from "~/services/cookie.server";
import { requireId } from "~/modules/jwt.server";
import type { Question } from "~/interfaces/question";
import type { User } from "~/interfaces/user";
import type { Answer } from "~/interfaces/answer";
import { contentHOF } from "~/services/refresh.server";
import { getQuestions } from "~/services/question.server";

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await requireCookie(request);
  const id = requireId(accessToken);

  return await contentHOF(request, (accessToken) =>
    getQuestions(id, accessToken)
  );
};

type LoaderData = Question & {
  author: User;
  answers: Answer[];
};

export default function QuestionsPage() {
  const questions = useLoaderData<LoaderData[]>();
  const [scroll, scrollTo] = useContext(ScrollContext);

  return (
    <Container>
      <Stack>
        {questions.map(({ ID, Que, answers, author }) => (
          <CommentHtml
            key={ID}
            id={ID}
            author={author}
            title={Que}
            answerCount={answers.length}
          />
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
