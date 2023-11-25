import {z} from "zod";

export const bugSchema = z.object({
  title: z.string().min(5, "Title must have at least 10 characters").max(20, "Title must have at most 10 characters."),
  description: z.string().min(10, "The description must have at least 10 characters").max(50, "The description must have at most 50 characters."),
  deadline: z.string().min(10, "You must add a deadline.")
})

export type BugSchema = z.infer<typeof bugSchema>;
