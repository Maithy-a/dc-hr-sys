CREATE TYPE "application_status" AS ENUM('PENDING', 'SHORTLISTED', 'REJECTED', 'HIRED');
--> statement-breakpoint
CREATE TYPE "education_levels" AS ENUM('CERTIFICATE', 'DIPLOMA', 'BACHELORS', 'MASTERS', 'PHD');
--> statement-breakpoint
CREATE TYPE "employee_status" AS ENUM('ACTIVE', 'ON_LEAVE', 'TERMINATED');
--> statement-breakpoint
CREATE TYPE "employment_type" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN');
--> statement-breakpoint
CREATE TYPE "genders" AS ENUM('MALE', 'FEMALE', 'OTHER');
--> statement-breakpoint
CREATE TYPE "job_status" AS ENUM('OPEN', 'CLOSED');
--> statement-breakpoint
CREATE TYPE "notification_type" AS ENUM('INFO', 'WARNING', 'ALERT', 'ERROR', 'INTERVIEW', 'APPRAISAL', 'PROMOTION');
--> statement-breakpoint
CREATE TYPE "roles" AS ENUM('HR', 'SUPERVISOR', 'EMPLOYEE');
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"job_listing_id" uuid NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"cover_letter" text,
	"file_url" text NOT NULL,
	"object_key" text UNIQUE,
	"cv_text" text,
	"education_level" "education_levels" NOT NULL,
	"years_experience" integer DEFAULT 0,
	"skills" text[] DEFAULT '{}'::text[] NOT NULL,
	"certifications" text[] DEFAULT '{}'::text[] NOT NULL,
	"date_of_birth" date,
	"graduation_year" integer,
	"vetting_score" numeric(5,2),
	"score_breakdown" jsonb,
	"status" "application_status" DEFAULT 'PENDING'::"application_status" NOT NULL,
	"flagged" boolean DEFAULT false NOT NULL,
	"flag_reason" text,
	"reviewed_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appraisals" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    "employee_id" uuid NOT NULL,
    "appraisal_period" varchar(20) NOT NULL,
    "attendance_pct" numeric(5, 2) NOT NULL,
    "task_completion_pct" numeric(5, 2) NOT NULL,
    "quality_score" numeric(5, 2) NOT NULL,
    "teamwork_score" numeric(5, 2) NOT NULL,
    "communication_score" numeric(5, 2) NOT NULL,
    "discipline_score" numeric(5, 2) NOT NULL,
    "initiative_score" numeric(5, 2) NOT NULL,
    "self_appraisal_notes" text,
    "supervisor_remarks" text,
    "overall_score" numeric(5, 2),
    "reviewed_by" uuid,
    "recommendation" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "attendance_pct_check" CHECK (
        "attendance_pct" >= 0
        AND "attendance_pct" <= 100
    ),
    CONSTRAINT "task_completion_pct_check" CHECK (
        "task_completion_pct" >= 0
        AND "task_completion_pct" <= 100
    ),
    CONSTRAINT "quality_score_check" CHECK (
        "quality_score" >= 0
        AND "quality_score" <= 100
    ),
    CONSTRAINT "teamwork_score_check" CHECK (
        "teamwork_score" >= 0
        AND "teamwork_score" <= 100
    ),
    CONSTRAINT "communication_score_check" CHECK (
        "communication_score" >= 0
        AND "communication_score" <= 100
    ),
    CONSTRAINT "discipline_score_check" CHECK (
        "discipline_score" >= 0
        AND "discipline_score" <= 100
    ),
    CONSTRAINT "initiative_score_check" CHECK (
        "initiative_score" >= 0
        AND "initiative_score" <= 100
    )
);
--> statement-breakpoint
CREATE TABLE "departments" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    "name" varchar(100) NOT NULL UNIQUE,
    "description" text,
    "manager_profile_id" uuid,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_by" uuid,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_by" uuid,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"profile_id" uuid NOT NULL UNIQUE,
	"employee_no" varchar(30) NOT NULL UNIQUE,
	"manager_id" uuid,
	"department_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"hire_date" date DEFAULT now() NOT NULL,
	"employment_type" "employment_type" DEFAULT 'FULL_TIME'::"employment_type" NOT NULL,
	"employment_status" "employee_status" DEFAULT 'ACTIVE'::"employee_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(150) NOT NULL,
	"department_id" uuid,
	"employment_type" "employment_type" DEFAULT 'FULL_TIME'::"employment_type" NOT NULL,
	"location" varchar(150),
	"min_salary" integer,
	"max_salary" integer,
	"job_description" text,
	"min_education_level" "education_levels" NOT NULL,
	"min_experience_years" integer DEFAULT 0 NOT NULL,
	"required_skills" text[] DEFAULT '{}'::text[] NOT NULL,
	"required_certifications" text[] DEFAULT '{}'::text[] NOT NULL,
	"application_deadline" timestamp,
	"status" "job_status" DEFAULT 'OPEN'::"job_status" NOT NULL,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "salary_check" CHECK ("min_salary" <= "max_salary" AND "min_salary" >= 0 AND "max_salary" >= 0)
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"profile_id" uuid,
	"message" text NOT NULL,
	"type" "notification_type" DEFAULT 'INFO'::"notification_type" NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY,
	"email" varchar(255) NOT NULL UNIQUE,
	"full_name" varchar(255) NOT NULL,
	"role" "roles" DEFAULT 'EMPLOYEE'::"roles" NOT NULL,
	"gender" "genders",
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promo_recommendations" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    "employee_id" uuid,
    "appraisal_id" uuid UNIQUE,
    "recommended" boolean DEFAULT false NOT NULL,
    "reason" text NOT NULL,
    "approved_by" uuid,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_applications_job" ON "applications" ("job_listing_id");
