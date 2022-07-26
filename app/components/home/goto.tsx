import { Box, Button, Container, createStyles, Text } from "@mantine/core";
import { Link } from "@remix-run/react";

type Props = {};

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: -theme.spacing.md,
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.md}px`,
    background: theme.fn.linearGradient(45, "#DD226D", "#8C4CF5"),
  },
  container: {
    display: "grid",
    placeItems: "center",
  },
  text: {
    fontWeight: 900,
    fontSize: theme.fontSizes.xl * 1.5,
    color: theme.white,
  },
}));

const GotoSection = (props: Props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container fluid my="xl" className={classes.container}>
        <Text className={classes.text} component="p" my={0}>
          Have anything on you mind?
        </Text>
        <Button component={Link} to="questions" mt="xl">
          Ask Questions
        </Button>
      </Container>
    </Box>
  );
};

export default GotoSection;
