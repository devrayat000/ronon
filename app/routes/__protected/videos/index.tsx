import {
  Affix,
  Button,
  Container,
  Group,
  Pagination,
  Paper,
  Stack,
  Transition,
} from "@mantine/core";
import { json, LoaderArgs, MetaFunction, TypedResponse } from "@remix-run/node";
import {
  Form,
  Link,
  useNavigate,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { useContext } from "react";
import { IconArrowBarUp } from "@tabler/icons";

import { ScrollContext } from "~/components/common/shell";
import { CommentHtml } from "~/components/question";
import Choices from "~/components/questions/choices";
// import type { Question } from "~/interfaces/question";
// import type { User } from "~/interfaces/user";
import { getFilteredQuestion, getQuestions } from "~/services/question.server";
import { contentHOF } from "~/services/refresh.server";
import {
  getFilteredVideoQuestion,
  getVideoQuestions,
} from "~/services/video-question.server";

export const meta: MetaFunction = () => {
  return {
    title: "Questions - Ronon",
    description: "",
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const tagId = url.searchParams.get("tagId");
  const page = url.searchParams.get("page");

  const questions = await contentHOF(request, (accessToken) => {
    if (tagId) {
      return getFilteredVideoQuestion(tagId, accessToken).then((r) => ({
        questions: r.reverse(),
        pages: 0,
        page: 0,
      }));
    }
    return getVideoQuestions(accessToken, page ?? undefined);
  });

  type A = typeof questions extends TypedResponse<infer U> ? U : never;
  const headers = new Headers(questions.headers);
  headers.append(
    "Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-invalidate=3600"
  );

  return json((await questions.json()) as A, {
    headers,
  });
};

export default function QuestionsPage() {
  const { questions, page, pages } = useLoaderData<typeof loader>();
  const { subjects } = useOutletContext<{
    subjects: { label: string; value: string }[];
  }>();
  const [scroll, scrollTo] = useContext(ScrollContext);
  const navigate = useNavigate();

  function changePage(pageNum: number) {
    navigate(".?page=" + pageNum);
  }

  return (
    <Container>
      <Paper
        component={Form}
        // reloadDocument
        method="get"
        withBorder
        mt="xl"
        p="lg"
      >
        {subjects && subjects.length > 0 && <Choices subjects={subjects} />}
        <Group mt="lg" position="right">
          <Button type="submit">Filter</Button>
        </Group>
      </Paper>

      <Stack mt="xl">
        {questions.map(({ id, question, video_url, ...rest }) => (
          <CommentHtml
            key={id}
            id={id}
            title={question}
            isVideo
            video_url={video_url}
            {...rest}
          />
        ))}
      </Stack>

      {pages ? (
        <Group position="center" my="lg">
          <Pagination page={page} onChange={changePage} total={pages} />
        </Group>
      ) : null}

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

QuestionsPage.displayName = "@ronon/QuestionsPage";
