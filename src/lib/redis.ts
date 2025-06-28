import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
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

export async function incrementCounter(username: string, amount: number): Promise<number> {
  const redis = await getRedisClient();
  const newCount = await redis.incrBy(`fml:${username}`, amount);
  return newCount;
}