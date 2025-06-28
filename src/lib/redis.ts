import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

let isConnected = false;

export async function getRedisClient() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

export async function getCounter(username: string): Promise<number> {
  const redis = await getRedisClient();
  const count = await redis.get(`fml:${username}`);
  return count ? parseInt(count, 10) : 0;
}

export async function incrementCounter(
  username: string,
  amount: number
): Promise<number> {
  const redis = await getRedisClient();
  const newCount = await redis.incrBy(`fml:${username}`, amount);

  // Log the increment
  const logEntry = {
    timestamp: new Date().toISOString(),
    amount,
    newTotal: newCount,
  };
  await redis.lPush(`fml:${username}:log`, JSON.stringify(logEntry));

  return newCount;
}

export interface LogEntry {
  timestamp: string;
  amount: number;
  newTotal: number;
}

export async function getLog(username: string): Promise<LogEntry[]> {
  const redis = await getRedisClient();
  const logs = await redis.lRange(`fml:${username}:log`, 0, 9); // Get last 10 entries
  return logs.map((log) => JSON.parse(log));
}
