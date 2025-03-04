import * as redis from "redis";

export const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) return new Error("Max retries reached");
            return Math.min(retries * 100, 2000);
        },
    },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

(async () => {
    await redisClient.connect();
})();

export const clearCacheByKey = async (key: string) => {
    try {
        const keys = await redisClient.keys(key);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error("Pattern clear error:", error);
    }
};
