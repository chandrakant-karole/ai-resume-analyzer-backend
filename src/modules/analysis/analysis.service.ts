import { gemini } from "../../config/gemini";
import { ApiError } from "../../utils/ApiError";
import { Resume } from "../resume/resume.model";

import { Analysis } from "./analysis.model";
import { buildResumeAnalysisPrompt } from "../../prompts/resume-analysis.prompt";
import { parseAnalysisResponse } from "./analysis.parser";

class AnalysisService {
    async analyzeResume(userId: string, resumeId: string | string[]) {
        // Step 1: Find the resume
        const resume = await Resume.findOne({
            _id: resumeId,
            user: userId,
        });

        if (!resume) {
            throw new ApiError(404, "Resume not found.");
        }

        // Step 2: Check if analysis already exists
        const existingAnalysis = await Analysis.findOne({
            resume: resume._id,
        });

        if (existingAnalysis) {
            return existingAnalysis;
        }

        // Step 3: Build AI prompt
        const prompt = buildResumeAnalysisPrompt(
            resume.extractedText
        );

        // Step 4: Call Gemini
        
        const response = await gemini.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new ApiError(
                500,
                "Empty response received from AI."
            );
        }

        // Step 5: Validate AI response
        const result = parseAnalysisResponse(text);
        // Step 6: Save analysis
        const analysis = await Analysis.create({
            resume: resume._id,

            overallScore: result.overallScore,

            scores: result.scores,

            strengths: result.strengths,

            weaknesses: result.weaknesses,

            suggestions: result.suggestions,
        });
        // Step 7: Return analysis
        return analysis;
    }
}

export const analysisService = new AnalysisService();