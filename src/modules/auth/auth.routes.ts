import express from 'express';
import { signUpController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', signUpController);

export default authRouter;