import { ActionIcon, Avatar, Menu, useMantineTheme } from "@mantine/core";
import { Link } from "@remix-run/react";
import { Logout, Settings } from "tabler-icons-react";

type Props = {};

const UserAvatar = (props: Props) => {
  const theme = useMantineTheme();

  return (
    <Menu
      size="auto"
      placement="end"
      transition="pop-top-right"
      control={
        <ActionIcon>
          <Avatar radius="xl" size="md">
            S
          </Avatar>
        </ActionIcon>
      }
    >
      <Menu.Item icon={<Settings size={14} />} component={Link} to="/account">
        Account Settings
      </Menu.Item>
      <Menu.Item
        icon={<Logout size={14} color={theme.colors.red[6]} />}
        color="red"
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default UserAvatar;
