import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useNavigate,
} from "@remix-run/react";
import {
  MantineProvider,
  DEFAULT_THEME,
  Global,
  Container,
  Title,
  Text,
  Group,
  Button,
  createStyles,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StylesPlaceholder } from "@mantine/remix";

import MyShell from "./components/common/shell";
import logo from "~/assets/logo.png";
import { decodeToken } from "./modules/jwt.server";
import { getUser } from "./services/user.server";
import { rootHOF } from "./services/refresh.server";

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  const a = new Date(),
    b = new Date();
  b.setMonth(a.getMonth() + 1);

  const c = b.getMilliseconds() - a.getMilliseconds(),
    age = c / 1000;

  return {
    "Cache-Control":
      loaderHeaders.get("Cache-Control") ??
      parentHeaders.get("Cache-Control") ??
      `public, max-age=0, s-maxage=${age}, state-while-revalidate=${age}`,
  };
};

export async function loader({ request }: LoaderArgs) {
  const user = await rootHOF(request, async (accessToken) => {
    const token = decodeToken(accessToken);
    if (!token || !("user_id" in token)) return null;
    return getUser(token.user_id, accessToken);
  });
  return user;
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "icon", type: "image/png", href: logo },
    { rel: "preload", href: logo, as: "image", type: "image/png" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700;900&display=swap",
    },
  ];
};

function Document(props: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        fontFamily: "Inter, " + DEFAULT_THEME.fontFamily,
        primaryColor: "violet",
      }}
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
    >
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <StylesPlaceholder />
        </head>
        <body>
          <Global
            styles={{
              "html, body": {
                overflowY: "hidden",
              },
              body: {
                margin: 0,
              },
            }}
          />
          <NotificationsProvider>
            <MyShell>{props.children}</MyShell>
          </NotificationsProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

const useCatchStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

function ErrorView() {
  const navigate = useNavigate();
  const caught = useCatch();
  const { classes } = useCatchStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{caught.status}</div>
      <Title className={classes.title}>Nothing to see here.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => navigate(-1)}>
          Take me back
        </Button>
      </Group>
    </Container>
  );
}

export function CatchBoundary() {
  return (
    <Document>
      <ErrorView />
    </Document>
  );
}
