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
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
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

  return contentHOF(request, (accessToken) => {
    if (tagId) {
      return getFilteredQuestion(tagId, accessToken).then((r) => ({
        questions: r.reverse(),
        pages: 0,
        page: 0,
      }));
    }
    return getQuestions(accessToken, page ?? undefined);
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

      {pages && (
        <Group position="center" my="lg">
          <Pagination page={page} onChange={changePage} total={pages} />
        </Group>
      )}

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
