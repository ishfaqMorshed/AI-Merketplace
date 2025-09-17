import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product table
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  tag: text("tag"), // Optional product tag
  status: text("status").notNull().default("published"), // "published" | "upcoming"
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hero section table (single row)
export const heroSection = pgTable("hero_section", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Pricing table
export const pricing = pgTable("pricing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  price: text("price").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const demoBookings = pgTable("demo_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  productInterest: text("product_interest").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  messages: jsonb("messages").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDemoBookingSchema = createInsertSchema(demoBookings).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
});

// Product schemas
export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertPricingSchema = createInsertSchema(pricing).omit({
  id: true,
  updatedAt: true,
});

export type InsertDemoBooking = z.infer<typeof insertDemoBookingSchema>;
export type DemoBooking = typeof demoBookings.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Pricing = typeof pricing.$inferSelect;
export type InsertPricing = z.infer<typeof insertPricingSchema>;
