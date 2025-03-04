import { db } from "../db";

export const findAll = async () => {
    return await db.query.task.findMany();
}