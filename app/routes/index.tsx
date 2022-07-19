import {
  Box,
  Button,
  Container,
  createStyles,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  primaryAction: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      right: 16,
      height: 0,
      width: 0,
      border: `8px solid ${theme.colors.pink[6]}`,
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      transform: "translateY(100%)",
    },
    "&:hover::before": {
      borderColor: theme.fn.darken(theme.colors.pink[6], 0.1),
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
    },
  },
  container: {
    paddingLeft: theme.spacing.xl * 4,
    paddingRight: theme.spacing.xl * 4,
    [theme.fn.smallerThan("md")]: {
      paddingLeft: theme.spacing.xl * 2,
      paddingRight: theme.spacing.xl * 2,
    },
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
    [theme.fn.smallerThan("xs")]: {
      paddingLeft: theme.spacing.xs,
      paddingRight: theme.spacing.xs,
    },
  },
}));

export default function Index() {
  const { classes } = useStyles();

  return (
    <Container fluid className={classes.container}>
      <SimpleGrid
        cols={1}
        spacing="md"
        breakpoints={[{ minWidth: "sm", cols: 2, spacing: "xl" }]}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Title order={1}>Welcome to Ronon</Title>
          <Text component="p">
            An online platform for you to get your question answered...
          </Text>
          <Button color="pink" className={classes.primaryAction}>
            Start Exploring
          </Button>
        </Box>
        <Image src="/assets/ronon_illustration.svg" alt="Hero Illustration" />
      </SimpleGrid>
    </Container>
  );
}
