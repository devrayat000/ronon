import {
  Text,
  Avatar,
  Group,
  Paper,
  Image,
  SimpleGrid,
  Anchor,
} from "@mantine/core";

interface CommentHtmlProps {
  body: string;
  author: string;
  img?: string;
}

export default function AnswerCard({ body, author, img }: CommentHtmlProps) {
  return (
    <Paper withBorder radius="md" px="xl" py="lg">
      <Group>
        <Avatar radius="xl">{author.at(0)?.toUpperCase()}</Avatar>
        <div>
          <Text size="sm">{author}</Text>
        </div>
      </Group>
      <Text component="p">{body}</Text>

      {img && (
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          mt="xl"
        >
          <Anchor href={img} target="_blank" rel="norefer">
            <Image src={img} alt={body} />
          </Anchor>
        </SimpleGrid>
      )}
    </Paper>
  );
}
