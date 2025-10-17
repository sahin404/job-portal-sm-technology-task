import { Request, Response } from "express";
import { signUpService, singInService } from "./auth.service";

// SignUp
export const signUpController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    const response = await signUpService({ name, email, password, role });
    res.status(200).json({
      success: true,
      name: response.user.name,
      email: response.user.email,
      message: response.message,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


// Sign In
export const loginController = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const response = await singInService({email,password});
    res.status(200).json({
      success: true,
      message: response.message,
      name:response.user.name,
      email:response.user.email,
      role:response.user.role,
      token: response.token
    });

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
