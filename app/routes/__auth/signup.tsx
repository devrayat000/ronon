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

      <Paper component={Form} withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          required
          minLength={6}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="you@mantine.dev"
          required
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
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
