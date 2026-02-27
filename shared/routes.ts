import { z } from "zod";
import { insertPatientSchema, patients, insertScreeningSchema, screenings, insertMedicalRecordSchema, medicalRecords } from "./schema";

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  patients: {
    list: {
      method: "GET" as const,
      path: "/api/patients" as const,
      responses: {
        200: z.array(z.custom<typeof patients.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/patients" as const,
      input: insertPatientSchema,
      responses: {
        201: z.custom<typeof patients.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/patients/:id" as const,
      responses: {
        200: z.custom<typeof patients.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  screenings: {
    listByPatient: {
      method: "GET" as const,
      path: "/api/patients/:patientId/screenings" as const,
      responses: {
        200: z.array(z.custom<typeof screenings.$inferSelect>()),
      }
    },
    create: {
      method: "POST" as const,
      path: "/api/patients/:patientId/screenings" as const,
      input: insertScreeningSchema.omit({ patientId: true }),
      responses: {
        201: z.custom<typeof screenings.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    get: {
      method: "GET" as const,
      path: "/api/screenings/:id" as const,
      responses: {
        200: z.custom<typeof screenings.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    }
  },
  medicalRecords: {
    listByPatient: {
      method: "GET" as const,
      path: "/api/patients/:patientId/records" as const,
      responses: {
        200: z.array(z.custom<typeof medicalRecords.$inferSelect>()),
      }
    },
    create: {
      method: "POST" as const,
      path: "/api/patients/:patientId/records" as const,
      input: insertMedicalRecordSchema.omit({ patientId: true }),
      responses: {
        201: z.custom<typeof medicalRecords.$inferSelect>(),
        400: errorSchemas.validation,
      }
    }
  },
  ai: {
    analyzeScreening: {
      method: "POST" as const,
      path: "/api/screenings/:id/analyze" as const,
      responses: {
        200: z.custom<typeof screenings.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
