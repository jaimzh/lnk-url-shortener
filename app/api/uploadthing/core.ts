import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  cdnAssetUploader: f({
    blob: {
      maxFileSize: "16MB",
      maxFileCount: 1,
      contentDisposition: "inline",
    },
  })
    .middleware(async ({ files }) => {
      const [file] = files;

      return {
        originalName: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        originalName: metadata.originalName,
        contentType: metadata.contentType,
        size: metadata.size,
        uploadthingKey: file.key,
        uploadthingUrl: file.ufsUrl,
        customId: file.customId,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;