import {
  Text,
  Avatar,
  Group,
  Paper,
  Image,
  SimpleGrid,
  Anchor,
} from "@mantine/core";
import Voting from "./vote";

interface CommentHtmlProps {
  id: string | number;
  qid: string | number;
  body: string;
  author: string;
  img?: string;
  upvotes?: number;
  downvotes?: number;
  upvoteStatus: boolean;
  downvoteStatus: boolean;
}

export default function AnswerCard({
  id,
  qid,
  body,
  author,
  img,
  ...rest
}: CommentHtmlProps) {
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

      <Voting url={`/questions/${qid}/answers/${id}/vote`} {...rest} />
    </Paper>
  );
}
