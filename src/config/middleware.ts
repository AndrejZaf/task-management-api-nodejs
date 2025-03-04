import { Task } from "../db/types";
import { redisClient } from "./redis.cache";

export const cacheMiddleware = async (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        console.log("cached");
        return res.json(JSON.parse(cached));
    }

    res.sendResponse = res.json;
    res.json = (body: Task) => {
        redisClient.setEx(cacheKey, 3600, JSON.stringify(body));
        res.sendResponse(body);
    };
    next();
};
