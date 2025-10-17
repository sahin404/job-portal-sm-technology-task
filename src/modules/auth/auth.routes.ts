import express from 'express';
import { loginController, signUpController} from './auth.controller';
import { validateSignUp } from './auth.validation';

const authRouter = express.Router();

authRouter.post('/signup',validateSignUp, signUpController);
// authRouter.post('/signup/verify', signUpVerify);
authRouter.post('/login', loginController);
// authRouter.post('/login/verify', loginVerify);

export default authRouter;