import { Request, Response } from "express";

import authService from "./auth.service";

import { asyncHandler } from "../../utils/asyncHandler";
import { cookieOptions } from "../../config/cookie";
import { LoginDto, RegisterDto } from "./auth.dto";
import { sendResponse } from "../../utils/sendResponse";
import logger from "../../utils/logger";

class AuthController {
    register = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body as RegisterDto;
        const result = await authService.register(data);

        res.cookie("token", result.token, cookieOptions);
        logger.info(`User registered: ${result.user.email}`);
        return sendResponse({
            res,
            statusCode: 201,
            message: "Registration successful",
            data: result.user,
        });
    });

    login = asyncHandler(async (req, res) => {
        const data = req.body as LoginDto;

        const result = await authService.login(data);

        res.cookie("token", result.token, cookieOptions);
        logger.info(`User logged in: ${result.user.email}`);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Login successful",
            data: result.user,
        });
    });

    me = asyncHandler(async (req, res) => {
        const result = await authService.getCurrentUser(
            req.user!.userId
        );

        return sendResponse({
            res,
            statusCode: 200,
            message: "User fetched successfully",
            data: result,
        });
    });

    logout = asyncHandler(async (req, res) => {
        res.clearCookie("token", cookieOptions);

        return sendResponse({
            res,
            statusCode: 200,
            message: "Logged out successfully",
        });
    });

}

export default new AuthController();