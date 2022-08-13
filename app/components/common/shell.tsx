import { AppShell, ScrollArea } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { createContext, useRef } from "react";

import MyFooter from "./footer";
import MyHeader from "./header";

type Props = React.PropsWithChildren<{}>;

const footerData = [
  {
    title: "Company",
    links: [
      { label: "Contact Us", link: "contact" },
      { label: "About Ronon", link: "about" },
      { label: "Pricing", link: "pricing" },
      { label: "Terms & Conditions", link: "terms-conditions" },
      { label: "Privacy Policy", link: "privacy-policy" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join our facebook group",
        link: "https://www.facebook.com/groups/ronon",
        external: true,
      },
      {
        label: "Visit our facebook page",
        link: "https://www.facebook.com/rononedu",
        external: true,
      },
    ],
  },
];

type ScrollPosition = {
  x: number;
  y: number;
};

export const ScrollContext = createContext<
  [ScrollPosition, (params: Partial<ScrollPosition>) => void]
>([{ x: 0, y: 0 }, () => {}]);

const MyShell: React.FC<Props> = (props) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, onScrollPositionChange] =
    useDebouncedState<ScrollPosition>(
      {
        x: 0,
        y: 0,
      },
      200
    );
  // const [, startTransition] = useTransition();

  function scrollTo({ x, y }: Partial<ScrollPosition>) {
    console.log("scroll to");
    scrollableRef.current?.scrollTo({ top: y, left: x, behavior: "smooth" });
  }

  return (
    <ScrollArea
      sx={{ height: "100vh", scrollBehavior: "smooth" }}
      viewportRef={scrollableRef}
      onScrollPositionChange={onScrollPositionChange}
    >
      <AppShell
        header={<MyHeader />}
        footer={<MyFooter data={footerData} />}
        styles={{ main: { paddingTop: 0 } }}
      >
        <ScrollContext.Provider value={[scrollPosition, scrollTo]}>
          {props.children}
        </ScrollContext.Provider>
      </AppShell>
    </ScrollArea>
  );
};

export default MyShell;
