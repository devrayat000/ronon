import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
} from "@mantine/core";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { type ActionArgs, redirect } from "@remix-run/node";

import type { Token } from "~/interfaces/token";
import { api } from "~/modules/axios.server";
import { getCookieHeader } from "~/services/cookie-header.server";

export async function action({ request }: ActionArgs) {
  try {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData.entries());

    const loginRes = await api.post<Token | any>("/token/", {
      email,
      password,
    });

    const { access, refresh } = loginRes.data;
    console.log(access);

    return redirect(`/questions`, {
      headers: await getCookieHeader(access, refresh),
    });
  } catch (error) {
    console.log(error);
    return { authError: error?.data?.message ?? "User may not exist" };
  }
}

export default function SigninPage() {
  const actionData = useActionData();
  const [params] = useSearchParams();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          component={Link}
          to={{
            pathname: "/signup",
            search: params.toString(),
          }}
          size="sm"
        >
          Create account
        </Anchor>
      </Text>

      <Paper
        component={Form}
        method="post"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
      >
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          name="email"
          variant="filled"
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          name="password"
          variant="filled"
          required
          mt="md"
        />
        <Group mt="md">
          <Anchor component={Link} to="/forgot-password" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        {actionData?.authError && (
          <Text color="red">{actionData.authError}</Text>
        )}
        <Button fullWidth type="submit" mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
