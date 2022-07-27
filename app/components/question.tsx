import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Anchor,
  Box,
  Button,
} from "@mantine/core";
import { Link } from "@remix-run/react";

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
  postedAt: string;
  title: string;
  body: string;
  answerCount: number;
  author: {
    name: string;
    image: string;
  };
}

export function CommentHtml({
  id,
  postedAt,
  title,
  body,
  author,
  answerCount,
}: CommentHtmlProps) {
  const { classes, theme } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <Group>
          <Anchor size="sm" variant="text" component={Link} to="/u/someone">
            {author.name}
          </Anchor>
          <Text size="xs" color="dimmed">
            Asked: {postedAt}
          </Text>
        </Group>
      </Group>
      <Box pl={theme.spacing.xl * 2}>
        <Anchor size="lg" variant="text" component={Link} to={id.toString()}>
          {title}
        </Anchor>
        <TypographyStylesProvider className={classes.body}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </TypographyStylesProvider>

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
