import { db } from "./db";
import {
  patients,
  screenings,
  medicalRecords,
  type Patient,
  type InsertPatient,
  type Screening,
  type InsertScreening,
  type MedicalRecord,
  type InsertMedicalRecord
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Patients
  getPatients(): Promise<Patient[]>;
  getPatient(id: number): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;

  // Screenings
  getScreeningsByPatient(patientId: number): Promise<Screening[]>;
  getScreening(id: number): Promise<Screening | undefined>;
  createScreening(patientId: number, screening: Omit<InsertScreening, "patientId">): Promise<Screening>;
  updateScreening(id: number, updates: Partial<InsertScreening>): Promise<Screening>;

  // Medical Records
  getRecordsByPatient(patientId: number): Promise<MedicalRecord[]>;
  createMedicalRecord(patientId: number, record: Omit<InsertMedicalRecord, "patientId">): Promise<MedicalRecord>;
}

export class MemStorage implements IStorage {
  private patients: Map<number, Patient>;
  private screenings: Map<number, Screening>;
  private medicalRecords: Map<number, MedicalRecord>;
  private patientIdCounter: number;
  private screeningIdCounter: number;
  private recordIdCounter: number;

  constructor() {
    this.patients = new Map();
    this.screenings = new Map();
    this.medicalRecords = new Map();
    this.patientIdCounter = 1;
    this.screeningIdCounter = 1;
    this.recordIdCounter = 1;
  }

  // Patients
  async getPatients(): Promise<Patient[]> {
    return Array.from(this.patients.values());
  }

  async getPatient(id: number): Promise<Patient | undefined> {
    return this.patients.get(id);
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const id = this.patientIdCounter++;
    const patient: Patient = { ...insertPatient, id, createdAt: new Date() };
    this.patients.set(id, patient);
    return patient;
  }

  // Screenings
  async getScreeningsByPatient(patientId: number): Promise<Screening[]> {
    return Array.from(this.screenings.values()).filter(
      (screening) => screening.patientId === patientId
    );
  }

  async getScreening(id: number): Promise<Screening | undefined> {
    return this.screenings.get(id);
  }

  async createScreening(
    patientId: number,
    insertScreening: Omit<InsertScreening, "patientId">
  ): Promise<Screening> {
    const id = this.screeningIdCounter++;
    const screening: Screening = {
      ...insertScreening,
      id,
      patientId,
      createdAt: new Date(),
      smoking: insertScreening.smoking || null,
      alcohol: insertScreening.alcohol || null,
      exercise: insertScreening.exercise || null,
      diet: insertScreening.diet || null,
      sleep: insertScreening.sleep || null,
      stress: insertScreening.stress || null,
      water: insertScreening.water || null,
      symptoms: insertScreening.symptoms || null,
      otherSymptoms: insertScreening.otherSymptoms || null,
      riskScore: insertScreening.riskScore || null,
      riskLevel: insertScreening.riskLevel || null,
      aiAnalysis: insertScreening.aiAnalysis || null,
    };
    this.screenings.set(id, screening);
    return screening;
  }

  async updateScreening(
    id: number,
    updates: Partial<InsertScreening>
  ): Promise<Screening> {
    const existing = this.screenings.get(id);
    if (!existing) throw new Error("Screening not found");
    const updated = { ...existing, ...updates };
    this.screenings.set(id, updated);
    return updated;
  }

  // Medical Records
  async getRecordsByPatient(patientId: number): Promise<MedicalRecord[]> {
    return Array.from(this.medicalRecords.values()).filter(
      (record) => record.patientId === patientId
    );
  }

  async createMedicalRecord(
    patientId: number,
    insertRecord: Omit<InsertMedicalRecord, "patientId">
  ): Promise<MedicalRecord> {
    const id = this.recordIdCounter++;
    const record: MedicalRecord = {
      ...insertRecord,
      id,
      patientId,
      createdAt: new Date(),
      facility: insertRecord.facility || null,
      values: insertRecord.values || null,
      notes: insertRecord.notes || null,
    };
    this.medicalRecords.set(id, record);
    return record;
  }
}

export const storage = new MemStorage();
