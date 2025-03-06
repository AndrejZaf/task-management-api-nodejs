import express from "express";
import { cacheMiddleware } from "../config/middleware";
import { clearCacheByKey } from "../config/redis.cache";
import { Task } from "../db/types";
import { create, deleteById, findAll, findById, updateById } from "../services/tasks.service";
import { INVALID_BODY } from "../utils/error.constants";

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await findAll();
    res.json(tasks);
});

router.get("/:id", cacheMiddleware, async (req, res) => {
    try {
        const task = await findById(req.params.id);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const createdTask = await create(req.body as Task);
        res.status(201).json(createdTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await updateById(req.params.id, req.body);
        await clearCacheByKey(req.originalUrl);
        res.status(200).json(updatedTask);
    } catch (error: any) {
        if (error.message === INVALID_BODY) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(404).json({ message: error.message });
        }
    }
});

router.delete("/:id", async (req, res) => {
    await deleteById(req.params.id);
    await clearCacheByKey(req.originalUrl);
    res.status(204).json();
});

export default router;
