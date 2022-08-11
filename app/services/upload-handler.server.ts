import { unstable_createMemoryUploadHandler } from "@remix-run/node";

export const uploadHandler = unstable_createMemoryUploadHandler({
  maxPartSize: 500_000,
});
