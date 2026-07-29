import {
    snakeCase,
    date,
    foreignKey,
    index,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

import { profiles } from "./profiles";
import { departments } from "./departments";
import { jobs } from "./jobs";
import { employmentTypeEnum, employeeStatusEnum } from "./enums";


export const employees = snakeCase.table("employees", {
    id:
        uuid("id")
            .defaultRandom()
            .primaryKey(),

    employeeId:
        uuid("profile_id")
            .notNull()
            .unique()
            .references(() => profiles.id, { onDelete: "cascade" }),

    employeeNo:
        varchar("employee_no", { length: 30 })
            .notNull()
            .unique(),

    managerId:
        uuid("manager_id"),

    departmentId:
        uuid("department_id")
            .notNull()
            .references(() => departments.id, { onDelete: "restrict" }),

    jobId:
        uuid("job_id")
            .notNull()
            .references(() => jobs.id, { onDelete: "restrict" }),

    hireDate:
        date("hire_date")
            .notNull()
            .defaultNow(),

    employmentType:
        employmentTypeEnum()
            .notNull()
            .default("FULL_TIME"),

    employmentStatus:
        employeeStatusEnum()
            .notNull()
            .default("ACTIVE"),

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
        foreignKey({
            columns: [table.managerId],
            foreignColumns: [table.id],
            name: "fk_department_manager",
        }).onDelete("set null"),

        index("idx_employee_department").on(table.departmentId),
        index("idx_employee_job").on(table.jobId),
        index("idx_employees_manager").on(table.managerId),
        index("idx_employees_status").on(table.employmentStatus),
    ]
);