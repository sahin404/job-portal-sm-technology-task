import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access.",
      errorDetails: "You must be an admin to perform this action.",
    });
  }
  next();
};

export const isEmployer = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "EMPLOYER") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access.",
      errorDetails: "You must be an employer to perform this action.",
    });
  }
  next();
};

export const isEmployee = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "EMPLOYEE") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access.",
      errorDetails: "You must be an employee to perform this action.",
    });
  }
  next();
};
