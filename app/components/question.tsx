import {
  createStyles,
  Avatar,
  Group,
  Paper,
  Anchor,
  Box,
  Button,
  Breadcrumbs,
  Text,
} from "@mantine/core";
import { Link, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";

import type { User } from "~/interfaces/user";
import type { VideoQuestion } from "~/interfaces/VideoQuestion";
import Voting from "./questions/vote";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  id: number | string;
  title: string;
  subject: string;
  chapter: string;
  created_at: string;
}

interface TextProps {
  user: User;
  upvotes?: number;
  downvotes?: number;
  upvoteStatus: boolean;
  downvoteStatus: boolean;
  verified?: boolean;
}

interface VideoProps {
  user: VideoQuestion["user"];
  video_url: string;
}

export type CommentHTMLProps<Video extends boolean = false> = {
  isVideo?: Video;
} & CommentHtmlProps &
  (Video extends true ? VideoProps : TextProps);

export function CommentHtml<Video extends boolean = false>({
  user,
  ...props
}: CommentHTMLProps<Video>) {
  const [params] = useSearchParams();
  const { classes, theme } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        {user.profile_pic ? (
          <Avatar
            src={user.profile_pic}
            alt={"name" in user ? user.name : user.Name}
            radius="xl"
          />
        ) : (
          <Avatar alt={"name" in user ? user.name : user.Name} radius="xl">
            {("name" in user ? user.name : user.Name).at(0)?.toUpperCase()}
          </Avatar>
        )}
        <Text size="sm">{"name" in user ? user.name : user.Name}</Text>

        <div style={{ flexGrow: 1 }} />
        <Text size="xs">
          {dayjs(props.created_at).format("hh:mm a, DD MMM, YYYY")}
        </Text>
      </Group>
      <Box pl={theme.spacing.xl * 2}>
        <Anchor
          size="lg"
          variant="text"
          component={Link}
          to={props.id.toString()}
        >
          {props.title}
        </Anchor>

        <Breadcrumbs mt="md" separator="→">
          <Text>{props.subject}</Text>
          <Text>{props.chapter}</Text>
        </Breadcrumbs>

        {!props.isVideo &&
          "verified" in props &&
          ((props as any).verified as any) && (
            <Text size="sm" mt="md" color="green">
              Verified by admin *
            </Text>
          )}

        {!props.isVideo && "verified" in props && !params.has("tagId") && (
          <Voting url={`/questions/${props.id}/vote`} {...(props as any)} />
        )}

        <Group position={props.isVideo ? "right" : "apart"} mt="lg">
          <Button
            variant={props.isVideo ? "filled" : "outline"}
            component={Link}
            to={props.id.toString() + (props.isVideo ? "" : "/#comments")}
          >
            See {props.isVideo ? "Videos" : "Answers"}
          </Button>
          {!props.isVideo && (
            <Button component={Link} to={props.id.toString() + "/respond"}>
              Answer
            </Button>
          )}
        </Group>
      </Box>
    </Paper>
  );
}
