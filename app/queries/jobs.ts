import { db } from "@/lib/db";
import { jobs } from "../db/schema/jobs";
import { desc, eq } from "drizzle-orm";

export async function getOpenJobs() {
    return db
        .select()
        .from(jobs)
        .where(eq(jobs.status, "OPEN"))
        .orderBy(desc(jobs.createdAt));
}

