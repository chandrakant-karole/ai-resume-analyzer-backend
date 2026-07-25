import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { analyzeResume, deleteAnalysis, getAnalysis } from "./analysis.controller";

const router = Router();

router.post(
    "/:resumeId",
    authenticate,
    analyzeResume
);

router.get(
    "/:resumeId",
    authenticate,
    getAnalysis
);

router.delete(
    "/:resumeId",
    authenticate,
    deleteAnalysis
);

export default router;