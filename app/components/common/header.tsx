import {
  Anchor,
  createStyles,
  Group,
  Header,
  Image,
  MediaQuery,
} from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";

import MyDrawer from "./drawer";
import AuthLinks from "./links/auth";
import MainLinks from "./links/main";
import logo from "~/assets/logo.png";
import type { User } from "~/interfaces/user";
import UserAvatar from "./user-avatar";
// import UserAvatar from "./user-avatar";

const useStyles = createStyles((theme) => ({
  header: {
    padding: `${theme.spacing.xs}px ${theme.spacing.xl * 4}px`,
    position: "static",
    [theme.fn.smallerThan("md")]: {
      paddingLeft: theme.spacing.xl * 2,
      paddingRight: theme.spacing.xl * 2,
    },
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
    [theme.fn.smallerThan("xs")]: {
      paddingLeft: theme.spacing.xs,
      paddingRight: theme.spacing.xs,
    },
  },
}));

type Props = {};

const MyHeader: React.FC<Props> = (props) => {
  const { user } = useLoaderData<{ user: User | null }>();
  const { classes, theme } = useStyles();
  console.log("is user", user);

  return (
    <Header height={70} className={classes.header} fixed={false}>
      <Group position="apart" style={{ height: "100%" }}>
        {/* App title */}
        <Group>
          <MyDrawer />
          <Anchor
            sx={{ fontSize: theme.fontSizes.xl * 1.5 }}
            weight="bold"
            variant="text"
            component={Link}
            to="/"
          >
            <Image src={logo} alt="Brand Logo" height={56} />
          </Anchor>
        </Group>

        {/* Header links */}
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Group spacing="xs">
            <MainLinks />
          </Group>
        </MediaQuery>

        {/* Auth links  */}
        {user && "Name" in user ? (
          /* User */
          <UserAvatar />
        ) : (
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Group spacing="md">
              <AuthLinks />
            </Group>
          </MediaQuery>
        )}
      </Group>
    </Header>
  );
};

export default MyHeader;
