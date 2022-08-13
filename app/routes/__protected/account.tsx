import {
  Box,
  Container,
  Paper,
  Stack,
  Text,
  Title,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";

import { getUserQuestions } from "~/services/user.server";
import { requireId } from "~/modules/jwt.server";
import type { User } from "~/interfaces/user";
import type { Question } from "~/interfaces/question";
import { contentHOF } from "~/services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  return contentHOF(request, (accessToken) => {
    const id = requireId(accessToken);
    return getUserQuestions(id, accessToken).then((r) => r.reverse());
  });
}

type LoaderData = Pick<Question, "Que">[];

export default function ProfilePage() {
  const questions = useLoaderData<LoaderData>();
  const { user } = useOutletContext<{ user: User }>();

  return (
    <Container mt="xl">
      <Title order={1} align="center">
        Profile
      </Title>
      <SimpleGrid cols={2} breakpoints={[{ cols: 1, maxWidth: "md" }]} mt="xl">
        <Stack>
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

        {user.profile_pic && (
          <Image
            src={user.profile_pic}
            alt={user.Name}
            radius="md"
            // width="50%"
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                gridRowStart: 1,
              },
            })}
          />
        )}
      </SimpleGrid>

      <Stack mt="xl">
        <Text>
          <b>Points Earned:</b> {user["Points Earned"]}
        </Text>
        <Text>
          <b>Points Withdrawn:</b> {user["Points Withdrawn"]}
        </Text>
        <Text>
          <b>Points to be withdrawn:</b> {user["Points to be withdrawn"]}
        </Text>
      </Stack>

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
