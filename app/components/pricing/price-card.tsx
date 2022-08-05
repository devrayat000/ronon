import {
  Button,
  createStyles,
  Divider,
  List,
  Paper,
  Text,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";

type Props = {
  duration: string;
  price: number;
};

const useStyles = createStyles((theme) => ({
  price: {
    fontSize: 40,
    color: theme.black,
    fontWeight: "bold",
  },
}));

const PriceCard = ({ price, duration }: Props) => {
  const { classes, theme } = useStyles();

  return (
    <Paper withBorder radius="md" p="md">
      <Text>{duration}</Text>
      <Text mt="xl" color="dimmed">
        <span className={classes.price}>৳{price}</span>
      </Text>
      <Button fullWidth mt="md">
        Subscribe
      </Button>
      <Divider my="lg" />
      <Text>What's Included</Text>
      <List
        mt="xl"
        size="sm"
        icon={<IconCheck size={20} color={theme.colors.green[6]} />}
      >
        <List.Item>Access to basic interactive courses</List.Item>
        <List.Item>Everything in Free</List.Item>
        <List.Item>Community Support</List.Item>
      </List>
    </Paper>
  );
};

export default PriceCard;
