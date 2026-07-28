import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "../types/jwt.types";

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as unknown as number,
    });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};