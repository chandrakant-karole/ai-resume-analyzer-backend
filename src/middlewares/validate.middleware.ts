import { ZodObject, ZodError } from "zod";
import { RequestHandler } from "express";

export const validate =
    (schema: ZodObject): RequestHandler =>
        (req, res, next) => {
            try {
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        success: false,
                        errors: error.issues.map((issue) => ({
                            field: issue.path.join("."),
                            message: issue.message,
                        })),
                    });
                }

                next(error);
            }
        };