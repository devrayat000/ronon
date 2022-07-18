import { Container, Title } from "@mantine/core";

export default function QuestionHome() {
  return (
    <Container
      fluid
      sx={{
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px) - 52px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Title order={2}>Please Login to see answers! 😊</Title>
    </Container>
  );
}
