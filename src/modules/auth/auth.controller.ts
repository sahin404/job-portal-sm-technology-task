import { Request, Response } from "express";
import { signInServiceVerify, signUpService, signUpServiceVerify, singInService } from "./auth.service";

// SignUp step 1
export const signUpController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    const response = await signUpService({ name, email, password, role });
    res.status(200).json({
      success: true,
      email: response.email,
      message: response.message,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// SignUp step 2
export const signUpVerify = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const response = await signUpServiceVerify({ email, otp });
    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Sign In step 1
export const loginController = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const response = await singInService({email,password});
    res.status(200).json({
      success: true,
      email:response.email,
      message: response.message,
    });

  } catch (err: any) {
    res.status(400).json({ message: err.message+"DF" });
  }
};

// Sign In step 2
export const loginVerify = async (req: Request, res: Response) => {
  try {
    const {email, otp} = req.body;

    const response =  await signInServiceVerify({email, otp});
    res.status(200).json({
      success: true,
      token:response.token,
      message: response.message,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
