import { Router } from "express";

import authController from "./auth.controller";

import { validate } from "../../middlewares/validate.middleware";

import { loginSchema, registerSchema } from "./auth.validator";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

router.get(
    "/me",
    authenticate,
    authController.me
);

router.post(
    "/logout",
    authenticate,
    authController.logout
);

export default router;