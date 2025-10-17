import { prisma } from "../../config/db";
import { generateToken } from "../../utils/generateToken";
import {
  signInInput,
  signUpInput,
} from "./auth.types";
import bcrypt from "bcrypt";

//sign up
export const signUpService = async (data: signUpInput) => {
  const { name, email, password, role } = data;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    },
  });

  return { message: "Signup successful", user: { name, email } };
};


//sign in
export const singInService = async (data: signInInput) => {
  const { email, password } = data;

  //handle email not found
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  //handle wrong password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role:user.role
    },
  };
  
};
