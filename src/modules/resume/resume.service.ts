import fs from "node:fs/promises";
import path from "node:path";
import pdfParse from "pdf-parse";
import { ApiError } from "../../utils/ApiError";
import { Resume } from "./resume.model";
import { UploadResumeDto } from "./resume.dto";
import { Analysis } from "../analysis/analysis.model";

class ResumeService {
    private async extractPdfText(filePath: string): Promise<string> {
        const buffer = await fs.readFile(filePath);

        const pdf = await pdfParse(buffer);

        const extractedText = pdf.text.trim();

        if (!extractedText) {
            throw new ApiError(
                400,
                "No readable text found in the uploaded PDF."
            );
        }

        return extractedText;
    }

    async uploadResume(data: UploadResumeDto) {
        try {
            const extractedText = await this.extractPdfText(data.file.path);

            const resume = await Resume.create({
                user: data.userId,
                originalFileName: data.file.originalname,
                storedFileName: data.file.filename,
                filePath: data.file.path,
                extractedText,
            });

            return resume;
        } catch (error) {
            await fs.unlink(data.file.path).catch(() => { });

            throw error;
        }
    }

    async getUserResumes(userId: string) {
        const resumes = await Resume.find({ user: userId })
            .select("originalFileName createdAt updatedAt")
            .sort({ createdAt: -1 })
            .lean();

        const resumeIds = resumes.map((resume) => resume._id);

        const analyses = await Analysis.find({
            resume: { $in: resumeIds },
        })
            .select("resume")
            .lean();

        const analyzedResumeIds = new Set(
            analyses.map((analysis) => analysis.resume.toString())
        );

        return resumes.map((resume) => ({
            ...resume,
            hasAnalysis: analyzedResumeIds.has(resume._id.toString()),
        }));
    }

    async getResumeById(userId: string, resumeId: string | string[]) {
        const resume = await Resume.findOne({
            _id: resumeId,
            user: userId,
        });

        if (!resume) {
            throw new ApiError(404, "Resume not found.");
        }

        return resume;
    }

    async deleteResume(userId: string, resumeId: string | string[]) {
        const resume = await Resume.findOne({
            _id: resumeId,
            user: userId,
        });

        if (!resume) {
            throw new ApiError(404, "Resume not found.");
        }

        try {
            await fs.unlink(path.resolve(resume.filePath));
        } catch (error: any) {
            if (error.code !== "ENOENT") {
                throw error;
            }
        }

        await Analysis.deleteMany({
            resume: resume._id,
        });

        await resume.deleteOne();
    }
}

export const resumeService = new ResumeService();