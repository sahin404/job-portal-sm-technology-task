import express from 'express';
import { loginController, loginVerify, signUpController, signUpVerify } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signup/verify', signUpVerify);
authRouter.post('/login', loginController);
authRouter.post('/login/verify', loginVerify);

export default authRouter;