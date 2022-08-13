import {
  createStyles,
  Avatar,
  Group,
  Paper,
  Anchor,
  Box,
  Button,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import type { User } from "~/interfaces/user";

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
  answerCount: number;
  author: string;
  user: User;
}

export function CommentHtml({
  id,
  title,
  author,
  answerCount,
  user,
}: CommentHtmlProps) {
  const { classes, theme } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        {user.profile_pic ? (
          <Avatar src={user.profile_pic} alt={author} radius="xl" />
        ) : (
          <Avatar alt={author} radius="xl">
            {author.at(0)?.toUpperCase()}
          </Avatar>
        )}
        <Anchor size="sm" variant="text" component={Link} to="/u/someone">
          {author}
        </Anchor>
      </Group>
      <Box pl={theme.spacing.xl * 2}>
        <Anchor size="lg" variant="text" component={Link} to={id.toString()}>
          {title}
        </Anchor>

        <Group position="apart" mt="md">
          <Button
            variant="outline"
            component={Link}
            to={id.toString() + "/#comments"}
          >
            {answerCount} Answers
          </Button>
          <Button component={Link} to={id.toString() + "/respond"}>
            Answer
          </Button>
        </Group>
      </Box>
    </Paper>
  );
}
