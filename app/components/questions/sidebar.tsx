import { Anchor, Navbar, ScrollArea, Stack, Title } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import type { Question } from "~/mocks/question.server";

type Props = {};

const QuestionSidebar = (props: Props) => {
  const questions = useLoaderData<Question[]>();

  return (
    <Navbar p="md" hiddenBreakpoint="sm" width={{ md: 360, lg: 480 }}>
      <Navbar.Section>
        <Title order={3}>Questions:</Title>
      </Navbar.Section>
      {/* Questions list */}
      <Navbar.Section mt="xl" grow component={ScrollArea} mx="-xs" px="xs">
        <Stack>
          {questions?.map((question) => (
            <Anchor
              key={question.id}
              component={Link}
              to={`/questions/${question.id}`}
              variant="link"
              color="dark"
              size="lg"
            >
              {question.question}
            </Anchor>
          ))}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default QuestionSidebar;
