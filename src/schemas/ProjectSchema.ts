import {z} from "zod";

export const projectSchema = z.object({
    name: z.string().min(3,"The title must have at least 3 characters").max(30, "The title must have at most 30 characters"),
    description: z.string().min(10, "The description must have at least 10 characters").max(50, "The description must have at most 50 characters")
})

export type ProjectSchema = z.infer<typeof projectSchema>;
