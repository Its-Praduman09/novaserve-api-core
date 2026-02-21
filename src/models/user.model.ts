import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  pgEnum,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { isNull } from "drizzle-orm";

// 1. Enums: Ensuring data quality for Gender and Roles
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const roleEnum = pgEnum("user_role", ["admin", "mechanic", "customer"]);

// 2. Users Table Definition
export const users = pgTable(
  "users",
  {
    // Primary Key: UUID is more secure for modern APIs
    id: uuid("id").primaryKey().defaultRandom(),

    // Core Identity
    full_name: varchar("full_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(), // Uniqueness handled by Index below
    phone: varchar("phone", { length: 20 }).notNull(), // Uniqueness handled by Index below
    password: text("password").notNull(),

    // Status & Permissions
    role: roleEnum("role").default("customer").notNull(),
    gender: genderEnum("gender"),
    isActive: boolean("is_active").default(true).notNull(),

    // Location
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 100 }).default("India"),

    // Audit Timestamps (The "Golden Trio")
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at"), // Target for Soft Deletes
  },
  (table) => {
    return {
      // PARTIAL UNIQUE INDEX:
      // This is the "Magic" that allows unique logins while supporting soft deletes.
      // It ensures the email is unique ONLY among users who are not deleted.
      emailUnique: uniqueIndex("email_unique_idx")
        .on(table.email)
        .where(isNull(table.deletedAt)),

      phoneUnique: uniqueIndex("phone_unique_idx")
        .on(table.phone)
        .where(isNull(table.deletedAt)),
    };
  },
);
