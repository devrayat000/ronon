import { Button, createStyles } from "@mantine/core";
import { NavLink } from "@remix-run/react";
// import useDrawer from "~/store/drawer";

type Props = {};

const useStyles = createStyles((theme) => {
  const activeColor =
    theme.primaryColor !== "orange"
      ? theme.colors.orange[6]
      : theme.colors.red[6];

  return {
    navlink: {
      "&.active": {
        color: activeColor,
        // '&:hover': {
        ...theme.fn.hover({
          backgroundColor: theme.fn.lighten(activeColor, 0.85),
        }),
        // }
      },
    },
  };
});

const MainLinks = (props: Props) => {
  const { classes } = useStyles();
  return (
    <>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        reloadDocument
        to="/"
      >
        Home
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        reloadDocument
        to="/questions"
      >
        Questions
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        reloadDocument
        to="/videos"
      >
        Videos
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        reloadDocument
        to="/about"
      >
        About
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        reloadDocument
        to="/contact"
      >
        Contact Us
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        reloadDocument
        to="/pricing"
      >
        Pricing
      </Button>
    </>
  );
};

export default MainLinks;
