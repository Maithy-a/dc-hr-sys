import {
    snakeCase,
    check,
    numeric,
    text,
    timestamp,
    uuid,
    varchar,
    index
} from "drizzle-orm/pg-core";
import { employees } from "./employees";
import { profiles } from "./profiles";
import { sql } from "drizzle-orm/sql";

export const appraisals = snakeCase.table("appraisals", {
    id:
        uuid("id")
            .defaultRandom()
            .primaryKey(),

    employeeId:
        uuid("employee_id")
            .notNull()
            .references(() => employees.id, { onDelete: 'cascade' }),

    appraisalPeriod:
        varchar("appraisal_period", { length: 20 })
            .notNull(),

    attendancePct:
        numeric("attendance_pct", { precision: 5, scale: 2 })
            .notNull(),

    taskCompletionPct:
        numeric("task_completion_pct", { precision: 5, scale: 2 })
            .notNull(),

    qualityScore:
        numeric("quality_score", { precision: 5, scale: 2 })
            .notNull(),

    teamworkScore:
        numeric("teamwork_score", { precision: 5, scale: 2 })
            .notNull(),

    communicationScore:
        numeric("communication_score", { precision: 5, scale: 2 })
            .notNull(),

    disciplineScore:
        numeric("discipline_score", { precision: 5, scale: 2 })
            .notNull(),

    initiativeScore:
        numeric("initiative_score", { precision: 5, scale: 2 })
            .notNull(),


    selfAppraisalNotes:
        text("self_appraisal_notes"),
    supervisorRemarks:
        text("supervisor_remarks"),

    overallScore:
        numeric("overall_score", { precision: 5, scale: 2 }),

    reviewedBy:
        uuid("reviewed_by")
            .references(() => profiles.id),

    recommendation: text(),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow(),

    updatedAt:
        timestamp("updated_at")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
},
    (table) => [
        check("attendance_pct_check", sql`${table.attendancePct} >= 0 AND ${table.attendancePct} <= 100`),
        check("task_completion_pct_check", sql`${table.taskCompletionPct} >= 0 AND ${table.taskCompletionPct} <= 100`),
        check("quality_score_check", sql`${table.qualityScore} >= 0 AND ${table.qualityScore} <= 100`),
        check("teamwork_score_check", sql`${table.teamworkScore} >= 0 AND ${table.teamworkScore} <= 100`),
        check("communication_score_check", sql`${table.communicationScore} >= 0 AND ${table.communicationScore} <= 100`),
        check("discipline_score_check", sql`${table.disciplineScore} >= 0 AND ${table.disciplineScore} <= 100`),
        check("initiative_score_check", sql`${table.initiativeScore} >= 0 AND ${table.initiativeScore} <= 100`),

        index("idx_appraisals_employee").on(table.employeeId),
    ]
)
