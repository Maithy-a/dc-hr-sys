import {
    snakeCase,
    boolean,
    date,
    integer,
    jsonb,
    numeric,
    text,
    timestamp,
    uuid,
    varchar,
    index
} from "drizzle-orm/pg-core";

import { jobs } from "./jobs";
import { profiles } from "./profiles";
import { educationLevelsEnum, applicationStatusEnum } from "./enums";


export const applications = snakeCase.table("applications", {
    id:
        uuid("id")
            .defaultRandom()
            .primaryKey(),

    jobListingId:
        uuid('job_listing_id')
            .notNull()
            .references(() => jobs.id, { onDelete: 'cascade' }),

    fullName:
        varchar("full_name", { length: 255 })
            .notNull(),

    email:
        varchar("email", { length: 255 })
            .notNull(),

    phone:
        varchar("phone", { length: 30 }),

    coverLetter:
        text("cover_letter"),

    fileUrl:
        text("file_url")
            .notNull(),

    objectKey:
        text("object_key")
            .unique(),

    cvText:
        text("cv_text"),

    educationLevel:
        educationLevelsEnum()
            .notNull(),

    yearsExperience:
        integer("years_experience")
            .default(0),

    skills:
        text('skills')
            .array()
            .default([])
            .notNull(),

    certifications:
        text('certifications')
            .array()
            .default([])
            .notNull(),

    dateOfBirth:
        date("date_of_birth"),

    graduationYear:
        integer("graduation_year"),

    vettingScore:
        numeric("vetting_score", { precision: 5, scale: 2, }),

    scoreBreakdown:
        jsonb("score_breakdown"),

    status:
        applicationStatusEnum()
            .notNull()
            .default("PENDING"),

    flagged:
        boolean("flagged")
            .notNull()
            .default(false),

    flagReason:
        text("flag_reason"),

    reviewedBy:
        uuid("reviewed_by")
            .references(() => profiles.id),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow(),

    updatedAt:
        timestamp("updated_at")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),

}, (table) => [
    index("idx_applications_job").on(table.jobListingId),
    index("idx_applications_score").on(table.vettingScore.desc()),
    index("idx_applications_status").on(table.status),
]);

