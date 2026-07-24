import { Response } from "express";
import { ApiResponse } from "./ApiResponse";

interface SendResponseOptions<T> {
    res: Response;
    statusCode: number;
    message: string;
    data?: T;
}

export const sendResponse = <T>({
    res,
    statusCode,
    message,
    data,
}: SendResponseOptions<T>) => {
    return res
        .status(statusCode)
        .json(new ApiResponse(true, message, data));
};