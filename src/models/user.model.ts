import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

// Defining an Enum for Gender is more professional than just 'text'
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
// Define roles for your workshop system
export const roleEnum = pgEnum("user_role", ["admin", "mechanic", "customer"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  full_name: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
  password: text("password").notNull(), // Remember to hash this before saving!
  role: roleEnum("role").default("customer").notNull(),
  gender: genderEnum("gender"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }).default("India"),
  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"), // For Soft Deletes
});
