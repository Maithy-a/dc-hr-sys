import {
    snakeCase,
    uuid,
    text,
    timestamp,
    varchar,
    boolean
} from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const departments = snakeCase.table("departments", {
    id:
        uuid("id")
            .defaultRandom()
            .primaryKey(),

    name:
        varchar("name", { length: 100 })
            .notNull()
            .unique(),

    description: text("description"),

    managerProfileId:
        uuid("manager_profile_id")
            .references(() => profiles.id, {onDelete: "set null"}),
            
    isActive:
        boolean("is_active")
            .notNull()
            .default(true),

    createdBy:
        uuid("created_by")
            .references(() => profiles.id),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow(),

    updatedBy:
        uuid("updated_by")
            .references(() => profiles.id),

    updatedAt:
        timestamp("updated_at")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
});
