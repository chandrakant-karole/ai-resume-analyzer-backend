import fs from "node:fs";
import path from "node:path";

import multer from "multer";
import { ApiError } from "../utils/ApiError";

const uploadPath = path.join(process.cwd(), "uploads", "resumes");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath);
    },

    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path.extname(file.originalname);

        cb(null, `${uniqueSuffix}${extension}`);
    },
});

const fileFilter: multer.Options["fileFilter"] = (
    _req,
    file,
    cb
) => {
    if (file.mimetype !== "application/pdf") {
        return cb(new ApiError(400, "Only PDF files are allowed"));
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});