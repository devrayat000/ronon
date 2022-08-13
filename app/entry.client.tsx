import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
// import { hydrateRoot } from "react-dom/client";
import { ClientProvider } from "@mantine/remix";

// hydrateRoot(
//   document,
//   <ClientProvider>
//     <RemixBrowser />
//   </ClientProvider>
// );
hydrate(
  <ClientProvider>
    <RemixBrowser />
  </ClientProvider>,
  document
);
