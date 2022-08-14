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
import { Link } from "@remix-run/react";
import dayjs from "dayjs";

import type { User } from "~/interfaces/user";
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
  user: User;
  subject: string;
  chapter: string;
  upvotes?: number;
  downvotes?: number;
  upvoteStatus: boolean;
  downvoteStatus: boolean;
  created_at: string;
}

export function CommentHtml({
  id,
  title,
  user,
  subject,
  chapter,
  ...rest
}: CommentHtmlProps) {
  const { classes, theme } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        {user.profile_pic ? (
          <Avatar src={user.profile_pic} alt={user.Name} radius="xl" />
        ) : (
          <Avatar alt={user.Name} radius="xl">
            {user.Name.at(0)?.toUpperCase()}
          </Avatar>
        )}
        <Text size="sm">{user.Name}</Text>

        <div style={{ flexGrow: 1 }} />
        <Text size="xs">
          {dayjs(rest.created_at).format("hh:mm a, DD MMM, YYYY")}
        </Text>
      </Group>
      <Box pl={theme.spacing.xl * 2}>
        <Anchor size="lg" variant="text" component={Link} to={id.toString()}>
          {title}
        </Anchor>

        <Breadcrumbs mt="md" separator="→">
          <Text>{subject}</Text>
          <Text>{chapter}</Text>
        </Breadcrumbs>

        <Voting url={`/questions/${id}/vote`} {...rest} />

        <Group position="apart" mt="lg">
          <Button
            variant="outline"
            component={Link}
            to={id.toString() + "/#comments"}
          >
            See Answers
          </Button>
          <Button component={Link} to={id.toString() + "/respond"}>
            Answer
          </Button>
        </Group>
      </Box>
    </Paper>
  );
}
