import { Redis } from "@upstash/redis";

// Set by Vercel automatically once an Upstash Redis integration is
// connected to the project. Returns null locally / before that's set up,
// so visit tracking just no-ops instead of throwing.
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;
