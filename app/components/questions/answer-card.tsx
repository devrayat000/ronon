import { Text, Avatar, Group, Paper } from "@mantine/core";

interface CommentHtmlProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image?: string;
  };
}

export default function AnswerCard({
  postedAt,
  body,
  author,
}: CommentHtmlProps) {
  return (
    <Paper withBorder radius="md" px="xl" py="lg">
      <Group>
        <Avatar radius="xl">{author.name.at(0)?.toUpperCase()}</Avatar>
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text component="p">{body}</Text>
    </Paper>
  );
}
