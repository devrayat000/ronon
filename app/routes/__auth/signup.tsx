import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { Form, Link, useSearchParams } from "@remix-run/react";
import { type ActionArgs, redirect } from "@remix-run/node";

import { api } from "~/modules/axios.server";
import type { Token } from "~/interfaces/token";
import { getCookieHeader } from "~/services/cookie-header.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { email, name, phone, password } = Object.fromEntries(
    formData.entries()
  );

  await api.post("/createUser/", { email, name, phone, password });
  const loginRes = await api.post<Token>("/token/", { email, password });
  const { access, refresh } = loginRes.data;

  return redirect(`/questions`, {
    headers: await getCookieHeader(access, refresh),
  });
}

export default function SignupPage() {
  const [params] = useSearchParams();

  return (
    <Container size={420} my={32}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to Ronon!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          component={Link}
          to={{
            pathname: "/signin",
            search: params.toString(),
          }}
          size="sm"
        >
          Sign In
        </Anchor>
      </Text>

      {/* Signup form */}
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
          label="Full Name"
          placeholder="John Doe"
          name="name"
          variant="filled"
          required
          minLength={6}
        />
        <TextInput
          label="Email"
          type="email"
          name="password"
          variant="filled"
          placeholder="you@mantine.dev"
          required
          mt="md"
        />
        <TextInput
          label="Phone"
          type="text"
          name="phone"
          variant="filled"
          placeholder="013xxxxxxxx"
          required
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          name="password"
          variant="filled"
          minLength={8}
          maxLength={32}
          mt="md"
        />
        <Checkbox
          mt="md"
          label={
            <>
              I agree to your{" "}
              <Anchor component={Link} to="/terms-conditions" size="sm">
                Terms & Conditions
              </Anchor>
              .
            </>
          }
        />
        <Button type="submit" fullWidth mt="xl">
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}
