import { AppShell, ScrollArea, useMantineTheme } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import QuestionSidebar from "~/components/questions/sidebar";
import { createMockQuestions } from "~/mocks/question.server";

export const loader: LoaderFunction = async () => {
  return createMockQuestions();
};

export default function QuestionsPage() {
  const theme = useMantineTheme();

  return (
    <AppShell
      navbar={<QuestionSidebar />}
      styles={{
        root: {
          marginTop: -theme.spacing.md,
          marginLeft: -theme.spacing.md,
        },
      }}
    >
      <ScrollArea
        sx={{
          height:
            "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))",
          paddingBottom: 50,
        }}
        mx="-xs"
        px="xs"
      >
        <Outlet />
      </ScrollArea>
    </AppShell>
  );
}
