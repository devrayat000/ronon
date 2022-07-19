import { Anchor, createStyles, Group, Header, MediaQuery } from "@mantine/core";
import { Link, NavLink } from "@remix-run/react";
import MyDrawer from "./drawer";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.xl * 4,
    paddingRight: theme.spacing.xl * 4,
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
  const { classes, theme } = useStyles();

  return (
    <Header height={70} p="xs" className={classes.header}>
      <Group align="center" position="apart" style={{ height: "100%" }}>
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
            Ronon
          </Anchor>
        </Group>

        {/* Header links */}
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Group spacing="lg">
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
        </MediaQuery>
      </Group>
    </Header>
  );
};

export default MyHeader;
