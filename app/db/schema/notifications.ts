import {
    boolean,
    uuid,
    snakeCase,
    text,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { notificationTypeEnum } from "./enums";


export const notifications = snakeCase.table("notifications", {
    id:
        uuid("id")
            .primaryKey()
            .defaultRandom(),

    profileId:
        uuid("profile_id")
            .references(() => profiles.id, { onDelete: "cascade" }),

    message:
        text("message")
            .notNull(),

    type:
        notificationTypeEnum("type")
            .notNull()
            .default("INFO"),

    isRead:
        boolean("is_read")
            .notNull()
            .default(false),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow()
}, (table) => [
    index("idx_notifications_profile").on(table.profileId, table.isRead)
])