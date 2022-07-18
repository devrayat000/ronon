import { AppShell } from "@mantine/core";
import MyHeader from "./header";

type Props = React.PropsWithChildren<{}>;

const MyShell: React.FC<Props> = (props) => {
  return <AppShell header={<MyHeader />}>{props.children}</AppShell>;
};

export default MyShell;
