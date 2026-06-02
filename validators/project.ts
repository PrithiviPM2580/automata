import { z } from "zod"

export const projectFormSchema = z.object({
  name: z
    .string()
    .min(5, "Text must be at least 5 characters long")
    .max(50, "Text is too long, maximum length is 50 characters"),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
