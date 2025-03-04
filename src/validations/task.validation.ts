import { z } from "zod";

const TASK_STATUS = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;

export const TaskSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    status: z.enum(TASK_STATUS)
});