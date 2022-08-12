import { createStyles, Text, Container, Image } from "@mantine/core";
import { Link } from "@remix-run/react";

import logo from "~/assets/logo.png";

const useStyles = createStyles((theme) => ({
  footer: {
    // marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: theme.spacing.md,
    fontFamily: "'Noto Serif Bengali', serif",

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",

    [theme.fn.smallerThan("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      rowGap: theme.spacing.md,
      marginTop: theme.spacing.lg,
      alignSelf: "start",
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.lg,
    },
  },

  wrapper: {
    // width: 160,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string; external?: boolean }[];
  }[];
}

export default function MyFooter({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) =>
      link.external ? (
        <Text
          key={index}
          className={classes.link}
          component="a"
          href={link.link}
          target="_blank"
          rel="noreferer"
        >
          {link.label}
        </Text>
      ) : (
        <Text
          key={index}
          className={classes.link}
          component={Link}
          to={link.link}
        >
          {link.label}
        </Text>
      )
    );

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image src={logo} alt="Brand Logo Footer" height={80} />
          <Text size="sm" color="dimmed" className={classes.description}>
            রণন একটি শিক্ষামূলক ওয়েবসাইট। শিক্ষার্থীদের যেকোনো জিজ্ঞাসার উত্তর
            দেওয়ার জন্যই রণনের উদ্ভব। বাংলাদেশের সবচেয়ে বড় শিক্ষাবিষয়ক কমিউনিটি
            গড়ার লক্ষ্য নিয়ে কাজ করে যাচ্ছে রণন।
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © {new Date().getFullYear()} ronon.org. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
