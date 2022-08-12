import { useEffect } from "react";
import {
  Burger,
  Button,
  createStyles,
  Drawer,
  MediaQuery,
  Space,
  Stack,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Form, NavLink, useLoaderData, useLocation } from "@remix-run/react";

import type { User } from "~/interfaces/user";
import AuthLinks from "./links/auth";
import MainLinks from "./links/main";

const useStyles = createStyles((theme) => ({
  drawer: {
    width: 320,
    [theme.fn.smallerThan("sm")]: {
      width: "75%",
    },
  },
}));

type Props = {};

const MyDrawer = (props: Props) => {
  const user = useLoaderData<User | null>();
  const [open, toggle] = useToggle([false, true]);
  const { classes, theme } = useStyles();
  const location = useLocation();

  const title = open ? "Close navigation" : "Open navigation";

  useEffect(() => {
    toggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Burger
          aria-label="Open navigation"
          opened={open}
          title={title}
          onClick={() => toggle()}
        />
      </MediaQuery>
      <Drawer
        opened={open}
        onClose={() => toggle(false)}
        classNames={{ drawer: classes.drawer }}
        padding="xl"
        overlayBlur={3}
      >
        {/* Main links */}
        <Stack spacing="md">
          <MainLinks />
        </Stack>

        <Space h={theme.spacing.xl * 2} />
        {/* Auth links */}
        <Stack spacing="md">
          {!user ? (
            <AuthLinks />
          ) : (
            <>
              <Button
                size="sm"
                variant="light"
                component={NavLink}
                to="/account"
              >
                Account Settings
              </Button>
              <Form action="/logout" method="post">
                <Button fullWidth size="sm" color="red">
                  Logout
                </Button>
              </Form>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default MyDrawer;
