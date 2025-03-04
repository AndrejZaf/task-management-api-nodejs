import { Task } from "../db/types";
import { redisClient } from "./redis.cache";


export const cacheMiddleware = async (req: any, res: any, next: any) => {
    const cacheKey = req.originalUrl;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return res.json(JSON.parse(cached));
    }

    res.sendResponse = res.json;
    res.json = (body: Task) => {
        redisClient.setEx(cacheKey, 3600, JSON.stringify(body));
        return res.sendResponse(body); // Return the Response object
    };
    next();
};