--> statement-breakpoint
CREATE INDEX "idx_applications_score" ON "applications" (
    "vetting_score" DESC NULLS LAST
);
--> statement-breakpoint
CREATE INDEX "idx_applications_status" ON "applications" ("status");
--> statement-breakpoint
CREATE INDEX "idx_appraisals_employee" ON "appraisals" ("employee_id");
--> statement-breakpoint
CREATE INDEX "idx_employee_department" ON "employees" ("department_id");
--> statement-breakpoint
CREATE INDEX "idx_employee_job" ON "employees" ("job_id");
--> statement-breakpoint
CREATE INDEX "idx_employees_manager" ON "employees" ("manager_id");
--> statement-breakpoint
CREATE INDEX "idx_employees_status" ON "employees" ("employment_status");
--> statement-breakpoint
CREATE INDEX "idx_department_id" ON "job_listings" ("department_id");
--> statement-breakpoint
CREATE INDEX "idx_created_by" ON "job_listings" ("created_by");
--> statement-breakpoint
CREATE INDEX "idx_job_status" ON "job_listings" ("status");
--> statement-breakpoint
CREATE INDEX "idx_notifications_profile" ON "notifications" ("profile_id", "is_read");
--> statement-breakpoint
ALTER TABLE "applications"
ADD CONSTRAINT "applications_job_listing_id_job_listings_id_fkey" FOREIGN KEY ("job_listing_id") REFERENCES "job_listings" ("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "applications"
ADD CONSTRAINT "applications_reviewed_by_profiles_id_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "profiles" ("id");
--> statement-breakpoint
ALTER TABLE "appraisals"
ADD CONSTRAINT "appraisals_employee_id_employees_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "appraisals"
ADD CONSTRAINT "appraisals_reviewed_by_profiles_id_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "profiles" ("id");
--> statement-breakpoint
ALTER TABLE "departments"
ADD CONSTRAINT "departments_manager_profile_id_profiles_id_fkey" FOREIGN KEY ("manager_profile_id") REFERENCES "profiles" ("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "departments"
ADD CONSTRAINT "departments_created_by_profiles_id_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles" ("id");
--> statement-breakpoint
ALTER TABLE "departments"
ADD CONSTRAINT "departments_updated_by_profiles_id_fkey" FOREIGN KEY ("updated_by") REFERENCES "profiles" ("id");
--> statement-breakpoint
ALTER TABLE "employees"
ADD CONSTRAINT "employees_profile_id_profiles_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "employees"
ADD CONSTRAINT "employees_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE RESTRICT;
--> statement-breakpoint
ALTER TABLE "employees"
ADD CONSTRAINT "employees_job_id_job_listings_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_listings" ("id") ON DELETE RESTRICT;
--> statement-breakpoint
ALTER TABLE "employees"
ADD CONSTRAINT "fk_department_manager" FOREIGN KEY ("manager_id") REFERENCES "employees" ("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "job_listings"
ADD CONSTRAINT "job_listings_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "job_listings"
ADD CONSTRAINT "job_listings_created_by_profiles_id_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles" ("id");
--> statement-breakpoint
ALTER TABLE "notifications"
ADD CONSTRAINT "notifications_profile_id_profiles_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "promo_recommendations"
ADD CONSTRAINT "promo_recommendations_employee_id_employees_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "promo_recommendations"
ADD CONSTRAINT "promo_recommendations_appraisal_id_appraisals_id_fkey" FOREIGN KEY ("appraisal_id") REFERENCES "appraisals" ("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "promo_recommendations"
ADD CONSTRAINT "promo_recommendations_approved_by_employees_id_fkey" FOREIGN KEY ("approved_by") REFERENCES "employees" ("id") ON DELETE SET NULL;