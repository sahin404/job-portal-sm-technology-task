import app from './app';
import { prisma } from './config/db';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`Server running at ${PORT}`);
});
