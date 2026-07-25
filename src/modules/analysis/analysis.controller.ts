import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { analysisService } from "./analysis.service";

export const analyzeResume = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const { resumeId } = req.params;

    if (!resumeId) {
        throw new ApiError(400, "Resume ID is required.");
    }

    const analysis = await analysisService.analyzeResume(
        req.user.userId,
        resumeId
    );

    sendResponse({
        res,
        statusCode: 200,
        message: "Resume analyzed successfully.",
        data: analysis,
    });
});

export const getAnalysis = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const { resumeId } = req.params;

    if (!resumeId) {
        throw new ApiError(400, "Resume ID is required.");
    }

    const analysis = await analysisService.getAnalysis(
        req.user.userId,
        resumeId
    );

    sendResponse({
        res,
        statusCode: 200,
        message: "Analysis fetched successfully.",
        data: analysis,
    });
});

export const deleteAnalysis = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const { resumeId } = req.params;

    if (!resumeId) {
        throw new ApiError(400, "Resume ID is required.");
    }

    await analysisService.deleteAnalysis(
        req.user.userId,
        resumeId
    );

    sendResponse({
        res,
        statusCode: 200,
        message: "Analysis deleted successfully.",
        data: null,
    });
});