import { db } from "@/adapters";
import { sql } from "drizzle-orm";


const result = await db.get(sql`select 1`);
console.log(result);