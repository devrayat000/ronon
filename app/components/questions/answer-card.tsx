import { Text, Avatar, Group, Paper } from "@mantine/core";

interface CommentHtmlProps {
  body: string;
  author: string;
}

export default function AnswerCard({ body, author }: CommentHtmlProps) {
  return (
    <Paper withBorder radius="md" px="xl" py="lg">
      <Group>
        <Avatar radius="xl">{author.at(0)?.toUpperCase()}</Avatar>
        <div>
          <Text size="sm">{author}</Text>
        </div>
      </Group>
      <Text component="p">{body}</Text>
    </Paper>
  );
}
