import {
  Text,
  Avatar,
  Group,
  Paper,
  Image,
  SimpleGrid,
  Anchor,
} from "@mantine/core";
import dayjs from "dayjs";
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
  created_at: string;
  verified: boolean;
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
        <Text size="sm">{author}</Text>

        <div style={{ flexGrow: 1 }} />
        <Text size="xs">
          {dayjs(rest.created_at).format("hh:mm a, DD MMM, YYYY")}
        </Text>
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

      {rest.verified && (
        <Text size="sm" mt="md" color="green">
          Verified by admin *
        </Text>
      )}

      <Voting url={`/questions/${qid}/answers/${id}/vote`} {...rest} />
    </Paper>
  );
}
