import { eq } from "drizzle-orm";
import { db } from "../db";
import { tasks } from "../db/schema";
import { Task } from "../db/types";
import { TaskSchema } from "../validations/task.validation";

export const findAll = async () => {
    return await db.query.tasks.findMany();
};

export const findById = async (taskId: string) => {
    return await db.query.tasks.findFirst({ where: eq(tasks.id, taskId) });
};

export const create = async (task: Task) => {
    const validatedFields = TaskSchema.safeParse(task);
    if (!validatedFields) {
        throw Error("Bad request");
    }

    return db.insert(tasks).values(task).returning();
};

export const updateById = async (taskId: string, task: Task) => {
    return db.update(tasks).set(task).where(eq(tasks.id, taskId));
};

export const deleteById = async (taskId: string) => {
    await db.delete(tasks).where(eq(tasks.id, taskId));
};