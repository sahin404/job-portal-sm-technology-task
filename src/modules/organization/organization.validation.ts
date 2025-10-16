import { Request, Response, NextFunction } from "express";
import { handleValidationError } from "../../middlewares/validationError.middleware";

export const validateCreateOrganization = (req: Request, res: Response, next: NextFunction) => {
  const { name, ownerId } = req.body;

  // Name
  if (!name || name.trim().length < 3) {
    return handleValidationError("name", "Organization name must be at least 3 characters long.", res);
  }

  // OwnerId
  if (!ownerId || typeof ownerId !== "number") {
    return handleValidationError("ownerId", "OwnerId is required and must be a number.", res);
  }

  next();
};
