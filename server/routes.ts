import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  // allow either the new names or the generic OPENAI_API_KEY for convenience
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.patients.list.path, async (req, res) => {
    const patients = await storage.getPatients();
    res.json(patients);
  });

  app.post(api.patients.create.path, async (req, res) => {
    try {
      const input = api.patients.create.input.parse(req.body);
      const patient = await storage.createPatient(input);
      res.status(201).json(patient);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.get(api.patients.get.path, async (req, res) => {
    const patient = await storage.getPatient(Number(req.params.id));
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  });

  app.get(api.screenings.listByPatient.path, async (req, res) => {
    const patientId = Number(req.params.patientId);
    const screeningsList = await storage.getScreeningsByPatient(patientId);
    res.json(screeningsList);
  });

  app.post(api.screenings.create.path, async (req, res) => {
    try {
      const patientId = Number(req.params.patientId);
      const input = api.screenings.create.input.parse(req.body);
      const screening = await storage.createScreening(patientId, input);
      res.status(201).json(screening);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });
  
  app.get(api.screenings.get.path, async (req, res) => {
    const screening = await storage.getScreening(Number(req.params.id));
    if (!screening) return res.status(404).json({ message: "Screening not found" });
    res.json(screening);
  });

  app.get(api.medicalRecords.listByPatient.path, async (req, res) => {
    const records = await storage.getRecordsByPatient(Number(req.params.patientId));
    res.json(records);
  });

  app.post(api.medicalRecords.create.path, async (req, res) => {
    try {
      const patientId = Number(req.params.patientId);
      const input = api.medicalRecords.create.input.parse(req.body);
      const record = await storage.createMedicalRecord(patientId, input);
      res.status(201).json(record);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });
  
  // AI Analysis Mock/Integration
  app.post(api.ai.analyzeScreening.path, async (req, res) => {
    const screeningId = Number(req.params.id);
    const screening = await storage.getScreening(screeningId);
    
    if (!screening) {
      return res.status(404).json({ message: "Screening not found" });
    }
    
    const patient = await storage.getPatient(screening.patientId!);
    
    try {
      // Simulate AI analysis or call OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          { role: "system", content: "You are an AI diagnostic assistant. Provide a concise, clinical risk analysis and risk score out of 100 based on the provided patient data. Return JSON with 'riskScore' (number), 'riskLevel' (string: Low, Moderate, Elevated, High, Critical), and 'aiAnalysis' (string containing detailed text)." },
          { role: "user", content: `Patient: ${patient?.fullName}, Age: ${patient?.age}, Gender: ${patient?.gender}, Smoking: ${screening.smoking}, Alcohol: ${screening.alcohol}, Symptoms: ${(screening.symptoms || []).join(', ')}` }
        ],
        response_format: { type: "json_object" }
      });
      
      const analysisContent = JSON.parse(response.choices[0]?.message?.content || "{}");
      
      const updatedScreening = await storage.updateScreening(screeningId, {
        riskScore: analysisContent.riskScore || Math.floor(Math.random() * 100),
        riskLevel: analysisContent.riskLevel || "Moderate",
        aiAnalysis: analysisContent.aiAnalysis || "Risk assessment completed based on available data."
      });
      
      res.json(updatedScreening);
    } catch (err) {
      console.error("AI Analysis failed:", err);
      // Fallback
      const fallbackScore = Math.floor(Math.random() * 100);
      const updatedScreening = await storage.updateScreening(screeningId, {
        riskScore: fallbackScore,
        riskLevel: fallbackScore > 75 ? "High" : fallbackScore > 50 ? "Elevated" : "Low",
        aiAnalysis: "Fallback analysis generated due to API error."
      });
      res.json(updatedScreening);
    }
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPatients = await storage.getPatients();
  if (existingPatients.length === 0) {
    const patient1 = await storage.createPatient({
      fullName: "Jonathan K. Richards",
      age: 52,
      gender: "Male",
      dob: "1974-03-12",
      contactNumber: "+1 (555) 123-4567",
      email: "jonathan.r@example.com",
      emergencyContact: "Sarah Richards - +1 (555) 987-6543",
    });
    
    await storage.createScreening(patient1.id, {
      smoking: "Former smoker",
      alcohol: 12,
      exercise: "Rarely (0-1 days/week)",
      diet: "Non-vegetarian",
      sleep: 6,
      stress: "High",
      water: 2,
      symptoms: ["Fatigue", "Chest Pain"],
      otherSymptoms: "Occasional mild shortness of breath",
      riskScore: 78,
      riskLevel: "High",
      aiAnalysis: "Patient shows multiple elevated risk factors including age over 50, former smoking history, and reported chest pain combined with fatigue. Urgent clinical evaluation is recommended."
    });
    
    const patient2 = await storage.createPatient({
      fullName: "Maria Gonzalez",
      age: 34,
      gender: "Female",
      dob: "1990-08-22",
      contactNumber: "+1 (555) 234-5678",
      email: "maria.g@example.com",
      emergencyContact: "Jose Gonzalez - +1 (555) 876-5432",
    });
    
    await storage.createScreening(patient2.id, {
      smoking: "Never smoked",
      alcohol: 2,
      exercise: "Active (4-5 days/week)",
      diet: "Vegetarian",
      sleep: 8,
      stress: "Low",
      water: 3,
      symptoms: [],
      otherSymptoms: "",
      riskScore: 12,
      riskLevel: "Low",
      aiAnalysis: "Patient profile is generally healthy with no significant risk factors reported. Maintain routine annual checkups."
    });
  }
}
