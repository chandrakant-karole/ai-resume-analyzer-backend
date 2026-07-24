import { CookieOptions } from "express";
import { env } from "./env";

export const cookieOptions: CookieOptions = {
  httpOnly: true,

  secure: env.NODE_ENV === "production",

  sameSite: "lax",

  maxAge: 1000 * 60 * 60 * 24 * 7,
};