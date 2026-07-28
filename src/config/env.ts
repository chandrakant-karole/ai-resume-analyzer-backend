import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(5000),

  MONGO_URI: z.string().min(1, "MONGO_URI is required"),

  JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters"),

  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),

  CLIENT_URL: z.string().min(1, "CLIENT_URL is required"),

  JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN is required"),
});

export const env = envSchema.parse(process.env);