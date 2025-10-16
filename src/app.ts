import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';
import jobRouter from './modules/job/job.routes';
import applicationRouter from './modules/application/application.routes';
import organizationRouter from './modules/organization/organization.routes';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/job', jobRouter);
app.use('/api/application', applicationRouter);
app.use('/api/organization', organizationRouter);



app.get('/', (req, res) => {
  res.send('Server is running!');
});

export default app;
