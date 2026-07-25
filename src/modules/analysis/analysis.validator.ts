import { z } from "zod";

export const analysisResultSchema = z.object({
    overallScore: z.number().min(0).max(100),

    scores: z.object({
        content: z.number().min(0).max(100),
        skills: z.number().min(0).max(100),
        experience: z.number().min(0).max(100),
        formatting: z.number().min(0).max(100),
        atsCompatibility: z.number().min(0).max(100),
    }),

    strengths: z.array(z.string()).min(3).max(5),

    weaknesses: z.array(z.string()).min(3).max(5),

    suggestions: z.array(z.string()).min(3).max(5),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;