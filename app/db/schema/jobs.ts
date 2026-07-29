import {
    integer,
    uuid,
    snakeCase,
    text,
    timestamp,
    varchar,
    check,
    index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { departments } from "./departments";
import { profiles } from "./profiles";
import { educationLevelsEnum, employmentTypeEnum, jobStatusEnum } from "./enums";

export const jobs = snakeCase.table("job_listings", {
    id:
        uuid("id")
            .defaultRandom()
            .primaryKey(),

    title:
        varchar("title", { length: 150 })
            .notNull(),

    departmentId:
        uuid("department_id")
            .references(() => departments.id, { onDelete: "set null" }),

    employmentType:
        employmentTypeEnum()
            .notNull()
            .default("FULL_TIME"),

    location:
        varchar("location", { length: 150 }),

    minSalary:
        integer("min_salary"),

    maxSalary:
        integer("max_salary"),

    jobDescription: text("job_description"),

    minEducationLevel:
        educationLevelsEnum()
            .notNull(),

    minExperienceYears:
        integer("min_experience_years")
            .notNull()
            .default(0),

    requiredSkills:
        text("required_skills")
            .array()
            .default([])
            .notNull(),

    requiredCertifications:
        text("required_certifications")
            .array()
            .default([])
            .notNull(),

    applicationDeadline:
        timestamp("application_deadline"),

    status:
        jobStatusEnum()
            .default("OPEN")
            .notNull(),

    createdBy:
        uuid("created_by")
            .references(() => profiles.id),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow(),
},
    (table) => [
        check("salary_check", sql`${table.minSalary} <= ${table.maxSalary} AND ${table.minSalary} >= 0 AND ${table.maxSalary} >= 0`),
        index("idx_department_id").on(table.departmentId),
        index("idx_created_by").on(table.createdBy),
        index("idx_job_status").on(table.status),
    ]
);