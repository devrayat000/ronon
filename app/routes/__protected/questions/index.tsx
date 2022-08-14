import {
  Affix,
  Button,
  Container,
  Group,
  Stack,
  Transition,
} from "@mantine/core";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { ArrowBarUp } from "tabler-icons-react";

import { ScrollContext } from "~/components/common/shell";
import { CommentHtml } from "~/components/question";
import type { Question } from "~/interfaces/question";
import type { User } from "~/interfaces/user";
import { getQuestions } from "~/services/question.server";
import { contentHOF } from "~/services/refresh.server";

export const meta: MetaFunction = () => {
  return {
    title: "Questions - Ronon",
    description: "",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  return contentHOF(request, (accessToken) =>
    getQuestions(accessToken).then((r) => r.reverse())
  );
};

type LoaderData = Question & {
  user: User;
};

export default function QuestionsPage() {
  const questions = useLoaderData<LoaderData[]>();
  const [scroll, scrollTo] = useContext(ScrollContext);

  return (
    <Container>
      <Group position="right" mt="xl">
        <Button component={Link} to="create">
          Ask Question
        </Button>
      </Group>
      <Stack mt="xl">
        {questions.map(({ ID, Que, subject, chapter, ...rest }) => (
          <CommentHtml
            key={ID}
            id={ID}
            title={Que}
            user={rest.user}
            subject={subject}
            chapter={chapter}
            upvotes={rest.upvotes}
            downvotes={rest.downvotes}
            upvoteStatus={rest.upvoteStatus}
            downvoteStatus={rest.downvoteStatus}
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
