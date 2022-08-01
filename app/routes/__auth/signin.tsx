import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { Form, Link, useSearchParams } from "@remix-run/react";
import { type ActionArgs, redirect } from "@remix-run/node";

import type { Token } from "~/interfaces/token";
import { api } from "~/modules/axios.server";
import { getCookieHeader } from "~/services/cookie-header.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData.entries());

  const loginRes = await api.post<Token>("/token/", { email, password });
  const { access, refresh } = loginRes.data;

  return redirect(`/questions`, {
    headers: await getCookieHeader(access, refresh),
  });
}

export default function SigninPage() {
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
        <Anchor component={Link} mt="md" to="/forgot-password" size="sm">
          Forgot password?
        </Anchor>
        <Button fullWidth type="submit" mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
