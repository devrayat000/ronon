import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  createStyles,
  Container,
} from "@mantine/core";
import type { HeadersFunction, MetaFunction } from "@remix-run/node";

import { ContactIconsList } from "~/components/contact/owener";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
  };
};

export const meta: MetaFunction = () => {
  return {
    title: "Contact Us - Ronon",
    description: "",
  };
};

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      backgroundColor: theme.colors[theme.primaryColor][5],
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.md,
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.lg,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export default function ContactUsPage() {
  const { classes } = useStyles();

  return (
    <Container my="xl">
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Text
              size="lg"
              weight={700}
              className={classes.title}
              sx={{ color: "#fff" }}
            >
              Contact information
            </Text>

            <ContactIconsList variant="white" />
          </div>

          <form
            className={classes.form}
            onSubmit={(event) => event.preventDefault()}
          >
            <Text size="lg" weight={700} className={classes.title}>
              Or, get in touch
            </Text>

            <div className={classes.fields}>
              <TextInput label="Your name" placeholder="Your name" />
              <TextInput
                label="Your email"
                placeholder="hello@mantine.dev"
                required
                mt="md"
              />

              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={3}
              />

              <Group position="right" mt="md">
                <Button type="submit" className={classes.control}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
