import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { analyzeResume } from "./analysis.controller";

const router = Router();

router.post(
    "/:resumeId",
    authenticate,
    analyzeResume
);

export default router;