import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider, DEFAULT_THEME, Global } from "@mantine/core";

import MyShell from "./components/common/shell";
import logo from "~/assets/logo.png";
import { getCookie } from "./services/cookie.server";
import { decodeToken } from "./modules/jwt.server";
import { getUser } from "./services/user.server";
import { contentHOF } from "./services/refresh.server";

export async function loader({ request }: LoaderArgs) {
  const accessToken = await getCookie(request);
  if (!accessToken) return null;
  const token = decodeToken(accessToken);
  if (!token || !("user_id" in token)) return null;

  const user = await contentHOF(request, (accessToken) =>
    getUser(token.user_id, accessToken)
  );
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

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
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
          <MyShell>
            <Outlet />
          </MyShell>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
