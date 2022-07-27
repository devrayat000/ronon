import { AppShell, ScrollArea } from "@mantine/core";
import { useTransition, createContext, useRef, useState } from "react";

import MyFooter from "./footer";
import MyHeader from "./header";

type Props = React.PropsWithChildren<{}>;

const footerData = [
  {
    title: "Company",
    links: [
      { label: "Contact Us", link: "contact" },
      { label: "About Ronon", link: "about" },
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
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
  const [scrollPosition, onScrollPositionChange] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  const [, startTransition] = useTransition();

  function scrollTo({ x, y }: Partial<ScrollPosition>) {
    console.log("scroll to");
    scrollableRef.current?.scrollTo({ top: y, left: x, behavior: "smooth" });
  }

  return (
    <ScrollArea
      sx={{ height: "100vh", scrollBehavior: "smooth" }}
      viewportRef={scrollableRef}
      onScrollPositionChange={(position) => {
        startTransition(() => onScrollPositionChange(position));
      }}
    >
      <AppShell header={<MyHeader />} footer={<MyFooter data={footerData} />}>
        <ScrollContext.Provider value={[scrollPosition, scrollTo]}>
          {props.children}
        </ScrollContext.Provider>
      </AppShell>
    </ScrollArea>
  );
};

export default MyShell;
