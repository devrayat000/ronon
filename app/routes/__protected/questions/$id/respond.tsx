import { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Textarea,
} from "@mantine/core";
import {
  type MetaFunction,
  type ActionArgs,
  unstable_parseMultipartFormData,
  json,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { requireId } from "~/modules/jwt.server";
import { contentHOF } from "~/services/refresh.server";
import { IconPhoto } from "@tabler/icons";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { uploadHandler } from "~/services/upload-handler.server";

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Answer: ${parentsData.Que} - Ronon`,
  };
};

export async function action({ request, params }: ActionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const PQue = params.id;

  if (!PQue) {
    return json("No Question found!", { status: 404 });
  }

  return contentHOF(request, async (accessToken) => {
    const User = requireId(accessToken);
    formData.append("User", User);
    formData.append("PQue ID", PQue);

    return fetch("https://rononbd.herokuapp.com/api/createAnswer/", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((r) => r.json());

    // return api
    //   .post(
    //     "/createAnswer/",
    //     { "PQue ID": PQue, Answer, User },
    //     {
    //       headers: { Authorization: `Bearer ${accessToken}` },
    //     }
    //   )
    //   .then((r) => r.data);
  });
}

export default function AnswerQuestionPage() {
  const actionData = useActionData();

  const [image, setImage] = useState<null | undefined | File>(
    () => actionData?.params?.img
  );

  const formRef = useRef<HTMLFormElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      mounted.current = true;
    }
  }, []);

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
    <Paper
      component={Form}
      encType="multipart/form-data"
      reloadDocument
      replace
      method="post"
      withBorder
      mt="xl"
      p="lg"
      ref={formRef}
    >
      <Textarea placeholder="Write answer..." name="Answer" variant="filled" />
      <input
        type="file"
        name="img"
        id="img"
        ref={imgRef}
        accept={IMAGE_MIME_TYPE.join(", ")}
        multiple={false}
        style={{ display: "none" }}
        defaultValue={actionData?.params?.img}
        onLoad={() => {
          setImage(actionData?.params?.img);
        }}
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
        <Button type="submit">Submit Answer</Button>
      </Group>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={preview ? "xl" : 0}
      >
        {preview}
      </SimpleGrid>
    </Paper>
  );
}
