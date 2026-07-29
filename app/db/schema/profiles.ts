
import {
    snakeCase,
    uuid,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { gendersEnum, rolesEnum } from "./enums";

export const profiles = snakeCase.table("profiles", {
    id:
        uuid("id")
            .primaryKey(),

    email:
        varchar("email", { length: 255 })
            .notNull()
            .unique(),

    fullName:
        varchar("full_name", { length: 255 })
            .notNull(),

    role:
        rolesEnum()
            .notNull()
            .default("EMPLOYEE"),

    gender:
        gendersEnum(),

    passwordHash:
        varchar("password_hash", { length: 255 })
            .notNull(),

    createdAt:
        timestamp("created_at")
            .notNull()
            .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
})
