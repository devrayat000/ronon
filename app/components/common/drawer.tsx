import {
  ActionIcon,
  Anchor,
  createStyles,
  Drawer,
  Group,
  MediaQuery,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { NavLink } from "@remix-run/react";
import { Menu2 } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  drawer: {
    width: 320,
    [theme.fn.smallerThan("sm")]: {
      width: 280,
    },
    [theme.fn.smallerThan("xs")]: {
      width: 240,
    },
  },
}));

type Props = {};

const MyDrawer = (props: Props) => {
  const [open, toggleDrawer] = useBooleanToggle(false);
  const { classes } = useStyles();
  return (
    <>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <ActionIcon onClick={() => toggleDrawer()}>
          <Menu2 />
        </ActionIcon>
      </MediaQuery>
      <Drawer
        opened={open}
        onClose={() => toggleDrawer(false)}
        classNames={{ drawer: classes.drawer }}
      >
        <Group direction="column" align="center" spacing="md">
          <Anchor size="sm" component={NavLink} to="/">
            Home
          </Anchor>
          <Anchor size="sm" component={NavLink} to="/questions">
            Questions
          </Anchor>
          <Anchor size="sm" component={NavLink} to="/about">
            About Us
          </Anchor>
          <Anchor size="sm" component={NavLink} to="/signup">
            Register
          </Anchor>
          <Anchor size="sm" component={NavLink} to="/signin">
            Sign In
          </Anchor>
        </Group>
      </Drawer>
    </>
  );
};

export default MyDrawer;
