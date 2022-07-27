import { useEffect, useRef } from "react";
import { Button, Group, Paper, Textarea } from "@mantine/core";

export default function AnswerQuestionPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
      mounted.current = true;
    }
  }, []);

  return (
    <Paper withBorder mt="xl" p="lg" ref={targetRef}>
      <Textarea placeholder="Write answer..." />
      <Group position="right" mt="md">
        <Button>Submit Answer</Button>
      </Group>
    </Paper>
  );
}
