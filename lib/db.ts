// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";


// if (!process.env.DATABASE_URL) {
//     throw new Error('DATABASE_URL must be a Neon postgres connection string');
// }

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({
//     client: sql,
// });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined.");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({
    client: pool,
});