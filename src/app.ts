import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);



app.get('/', (req, res) => {
  res.send('Server is running!');
});

export default app;
