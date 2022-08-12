import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";

export const fileUploadHandler = unstable_createFileUploadHandler({
  maxPartSize: 5_000_000,
  file: ({ filename }) => filename,
  avoidFileConflicts: true,
});

export const memoryUploadHandler = unstable_createMemoryUploadHandler({
  maxPartSize: 5_000_000,
});

export const uploadHandler = unstable_composeUploadHandlers(
  fileUploadHandler,
  // parse everything else into memory
  memoryUploadHandler
);
