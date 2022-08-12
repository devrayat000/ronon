import {
  Box,
  Container,
  createStyles,
  List,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons";
import type { MetaFunction } from "@remix-run/node";

import OwnerInfoAction, {
  type OwnerInfoActionProps,
} from "~/components/about/owner";

import tareq from "../assets/owners/tareq.jpg";
import atik from "../assets/owners/atik.jpg";
import omor from "../assets/owners/omor.jpeg";
import asif from "../assets/owners/asif.jpg";
import maruf from "../assets/owners/maruf.jpg";
import sakibul from "../assets/owners/sakibul.jpg";

export const meta: MetaFunction = () => {
  return {
    title: "About Us - Ronon",
    description:
      "রণন একটি শিক্ষামূলক ওয়েবসাইট। শিক্ষার্থীদের যেকোনো জিজ্ঞাসার উত্তর দেওয়ার জন্যই রণনের উদ্ভব। বাংলাদেশের সবচেয়ে বড় শিক্ষাবিষয়ক কমিউনিটি গড়ার লক্ষ্য নিয়ে কাজ করে যাচ্ছে রণন।",
  };
};

const owners: OwnerInfoActionProps[] = [
  {
    name: "মুহাম্মাদ তারেক হাসান সিদ্দিকী",
    avatar: tareq,
    email: "tareqhs01@gmail.com",
    job: "যন্ত্রকৌশল বিভাগ, বুয়েট",
  },
  {
    name: "মুহাম্মাদ আতিক ফয়সাল",
    avatar: atik,
    email: "atikfaisal20@gmail.com",
    job: "ধাতু ও ধাতব কৌশল বিভাগ, বুয়েট",
  },
  {
    name: "মোঃ ওমর ফারুক হাসান",
    avatar: omor,
    email: "mhmhasanmahmud2@gmail.com",
    job: "যন্ত্রকৌশল বিভাগ, বুয়েট",
  },
  {
    name: "মোঃ আমানুল্লাহ আসিফ",
    avatar: asif,
    email: "amanullahasif2001@gmail.com",
    job: "যন্ত্রকৌশল বিভাগ, বুয়েট",
  },
  {
    name: "জুবায়ের আল মারুফ",
    avatar: maruf,
    email: "jubayermaruf8012@gmail.com",
    job: "ঢাকা মেডিকেল কলেজ",
  },
  {
    name: "সাকিবুল হাসান",
    avatar: sakibul,
    email: "mdshakibulhasancse20@gmail.com",
    job: "সিএসই- রুয়েট",
  },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    fontFamily: "'Noto Serif Bengali', serif",
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    fontFamily: "inherit",
  },
  font: {
    fontFamily: "inherit",
  },
  section: {
    marginTop: theme.spacing.xl * 4,
  },
  article: {
    "&:nth-of-type(odd)": {
      marginRight: theme.spacing.xl * 12,
    },
    "&:nth-of-type(even)": {
      marginLeft: theme.spacing.xl * 12,
    },
    [theme.fn.smallerThan("md")]: {
      "&:nth-of-type(odd)": {
        marginRight: 0,
      },
      "&:nth-of-type(even)": {
        marginLeft: 0,
      },
    },
  },
  sectionTitle: {
    color: theme.colors[theme.primaryColor][6],
    fontFamily: "inherit",
  },
}));

