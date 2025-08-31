import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { z } from "zod";
import { posts } from "./src/db/schema/post";

export const schema = {
  posts: posts,
};

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
});

const env = EnvSchema.parse(process.env);

export const db = drizzle({ client: createClient({ url: env.DATABASE_URL }), schema: schema });