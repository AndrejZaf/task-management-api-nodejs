import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const taskStatus = pgEnum("task_status", ["PENDING", "IN_PROGRESS", "COMPLETED"]);

export const task = pgTable("task", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title")
        .notNull(),
    description: text("description")
        .notNull(),
    status: taskStatus("task_status")
        .notNull(),
    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});