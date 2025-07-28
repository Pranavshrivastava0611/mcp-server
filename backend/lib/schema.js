// agents.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const agents = pgTable('agents', {

   username: varchar('username', { length: 50 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(), // store bcrypt-hashed password
  phone: varchar('phone', { length: 20 }).notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
