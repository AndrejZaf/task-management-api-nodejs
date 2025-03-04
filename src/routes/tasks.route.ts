import express from "express";
import { findAll } from "../services/tasks.service";

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await findAll();
    res.json(tasks);
});

router.post("/", (req, res) => {
    res.send("Create task");
});

router.put("/:id", (req, res) => {
    res.send("Create task");
});

router.delete("/:id", (req, res) => {
    res.send("Create task");
});

export default router;