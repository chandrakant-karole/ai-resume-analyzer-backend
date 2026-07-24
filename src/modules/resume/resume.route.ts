import { Router } from "express";

import { authenticate } from "../../middlewares/auth.middleware";
import { upload } from "../../config/multer";

import { getResumeById, getUserResumes, uploadResume } from "./resume.controller";

const router = Router();

router.post(
    "/upload",
    authenticate,
    upload.single("resume"),
    uploadResume
);

router.get(
    "/",
    authenticate,
    getUserResumes
);

router.get(
    "/:id",
    authenticate,
    getResumeById
);

export default router;