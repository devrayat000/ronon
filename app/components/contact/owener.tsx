import { useState } from "react";
import {
  UnstyledButton,
  type UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Popover,
} from "@mantine/core";
import { IconAt, IconChevronRight, IconPhoneCall } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
}));

type UserButtonProps<C> = UnstyledButtonProps<C> & {
  image?: string;
  name: string;
  email: string;
  phone: string;
  icon?: React.ReactNode;
};

export default function UserInfoIcons<C = "button">({
  image,
  name,
  email,
  icon,
  phone,
  ...others
}: UserButtonProps<C>) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <UnstyledButton
          className={classes.user}
          onClick={() => setOpened((o) => !o)}
          {...others}
        >
          <Group>
            {image ? (
              <Avatar src={image} radius="xl" size="sm" />
            ) : (
              <Avatar radius="xl" size="sm">
                {name.at(0)?.toUpperCase()}
              </Avatar>
            )}

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>
            </div>

            {icon || <IconChevronRight size={14} stroke={1.5} />}
          </Group>
        </UnstyledButton>
      }
      width={260}
      position="bottom"
      withArrow
    >
      <div>
        <Group noWrap spacing={10} mt={3}>
          <IconAt stroke={1.5} size={16} className={classes.icon} />
          <Text size="xs" color="dimmed">
            {email}
          </Text>
        </Group>

        <Group noWrap spacing={10} mt={5}>
          <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
          <Text size="xs" color="dimmed">
            {phone}
          </Text>
        </Group>
      </div>
    </Popover>
  );
}
