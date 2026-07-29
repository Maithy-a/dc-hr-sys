import { snakeCase, uuid, boolean, timestamp, text } from "drizzle-orm/pg-core";
import { employees } from "./employees";
import { appraisals } from "./appraisals";

export const promoRecommendations = snakeCase.table("promo_recommendations", {
    id:
        uuid("id")
            .defaultRandom()
            .primaryKey(),

    employeeId:
        uuid("employee_id")
            .references(() => employees.id, { onDelete: 'cascade' }),

    appraisalId:
        uuid("appraisal_id")
            .references(() => appraisals.id, { onDelete: 'cascade' })
            .unique(),

    recommended:
        boolean("recommended")
            .default(false)
            .notNull(),

    reason:
        text("reason")
            .notNull(),

    approved_by:
        uuid("approved_by")
            .references(() => employees.id, { onDelete: 'set null' }),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow(),
})