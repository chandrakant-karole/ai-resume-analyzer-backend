import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notFound.middleware";
import authRoutes from "./modules/auth/auth.route";
import resumeRoutes from "./modules/resume/resume.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "AI Resume Analyzer API",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resume", resumeRoutes);

app.use(notFound);
app.use(errorHandler);
export default app;