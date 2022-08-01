import { ActionIcon, Avatar, Menu, useMantineTheme } from "@mantine/core";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Logout, Settings } from "tabler-icons-react";

import type { User } from "~/interfaces/user";

type Props = {};

const UserAvatar = (props: Props) => {
  const user = useLoaderData<User>();
  const theme = useMantineTheme();

  return (
    <Menu
      size="auto"
      placement="end"
      transition="pop-top-right"
      control={
        <ActionIcon>
          <Avatar radius="xl" size="md">
            {user.Name.at(0)?.toUpperCase()}
          </Avatar>
        </ActionIcon>
      }
    >
      <Menu.Item icon={<Settings size={14} />} component={Link} to="/account">
        Account Settings
      </Menu.Item>
      <Form action="/logout" method="post">
        <Menu.Item
          icon={<Logout size={14} color={theme.colors.red[6]} />}
          color="red"
          component="button"
          type="submit"
        >
          Logout
        </Menu.Item>
      </Form>
    </Menu>
  );
};

export default UserAvatar;
