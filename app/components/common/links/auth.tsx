import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";

type Props = {};

const AuthLinks = (props: Props) => {
  return (
    <>
      <Button size="sm" variant="light" component={NavLink} to="/signin">
        Sign In
      </Button>
      <Button size="sm" component={NavLink} to="/signup">
        Register
      </Button>
    </>
  );
};

export default AuthLinks;
