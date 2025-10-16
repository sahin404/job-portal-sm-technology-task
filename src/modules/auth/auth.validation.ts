import { Request, Response, NextFunction } from "express";
import { handleValidationError } from "../../middlewares/validationError.middleware";

export const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body;

  // Name
  if (!name || name.trim().length < 3) {
    return handleValidationError("name", "Name must be at least 3 characters long.", res);
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return handleValidationError("email", "Invalid email format.", res);
  }

  // Password
  if (!password || password.length < 6) {
    return handleValidationError("password", "Password must be at least 6 characters long.", res);
  }

  // Role
  const validRoles = ["EMPLOYER", "EMPLOYEE"];
  if (!role || !validRoles.includes(role)) {
    return handleValidationError("role", "Role must be one of: EMPLOYER, or EMPLOYEE.", res);
  }

  next();
};
