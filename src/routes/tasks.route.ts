import express from "express";
import { Task } from "../db/types";
import { create, deleteById, findAll, findById, updateById } from "../services/tasks.service";

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await findAll();
    res.json(tasks);
});

router.get("/:id", async (req, res) => {
    const task = await findById(req.params.id);
    if (!task) {
        res.status(404).json({});
    } else {
        res.status(200).json(task);
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
        const updatedTask = await updateById(req.params.id, req.body as Task);
        res.status(200).json(updatedTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    await deleteById(req.params.id);
    res.status(204).json();
});

export default router;