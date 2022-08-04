import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  NumberInput,
  Box,
} from "@mantine/core";
import {
  Form,
  useActionData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import type { User } from "~/interfaces/user";

import type { ActionArgs } from "@remix-run/node";
import { contentHOF } from "~/services/refresh.server";
import { api } from "~/modules/axios.server";
import { IconCurrencyTaka } from "@tabler/icons";
import { hideNotification, showNotification } from "@mantine/notifications";
import { useEffect } from "react";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  return contentHOF(request, (accessToken) =>
    api
      .post("/adminPoint/", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((r) => ({
        ...r.data,
        status: "ok",
        amount:
          parseFloat(data["Point Withdrawn"].toString()) +
          parseFloat(data["Points Achieved"].toString()),
      }))
  );
}

export default function PointsPage() {
  const { user } = useOutletContext<{ user: User }>();
  const actionData = useActionData();
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === "loading" && transition.type === "actionReload") {
      showNotification({
        id: "withdraw",
        title: `Successfully withdrawn ${actionData?.amount} points.`,
        message: `${actionData?.amount} points will be credited to your number`,
        autoClose: 3000,
        color: "green",
        icon: <IconCurrencyTaka />,
      });
    }

    return () => {
      hideNotification("withdraw");
    };
  }, [transition.state, transition.type, actionData]);

  return (
    <Container>
      <Title order={1} align="center">
        Points
      </Title>
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

      <Box component={Form}>
        <input type="hidden" name="Phone" value={user["Phone Number"]} />
        <NumberInput
          label="Withdraw Points"
          placeholder="10"
          name="Point Withdrawn"
          required
          variant="filled"
          hideControls
        />
        <NumberInput
          label="Points Achieved"
          name="Points Achieved"
          variant="filled"
          defaultValue={0}
          mt="md"
          hideControls
        />
        <Button mt="lg" type="submit">
          Withdraw
        </Button>
      </Box>
    </Container>
  );
}
