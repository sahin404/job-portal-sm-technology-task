import { Response } from "express";

export const handleValidationError = (field: string, message: string, res: Response) => {
  return res.status(400).json({
    success: false,
    message: "Validation error occurred.",
    errorDetails: {
      field,
      message,
    },
  });
};
