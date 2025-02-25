import {
  createStyles,
  ThemeIcon,
  Text,
  Box,
  Stack,
  List,
  type MantineTheme,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";

type ContactIconVariant = "white" | "gradient";

interface ContactIconStyles {
  variant: ContactIconVariant;
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === "gradient"
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : "none",
    backgroundColor: "transparent",
  },

  title: {
    color:
      variant === "gradient"
        ? theme.colors.gray[6]
        : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === "gradient" ? theme.black : theme.white,
  },
}));

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon?: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode | ((theme: MantineTheme) => React.ReactNode);
  variant?: ContactIconVariant;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = "gradient",
  className,
  ...others
}: ContactIconProps) {
  const { classes, cx, theme } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {Icon &&
        (variant === "gradient" ? (
          <ThemeIcon size={40} radius="md" className={classes.icon}>
            {<Icon size={24} />}
          </ThemeIcon>
        ) : (
          <Box mr="md">{<Icon size={24} />}</Box>
        ))}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        {typeof description === "function" ? (
          description(theme)
        ) : (
          <Text className={classes.description}>{description}</Text>
        )}
      </div>
    </div>
  );
}

interface ContactIconsListProps {
  data?: ContactIconProps[];
  variant?: ContactIconVariant;
}

const MOCKDATA: ContactIconProps[] = [
  { title: "Primary Email", description: "ronon.info@gmail", icon: IconAt },
  {
    title: "Secondary Email",
    description: (theme) => (
      <List icon={<IconAt color="white" />}>
        <List.Item sx={{ color: "white" }}>tareqhs01@gmail.com</List.Item>
        <List.Item sx={{ color: "white" }}>mhmhasanmahmud2@gmail.com</List.Item>
        <List.Item sx={{ color: "white" }}>atikfaisal20@gmail.com</List.Item>
        <List.Item sx={{ color: "white" }}>
          amanullahasif2001@gmail.com
        </List.Item>
        <List.Item sx={{ color: "white" }}>
          jubayermaruf8012@gmail.com
        </List.Item>
        <List.Item sx={{ color: "white" }}>
          mdshakibulhasancse20@gmail.com
        </List.Item>
      </List>
    ),
  },
];

export function ContactIconsList({
  data = MOCKDATA,
  variant,
}: ContactIconsListProps) {
  const items = data.map((item, index) => (
    <ContactIcon key={index} variant={variant} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
