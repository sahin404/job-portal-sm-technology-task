import express from 'express';
import { signUpController, signUpVerify } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signup/verify', signUpVerify);

export default authRouter;