import { Anchor, Group, Header, useMantineTheme } from "@mantine/core";
import { Link, NavLink } from "@remix-run/react";

type Props = {};

const MyHeader: React.FC<Props> = (props) => {
  const theme = useMantineTheme();

  return (
    <Header height={70} p="xs" px={120}>
      <Group align="center" position="apart" style={{ height: "100%" }}>
        {/* App title */}
        <Anchor
          sx={{ fontSize: theme.fontSizes.xl * 1.5 }}
          weight="bold"
          variant="text"
          component={Link}
          to="/"
        >
          Ronon
        </Anchor>

        {/* Header links */}
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
          <Anchor size="sm" component={NavLink} to="/register">
            Register
          </Anchor>
          <Anchor size="sm" component={NavLink} to="/signin">
            Sign In
          </Anchor>
        </Group>
      </Group>
    </Header>
  );
};

export default MyHeader;
