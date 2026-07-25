import { gemini } from "../../config/gemini";
import { ApiError } from "../../utils/ApiError";
import { Resume } from "../resume/resume.model";

import { Analysis } from "./analysis.model";
import { buildResumeAnalysisPrompt } from "../../prompts/resume-analysis.prompt";
import { parseAnalysisResponse } from "./analysis.parser";
import logger from "../../utils/logger";

class AnalysisService {
    private async getOwnedResume(
        userId: string,
        resumeId: string | string[]
    ) {
        const resume = await Resume.findOne({
            _id: resumeId,
            user: userId,
        });

        if (!resume) {
            throw new ApiError(404, "Resume not found.");
        }

        return resume;
    }

    async analyzeResume(userId: string, resumeId: string | string[]) {
        const resume = await this.getOwnedResume(
            userId,
            resumeId
        );

        const existingAnalysis = await Analysis.findOne({
            resume: resume._id,
        });

        if (existingAnalysis) {
            logger.warn(
                `Analysis already exists for resume ${resume._id}`
            );

            return existingAnalysis;
        }

        const prompt = buildResumeAnalysisPrompt(
            resume.extractedText
        );

        logger.info(
            `Starting AI analysis for resume ${resume._id} (user: ${userId})`
        );


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

        const result = parseAnalysisResponse(text);
        const analysis = await Analysis.create({
            resume: resume._id,

            overallScore: result.overallScore,

            scores: result.scores,

            strengths: result.strengths,

            weaknesses: result.weaknesses,

            suggestions: result.suggestions,
        });

        logger.info(
            `AI analysis completed for resume ${resume._id}`
        );
        return analysis;
    }

    async getAnalysis(userId: string, resumeId: string | string[]) {
        const resume = await this.getOwnedResume(
            userId,
            resumeId
        );

        const analysis = await Analysis.findOne({
            resume: resume._id,
        });

        if (!analysis) {
            throw new ApiError(404, "Analysis not found.");
        }

        return analysis;
    }

    async deleteAnalysis(userId: string, resumeId: string | string[]) {
        const resume = await this.getOwnedResume(
            userId,
            resumeId
        );

        const analysis = await Analysis.findOneAndDelete({
            resume: resume._id,
        });

        if (!analysis) {
            throw new ApiError(404, "Analysis not found.");
        }

        return analysis;
    }
}

export const analysisService = new AnalysisService();