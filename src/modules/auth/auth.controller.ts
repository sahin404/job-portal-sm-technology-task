import { Request, Response } from "express"
import { signUpService, signUpServiceVerify } from "./auth.service";

export const signUpController = async(req:Request, res:Response)=>{
    try{
        const {name, email, password ,role} = req.body;
        const response = await signUpService({name, email, password, role});
        res.status(200).json({
            success:true,
            email:response.email,
            message:response.message
        })
    }

    catch(err:any){
        res.status(400).json({ message: err.message });
    }
}


export const signUpVerify = async(req:Request, res:Response)=>{
    try{
        const {email, otp} = req.body;
        const response = await signUpServiceVerify({email, otp});
        res.status(200).json({
            success:true,
            message:response.message
        })
    }
    catch(err:any){
        res.status(400).json({ message: err.message });
    }
}