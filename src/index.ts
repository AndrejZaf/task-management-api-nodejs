import dotenv from "dotenv";
import express from "express";
import tasksRoute from "./routes/tasks.route";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});

app.use("/api/v1/tasks", tasksRoute);

export default app;