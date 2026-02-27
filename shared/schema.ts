import { sql } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  dob: text("dob").notNull(),
  contactNumber: text("contact_number").notNull(),
  email: text("email").notNull(),
  emergencyContact: text("emergency_contact").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const screenings = pgTable("screenings", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  
  // Lifestyle
  smoking: text("smoking"),
  alcohol: integer("alcohol"), // drinks per week
  exercise: text("exercise"),
  diet: text("diet"),
  sleep: integer("sleep"),
  stress: text("stress"),
  water: integer("water"),
  
  // Symptoms
  symptoms: jsonb("symptoms").$type<string[]>(),
  otherSymptoms: text("other_symptoms"),
  
  // AI Analysis Results
  riskScore: integer("risk_score"),
  riskLevel: text("risk_level"),
  aiAnalysis: text("ai_analysis"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const medicalRecords = pgTable("medical_records", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  recordType: text("record_type").notNull(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  facility: text("facility"),
  values: text("values"),
  notes: text("notes"),
  priority: text("priority").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPatientSchema = createInsertSchema(patients).omit({ id: true, createdAt: true });
export const insertScreeningSchema = createInsertSchema(screenings).omit({ id: true, createdAt: true });
export const insertMedicalRecordSchema = createInsertSchema(medicalRecords).omit({ id: true, createdAt: true });

export type Patient = typeof patients.$inferSelect;
export type InsertPatient = z.infer<typeof insertPatientSchema>;

export type Screening = typeof screenings.$inferSelect;
export type InsertScreening = z.infer<typeof insertScreeningSchema>;

export type MedicalRecord = typeof medicalRecords.$inferSelect;
export type InsertMedicalRecord = z.infer<typeof insertMedicalRecordSchema>;