export default function AboutPage() {
  const { classes, cx } = useStyles();

  return (
    <main>
      <Title order={2} align="center">
        About Us
      </Title>
      <Container className={classes.wrapper}>
        <Title order={1} className={classes.title} mt="xl">
          “অণুরিত হোক প্রতিটি জিজ্ঞাসা”
        </Title>
      </Container>
      <Container className={classes.wrapper}>
        <Box
          component="article"
          className={cx(classes.section, classes.article)}
        >
          <Title order={2} className={classes.sectionTitle}>
            রণন কি?
          </Title>
          <Text component="p" size="xl" className={classes.font}>
            রণন একটি শিক্ষামূলক ওয়েবসাইট। শিক্ষার্থীদের যেকোনো জিজ্ঞাসার উত্তর
            দেওয়ার জন্যই রণনের উদ্ভব। বাংলাদেশের সবচেয়ে বড় শিক্ষাবিষয়ক কমিউনিটি
            গড়ার লক্ষ্য নিয়ে কাজ করে যাচ্ছে রণন।
          </Text>
        </Box>
      </Container>
      <Box
        mx="-md"
        py="xl"
        className={classes.section}
        sx={(theme) => ({
          backgroundColor: theme.colors[theme.primaryColor][0],
        })}
      >
        <Container className={classes.wrapper}>
          <Box component="section" className={classes.article}>
            <Title order={2} className={classes.sectionTitle} align="right">
              কাদের দ্বারা পরিচালিত এটি?
            </Title>
            <Text component="p" size="xl" className={classes.font}>
              রণনের মূল চিন্তাভাবনা থেকে শুরু করে বাস্তবায়ন এবং পরিচালনায় কাজ
              করে যাচ্ছে বাংলাদেশের নেতৃস্থানীয় কিছু বিশ্ববিদ্যালয় এবং মেডিকেল
              কলেজের কয়েকজন শিক্ষার্থী। রণনের সূচনা যাদের হাত ধরেঃ
            </Text>
          </Box>
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            {owners.map((owner) => (
              <OwnerInfoAction key={owner.name} {...owner} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container className={classes.wrapper}>
        <Box
          component="section"
          className={cx(classes.section, classes.article)}
        >
          <Title order={2} className={classes.sectionTitle}>
            যেসকল বিষয নিয়ে আমরা কাজ করছি
          </Title>

          <List
            spacing="lg"
            size="lg"
            mt="xl"
            // center
            icon={
              <ThemeIcon color="teal" size={32} radius="xl">
                <IconCircleCheck size={20} />
              </ThemeIcon>
            }
            className={classes.font}
          >
            <List.Item>
              <b>প্রবলেম সলভিংঃ</b> পদার্থ,রসায়ন কিংবা গণিত বিষয পড়তে গিয়ে
              মোটামোটি আমরা সবাই যে সমস্যার সম্মুখিন হয়েছি তা হল কোনো একটা
              প্রশ্নের উত্তর করতে না পারা বা উত্তর না মেলা ইত্যাদি। সেসকল সমস্যা
              সমাধানের জন্য আমাদের থাকছে ডেডিকেটেড প্যানেল। যে প্যানেলে থাকবে
              বুয়েট, ডিএমসি, চুয়েট, কুয়েট, রুয়েট সহ দেশের শীর্যস্থানীয় মেডিকেল
              কলেজ এবং বিশ্ববিদ্যালয়ের মেধাবী ছাত্ররা।
            </List.Item>
            <List.Item>
              <b>ডিসকাশনঃ</b> পড়াশোনা বিষয়ক যেকোনো প্রশ্ন জানার জন্য বা আলোচনা
              করার জন্য থাকছে বিশাল কমিউনিটি। পড়াশোনার স্ট্র্যাটেজি, উচ্চশিক্ষা,
              বুক রিভিউ, বিশ্ববিদ্যালয় বা সাবজেক্ট রিভিউ সহ নানা বিষয় সম্পর্কে
              উন্মুক্ত আলোচনার সুযোগ। এখানে থাকছে না কোনো প্রশ্ন করে হাসির পাত্র
              হবার ভয় কেননা আমরা প্রতিটি প্রশ্নকেই সমান গুরুত্ব দিয়ে সমাধান করার
              চেষ্টা করি।
            </List.Item>
            <List.Item>
              <b>বিশাল আর্কাইভঃ</b> ফেসবুকে অনেক গ্রুপ আছে যেখানে ফ্রিতেই
              প্রবলেম সলভিং করা হয় কিন্তু সেই গ্রুপগুলোর সমস্যা হল কোনো প্রশ্নের
              উত্তর পাবার নিশ্চয়তা নেই এবং অন্য কারো করা আগের প্রশ্নের উত্তর
              সার্চ দিয়ে দেখবেন সেই সুযোগ ও নেই। এই সমস্যার সমাধানের জন্য আমরা
              বিশাল আর্কাইভ তৈরি করব যেখানে সার্চ দিলেই পড়াশোনা সংক্রান্ত উত্তর
              পাওয়া যাবে।
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon color="blue" size={32} radius="xl">
                  <IconCircleDashed size={20} />
                </ThemeIcon>
              }
            >
              <b>লাইভ-চ্যাটঃ</b> পড়াশোনা বিষয়ক যেকোনা প্রশ্নের উত্তর বিস্তারিত
              বোঝার জন্য শিক্ষক প্যানেলের বা সহপাঠীদের সাথে লাইভ চ্যাটের সুবিধা।
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon color="blue" size={32} radius="xl">
                  <IconCircleDashed size={20} />
                </ThemeIcon>
              }
            >
              <b>কুইজ বা পরীক্ষাঃ</b> শিক্ষার্থীদের মেধা যাচাইয়ের জন্য এবং নতুন
              নতুন প্রশ্নের সাথে পরিচয় করিয়ে দেওয়ার জন্য থাকবে বিভিন্ন রকমের
              কুইজ এবং কুইজের সাথে থাকবে বিভিন্ন পুরষ্কারের ব্যবস্থা।
            </List.Item>
          </List>
        </Box>
      </Container>
    </main>
  );
}
