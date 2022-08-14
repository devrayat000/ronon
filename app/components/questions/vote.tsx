import { useEffect, useState } from "react";
import { ActionIcon, Group } from "@mantine/core";
import { useFetcher, useTransition } from "@remix-run/react";
import { IconThumbDown, IconThumbUp } from "@tabler/icons";

type Props = {
  url: string;
  upvotes?: number;
  downvotes?: number;
  upvoteStatus: boolean;
  downvoteStatus: boolean;
};

const Voting = ({
  url,
  upvotes,
  downvotes,
  upvoteStatus,
  downvoteStatus,
}: Props) => {
  const fetcher = useFetcher();
  const transition = useTransition();
  const [voteState, toggleVoteState] = useState<null | "like" | "dislike">(
    null
  );

  useEffect(() => {
    if (voteState) {
      fetcher.submit({ status: voteState }, { method: "post", action: url });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteState, url]);

  return (
    <Group spacing="xl" mt="md">
      <Group spacing="xs">
        <span>
          {(upvotes ?? 0) +
            (transition.submission?.formData.get("status") === "like" ? 1 : 0)}
        </span>
        <ActionIcon
          value="like"
          onClick={() => toggleVoteState("like")}
          color={
            upvoteStatus ||
            transition.submission?.formData.get("status") === "like"
              ? "blue"
              : undefined
          }
        >
          <IconThumbUp />
        </ActionIcon>
      </Group>
      <Group spacing="xs">
        <span>
          {(downvotes ?? 0) +
            (transition.submission?.formData.get("status") === "dislike"
              ? 1
              : 0)}
        </span>
        <ActionIcon
          value="dislike"
          onClick={() => toggleVoteState("dislike")}
          color={
            downvoteStatus ||
            transition.submission?.formData.get("status") === "dislike"
              ? "blue"
              : undefined
          }
        >
          <IconThumbDown />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default Voting;
