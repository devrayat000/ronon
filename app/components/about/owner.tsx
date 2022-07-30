import { Text, Image, Card } from "@mantine/core";

export interface OwnerInfoActionProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
}

export default function OwnerInfoAction({
  avatar,
  name,
  email,
  job,
}: OwnerInfoActionProps) {
  return (
    <Card
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Card.Section>
        <Image src={avatar} alt={name} mx="auto" />
      </Card.Section>

      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {job}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {email}
      </Text>
    </Card>
  );
}
