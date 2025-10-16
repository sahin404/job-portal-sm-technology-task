import { Request, Response, NextFunction } from "express";
import { handleValidationError } from "../../middlewares/validationError.middleware";

export const validateCreateJob = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, location } = req.body;

  // Title
  if (!title || title.trim().length < 3) {
    return handleValidationError("title", "Title must be at least 3 characters long.", res);
  }

  // Description
  if (!description || description.trim().length < 10) {
    return handleValidationError("description", "Description must be at least 10 characters long.", res);
  }

  // Location
  if (!location || location.trim().length < 2) {
    return handleValidationError("location", "Location is required.", res);
  }

  next();
};
