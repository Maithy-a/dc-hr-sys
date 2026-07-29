import { pgEnum } from "drizzle-orm/pg-core";

export const employeeStatusEnum = pgEnum("employee_status", [
    "ACTIVE",
    "ON_LEAVE",
    "TERMINATED",
]);

export const employmentTypeEnum = pgEnum("employment_type", [
    "FULL_TIME",
    "PART_TIME",
    "CONTRACTOR",
    "INTERN",
]);

export const applicationStatusEnum = pgEnum("application_status", [
    "PENDING",
    "SHORTLISTED",
    "REJECTED",
    "HIRED"
]);

export const educationLevelsEnum = pgEnum("education_levels", [
    "CERTIFICATE",
    "DIPLOMA",
    "BACHELORS",
    "MASTERS",
    "PHD"
]);

export const jobStatusEnum = pgEnum("job_status", [
    "OPEN",
    "CLOSED"
]);

export const rolesEnum = pgEnum("roles", [
    "HR",
    "SUPERVISOR",
    "EMPLOYEE"
]);

export const gendersEnum = pgEnum("genders", [
    "MALE",
    "FEMALE",
    "OTHER"
]);

export const notificationTypeEnum = pgEnum("notification_type", [
    "INFO",
    "WARNING",
    "ALERT",
    "ERROR",
    "INTERVIEW",
    "APPRAISAL",
    "PROMOTION"
]);