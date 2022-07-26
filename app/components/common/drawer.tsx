import {
  Burger,
  createStyles,
  Drawer,
  MediaQuery,
  Space,
  Stack,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { useLocation } from "@remix-run/react";
import { useEffect } from "react";

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
  const [open, toggle] = useBooleanToggle(false);
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
        <Burger opened={open} title={title} onClick={() => toggle()} />
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
          <AuthLinks />
        </Stack>
      </Drawer>
    </>
  );
};

export default MyDrawer;
