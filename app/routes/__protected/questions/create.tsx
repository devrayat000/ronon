import { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Image,
  Paper,
  Select,
  SimpleGrid,
  Textarea,
} from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
// import { Dropzone, } from "@mantine/dropzone";
import { hideNotification, showNotification } from "@mantine/notifications";
import {
  type MetaFunction,
  type ActionArgs,
  unstable_parseMultipartFormData,
  type LoaderArgs,
} from "@remix-run/node";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { IconCheck, IconPhoto } from "@tabler/icons";

import type { Subject } from "~/interfaces/question";
import { api } from "~/modules/axios.server";
import { requireId } from "~/modules/jwt.server";
import { contentHOF } from "~/services/refresh.server";
import { uploadHandler } from "~/services/upload-handler.server";

export const meta: MetaFunction = () => {
  return {
    title: "Ask Question - Ronon",
  };
};

export async function loader({ request }: LoaderArgs) {
  return contentHOF(request, async (accessToken) => {
    const [subjectRes] = await Promise.all([
      api.get<Subject[]>("/options/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);
    return {
      subjects: subjectRes.data.map((subject) => ({
        value: subject.subId,
        label: subject.subject,
      })),
    };
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  return contentHOF(request, async (accessToken) => {
    const User = requireId(accessToken);
    formData.append("User", User);

    return fetch("https://rononbd.herokuapp.com/api/createQuestion/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (r) => ({ ...(await r.json()), status: "ok" }))
      .catch((e) => {
        console.log(e);
        return {
          status: "error",
          error: e.message,
          params: Object.fromEntries(formData.entries()),
        };
      });
  });
}

export default function CreateQuestionPage() {
  const { subjects } = useLoaderData<{
    subjects: { label: string; value: string }[];
  }>();
  const transition = useTransition();
  const actionData = useActionData();
  const fetcher = useFetcher<{
    chapters: { label: string; value: string }[];
  }>();

  const [image, setImage] = useState<null | undefined | File>(
    () => actionData?.params?.img
  );

  const formRef = useRef<HTMLFormElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const preview = (() => {
    if (!image) return;
    const imageUrl = URL.createObjectURL(image);
    return (
      <Image
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  })();

  function handleSubjectSelect(value: string | null) {
    if (!value) return;
    fetcher.submit(
      {},
      { method: "post", action: "/questions/subject/" + value }
    );
  }

  useEffect(() => {
    if (
      transition.state === "loading" &&
      transition.type === "actionReload" &&
      actionData.status === "ok"
    ) {
      showNotification({
        id: "ask",
        title: "Successfully asked question",
        message: "Your question has been published.",
        autoClose: 2000,
        color: "green",
        icon: <IconCheck />,
      });
      formRef.current?.reset();
      setImage(null);
    }

    return () => {
      hideNotification("ask");
    };
  }, [transition.state, transition.type, actionData]);

  return (
    <Container>
      <Paper
        ref={formRef}
        component={fetcher.Form}
        replace
        encType="multipart/form-data"
        method="post"
        withBorder
        mt="xl"
        p="lg"
      >
        <SimpleGrid cols={1} breakpoints={[{ minWidth: "md", cols: 2 }]}>
          <Select
            label="Pick a Subject"
            placeholder="Physics"
            data={subjects}
            variant="filled"
            onChange={handleSubjectSelect}
          />
          <Select
            label="Pick a Subject"
            placeholder="Chapter 1"
            data={fetcher.data?.chapters ?? []}
            variant="filled"
            name="tagId"
            disabled={!fetcher.data}
          />
        </SimpleGrid>
        <Textarea
          mt="md"
          label="Write question"
          placeholder="What are the three laws of force?"
          name="Que"
          variant="filled"
          defaultValue={actionData?.params?.Que}
        />
        <input
          type="file"
          name="img"
          id="img"
          ref={imgRef}
          accept={IMAGE_MIME_TYPE.join(", ")}
          multiple={false}
          style={{ display: "none" }}
          defaultValue={actionData?.params?.img}
          onChange={(e) => {
            setImage(e.target.files?.item(0));
          }}
        />
        <Group position="apart" mt="md">
          <ActionIcon
            size="lg"
            title="Upload Image"
            onClick={() => imgRef.current?.click()}
          >
            <IconPhoto size={28} />
          </ActionIcon>
          <Button type="submit">Ask</Button>
        </Group>

        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          mt={preview ? "xl" : 0}
        >
          {preview}
        </SimpleGrid>
      </Paper>
    </Container>
  );
}
