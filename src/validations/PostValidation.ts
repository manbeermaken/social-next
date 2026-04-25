import * as z from "zod"

export const PostValidation = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Post title is required"
          : "Invalid title type",
    })
    .min(1, { error: "Post title cannot be empty" })
    .trim()
    .max(100, { error: "Title cannot exceed 100 characters" }),

  content: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Post content is required"
          : "Invalid content type",
    })
    .min(1, { error: "Post content cannot be empty" })
});

export type Post = z.infer<typeof PostValidation>