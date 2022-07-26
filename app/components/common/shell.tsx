import { AppShell, ScrollArea } from "@mantine/core";
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

const MyShell: React.FC<Props> = (props) => {
  return (
    <ScrollArea sx={{ height: "100vh" }}>
      <AppShell header={<MyHeader />} footer={<MyFooter data={footerData} />}>
        {props.children}
      </AppShell>
    </ScrollArea>
  );
};

export default MyShell;
