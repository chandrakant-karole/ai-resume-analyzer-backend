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