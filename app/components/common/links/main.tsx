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
        to="/"
      >
        Home
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        to="/questions"
      >
        Questions
      </Button>
      <Button
        className={classes.navlink}
        size="sm"
        variant="subtle"
        component={NavLink}
        to="/about"
      >
        About Us
      </Button>
    </>
  );
};

export default MainLinks;
