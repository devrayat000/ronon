import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";

import { getUserQuestions } from "~/services/user.server";
import { requireId } from "~/modules/jwt.server";
import type { User } from "~/interfaces/user";
import type { Question } from "~/interfaces/question";
import { contentHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  return contentHOF(request, (accessToken) => {
    const id = requireId(accessToken);
    return getUserQuestions(id, accessToken);
  });
}

type LoaderData = Pick<Question, "Que">[];

export default function ProfilePage() {
  const questions = useLoaderData<LoaderData>();
  const { user } = useOutletContext<{ user: User }>();

  return (
    <Container>
      <Title order={1} align="center">
        Profile
      </Title>
      <Stack mt="xl">
        <Text>
          <b>Name:</b> {user.Name}
        </Text>
        <Text>
          <b>Email:</b> {user.Email}
        </Text>
        <Text>
          <b>Phone:</b> {user["Phone Number"]}
        </Text>
        {user["HSC Year"] && (
          <Text>
            <b>HSC:</b> {user["HSC Year"]}
          </Text>
        )}
        {user["Invite Code"] && (
          <Text>
            <b>Invite Code:</b> {user["Invite Code"]}
          </Text>
        )}
        <Text>
          <b>Since:</b> {new Date(user["Date Joined"]).getFullYear()}
        </Text>
      </Stack>

      <Button component={Link} to="points" mt="xl">
        See Points
      </Button>

      <Box mt="xl">
        <Title order={3}>Questions Asked:</Title>
        <Stack mt="md">
          {questions.map(({ Que }) => (
            <Paper key={Que} withBorder p="sm">
              {Que}
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
