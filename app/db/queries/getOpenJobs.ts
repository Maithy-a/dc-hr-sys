import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { jobs } from "../schema/jobs"

export async function getOpenJobs() {
    return db
        .select()
        .from(jobs)
        .where(eq(jobs.status, "OPEN"))
}