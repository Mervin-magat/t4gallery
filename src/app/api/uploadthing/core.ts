import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { image } from "~/server/db/schema"; // Import the image table definition
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define a FileRoute with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For a full list of options and defaults, see the File Route API reference:
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Middleware to set permissions and file types
    .middleware(async ({ req }) => {
      const user = await auth();

      if (!user?.userId) {
        throw new UploadThingError("Unauthorized");
      }

      // Return metadata accessible in `onUploadComplete`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // Log the upload completion
        console.log("Upload complete for userId:", metadata.userId);

        // Insert file information into the database
        await db.insert(image).values({
          name: file.name,
          url: file.url,
          userId: metadata.userId,
        });

        console.log("File URL:", file.url);

        // Return metadata for the clientside `onClientUploadComplete` callbacksk
        return { uploadedBy: metadata.userId };
      } catch (error) {
        console.error("Error saving file to database:", error);
        throw new UploadThingError("Database error");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
