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
    if (!validatedFields.success) {
        throw Error("Invalid body");
    }

    return db.insert(tasks).values(task).returning();
};

export const updateById = async (taskId: string, task: Task) => {
    const validatedFields = TaskSchema.safeParse(task);
    if (!validatedFields.success) {
        throw Error("Invalid body");
    }

    const taskById = await findById(taskId);
    if (!taskById) {
        throw Error("Invalid task ID");
    }

    return db.update(tasks).set(task).where(eq(tasks.id, taskId)).returning();
};

export const deleteById = async (taskId: string) => {
    await db.delete(tasks).where(eq(tasks.id, taskId));
};