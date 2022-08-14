import { ActionIcon, Avatar, Menu, useMantineTheme } from "@mantine/core";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { IconLogout, IconSettings } from "@tabler/icons";

import type { User } from "~/interfaces/user";

type Props = {};

const UserAvatar = (props: Props) => {
  const user = useLoaderData<User>();
  const theme = useMantineTheme();
  const submit = useSubmit();

  return (
    <Menu position="bottom-end" transition="pop-top-right">
      <Menu.Target>
        <ActionIcon radius="xl" size="xl">
          {user.profile_pic ? (
            <Avatar src={user.profile_pic} radius="xl" size="md" />
          ) : (
            <Avatar radius="xl" size="md">
              {user.Name.at(0)?.toUpperCase()}
            </Avatar>
          )}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconSettings size={14} />}
          component={Link}
          to="/account"
        >
          Account Settings
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size={14} color={theme.colors.red[6]} />}
          color="red"
          component="button"
          onClick={() => submit({}, { action: "/logout", method: "post" })}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserAvatar;
