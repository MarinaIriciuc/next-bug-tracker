import {z} from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(3, "Firstname must have at least 3 characters").max(20, "Firstname must have at most 20 characters"),
    lastName: z.string().min(3, "Lastname must have at least 3 characters").max(20, "Lastname must have at most 20 characters"),
    username: z.string().min(10, "Username must have at least 10 characters").max(20, "Username must have at most 20 characters."),
    email: z.string().email().min(5, "Email must have at least 5 characters"),
})


export type RegisterSchema = z.infer<typeof registerSchema>;
