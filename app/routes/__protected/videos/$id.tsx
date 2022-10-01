import {
  Avatar,
  Box,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { json, type LoaderArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import Youtube from "react-youtube";

import { contentHOF } from "~/services/refresh.server";
import { getVideoQuestionById } from "~/services/video-question.server";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${data.Que} - Ronon`,
  };
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.id;
  if (!id) {
    throw json({ error: "No id provided!" }, { status: 400 });
  }
  return contentHOF(request, (accessToken) =>
    getVideoQuestionById(parseInt(id!), accessToken).catch(console.log)
  );
};

const useStyles = createStyles((theme) => ({
  player: {
    width: "100%",
    height: "auto",
    aspectRatio: "16/9",
  },
}));

export default function QuestionAnswers() {
  const question = useLoaderData<typeof loader>();
  const { classes } = useStyles();

  return (
    <Container mt="xl">
      {/* Author info */}
      <Group>
        {question.user.profile_pic ? (
          <Avatar
            src={question.user.profile_pic}
            alt={question.user.name}
            size="lg"
            radius="xl"
          />
        ) : (
          <Avatar alt={question.user.name} size="lg" radius="xl">
            {question.user.name.at(0)?.toUpperCase()}
          </Avatar>
        )}
        <Box>
          <Text size="md">{question.user.name}</Text>
        </Box>

        <div style={{ flexGrow: 1 }} />
        <Text size="xs">
          {dayjs(question.created_at).format("hh:mm a, DD MMM, YYYY")}
        </Text>
      </Group>

      {/* Original question */}
      <Box mt="xl">
        <Title order={4}>Question:</Title>
        <Text component="p" my="xs" size="lg" weight={600}>
          {question.question}
        </Text>

        <Youtube
          iframeClassName={classes.player}
          videoId={new URL(question.video_url).searchParams.get("v")!}
          opts={{
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
        />
      </Box>
    </Container>
  );
}
