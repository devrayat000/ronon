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
  },
}));

export default function Index() {
  const { classes, theme } = useStyles();

  return (
    <Container fluid px={theme.spacing.xl * 4}>
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
