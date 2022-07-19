import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";
// import useDrawer from "~/store/drawer";

type Props = {};

const MainLinks = (props: Props) => {
  return (
    <>
      <Button size="sm" variant="subtle" component={NavLink} to="/">
        Home
      </Button>
      <Button size="sm" variant="subtle" component={NavLink} to="/questions">
        Questions
      </Button>
      <Button size="sm" variant="subtle" component={NavLink} to="/about">
        About Us
      </Button>
    </>
  );
};

export default MainLinks;
