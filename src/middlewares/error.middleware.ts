import { ErrorRequestHandler } from "express";
import multer from "multer";

import { ApiError } from "../utils/ApiError";

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message: "File size must not exceed 5 MB.",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

// import { ErrorRequestHandler } from "express";
// import { ApiError } from "../utils/ApiError";

// export const errorHandler: ErrorRequestHandler = (
//   err,
//   req,
//   res,
//   next
// ) => {
//   if (err instanceof ApiError) {
//     res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//     });

//     return;
//   }

//   console.error(err);

//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// };