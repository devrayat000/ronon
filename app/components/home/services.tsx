import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  createStyles,
  Paper,
} from "@mantine/core";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  type TablerIcon,
} from "@tabler/icons";

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
  },
  {
    icon: IconUser,
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
  },
  {
    icon: IconCookie,
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
  {
    icon: IconLock,
    title: "Secure by default",
    description:
      "Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right",
  },
  {
    icon: IconMessage2,
    title: "Get 24/7 from our community",
    description:
      "Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail",
  },
];

const useCardStyles = createStyles((theme) => ({
  paper: {
    borderTopRightRadius: theme.spacing.xl * 2,
    borderBottomLeftRadius: theme.spacing.xl * 2,
    position: "relative",
    padding: `${theme.spacing.xl * 1.5}px ${theme.spacing.lg}px ${
      theme.spacing.lg
    }px`,
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 32,
    transform: "translateY(-50%)",
  },
}));

type FeatureProps = {
  icon: TablerIcon;
  title: string;
  description: string;
};
const Feature: React.FC<FeatureProps> = ({
  icon: ServiceIcon,
  title,
  description,
}) => {
  const { classes, theme } = useCardStyles();

  return (
    <Paper withBorder className={classes.paper}>
      <ThemeIcon size="xl" className={classes.icon}>
        <ServiceIcon color={theme.white} />
      </ThemeIcon>
      <Text size="lg" weight={600}>
        {title}
      </Text>
      <Text size="xs" color="gray" mt="xs">
        {description}
      </Text>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  data?: FeatureProps[];
}

export default function FeaturesGrid({
  title,
  description,
  data = MOCKDATA,
}: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container my="xl" className={classes.wrapper}>
      <Title className={classes.title}>{title}</Title>

      {description && (
        <Container size={560} p={0}>
          <Text size="sm" className={classes.description}>
            {description}
          </Text>
        </Container>
      )}

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
