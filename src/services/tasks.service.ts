import { eq } from "drizzle-orm";
import { db } from "../db";
import { tasks } from "../db/schema";
import { Task } from "../db/types";
import { INVALID_BODY, TASK_NOT_FOUND } from "../utils/error.constants";
import { TaskSchema } from "../validations/task.validation";

export const findAll = async () => {
    return await db.query.tasks.findMany();
};

export const findById = async (taskId: string) => {
    const task = await db.query.tasks.findFirst({ where: eq(tasks.id, taskId) });
    if (!task) {
        throw Error(TASK_NOT_FOUND);
    }

    return task;
};

export const create = async (task: Task) => {
    const validatedFields = TaskSchema.safeParse(task);
    if (!validatedFields.success) {
        throw Error(INVALID_BODY);
    }

    return db.insert(tasks).values(task).returning();
};

export const updateById = async (taskId: string, task: Task) => {
    const validatedFields = TaskSchema.safeParse(task);
    if (!validatedFields.success) {
        throw Error(INVALID_BODY);
    }

    const taskFromDb = await findById(taskId);
    taskFromDb.status = task.status;
    taskFromDb.title = task.title;
    taskFromDb.description = task.description;
    taskFromDb.updatedAt = new Date();
    return db.update(tasks).set(taskFromDb).where(eq(tasks.id, taskId)).returning();
};

export const deleteById = async (taskId: string) => {
    await db.delete(tasks).where(eq(tasks.id, taskId));
};