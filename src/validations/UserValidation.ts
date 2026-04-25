import * as z from "zod"

export const UserValidation = z.object({
    username: z.string().min(3,"Username must be atleast 3 characters long"),
    password: z.string().min(6,"Password must be atleast 6 characters long"),
})

export type User = z.infer<typeof UserValidation>