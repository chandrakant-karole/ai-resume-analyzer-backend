import { ZodError } from "zod";
import { ApiError } from "../../utils/ApiError";
import {
    analysisResultSchema,
    AnalysisResult,
} from "./analysis.validator";

function extractJson(response: string): string {
    const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
        throw new ApiError(
            500,
            "AI response does not contain valid JSON."
        );
    }

    return cleaned.slice(start, end + 1);
}

export const parseAnalysisResponse = (
    response: string
): AnalysisResult => {
    try {
        const json = extractJson(response);

        const parsed = JSON.parse(json);

        return analysisResultSchema.parse(parsed);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new ApiError(500, "AI returned malformed JSON.");
        }

        if (error instanceof ZodError) {
            throw new ApiError(500, "AI response does not match the expected schema.");
        }

        throw error;
    }
};