import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { sendResponse } from "../../utils/sendResponse";

import { resumeService } from "./resume.service";
import { IdParams } from "../../types/params.types";


export const uploadResume = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, "Resume PDF is required");
        }

        const resume = await resumeService.uploadResume({
            userId: req.user!.userId,
            file: req.file,
        });

        sendResponse({
            res,
            statusCode: 201,
            message: "Resume uploaded successfully.",
            data: resume,
        });
    }
);

export const getUserResumes = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized");
        }

        const resumes = await resumeService.getUserResumes(req.user!.userId);

        sendResponse({
            res,
            statusCode: 200,
            message: "Resumes fetched successfully.",
            data: resumes,
        });
    }
);

export const getResumeById = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Resume id is required.");
    }

    const resume = await resumeService.getResumeById(
        req.user.userId,
        id
    );

    sendResponse({
        res,
        statusCode: 200,
        message: "Resume fetched successfully.",
        data: resume,
    });
});