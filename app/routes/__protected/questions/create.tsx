import {
  ActionIcon,
  Button,
  Container,
  Group,
  Image,
  Paper,
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
} from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { IconCheck, IconPhoto } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";

import { requireId } from "~/modules/jwt.server";
import { contentHOF } from "~/services/refresh.server";
import { uploadHandler } from "~/services/upload-handler.server";

export const meta: MetaFunction = () => {
  return {
    title: "Ask Question - Ronon",
  };
};

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
  const transition = useTransition();
  const actionData = useActionData();

  const [image, setImage] = useState<null | undefined | File>(
    () => actionData?.params?.img
  );

  const formRef = useRef<HTMLFormElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

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

  return (
    <Container>
      <Paper
        ref={formRef}
        component={Form}
        replace
        encType="multipart/form-data"
        method="post"
        withBorder
        mt="xl"
        p="lg"
      >
        <Textarea
          placeholder="Write question..."
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
