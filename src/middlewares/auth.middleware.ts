import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export const authenticate: RequestHandler = (
  req,
  res,
  next
) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    req.user = verifyToken(token);

    next();
  } catch {
    next(new ApiError(401, "Invalid Token"));
  }
};