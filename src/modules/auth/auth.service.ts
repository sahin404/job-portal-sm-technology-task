import { prisma } from "../../config/db";
import { generateOtp } from "../../utils/generateOtp";
import {
  pendingSigninUser,
  pendingSignUpUser,
  signInInput,
  signInVerify,
  signUpInput,
  signUpVerify,
} from "./auth.types";
import bcrypt from "bcrypt";
// @ts-ignore
import { sendEmail } from "../../utils/sendEmail";
import { generateToken } from "../../utils/generateToken";

//temp memory for use pending user
let pendingSignUpUser: Record<string, pendingSignUpUser> = {};
let pendingLogin: Record<string, pendingSigninUser> = {};

//sign up - step1
export const signUpService = async (data: signUpInput) => {
  const { name, email, password, role } = data;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already exists");

  const otp = generateOtp();
  const hashedPassword = await bcrypt.hash(password, 10);

  pendingSignUpUser[email] = {
    name,
    email,
    password: hashedPassword,
    role,
    otp,
  };

  await sendEmail(email, `Your verification code is: ${otp}`);
  return { email, message: "Verification code sent to the email" };
};

//sign up - step2
export const signUpServiceVerify = async (data: signUpVerify) => {
  const { email, otp } = data;
  const pending = pendingSignUpUser[email];
  if (!pending) throw new Error("No pending signup found");
  if (pending.otp !== otp) throw new Error("Invalid OTP");

  const newUser = await prisma.user.create({
    data: {
      name: pending.name,
      email: pending.email,
      password: pending.password,
      role: pending.role,
    },
  });

  const name = pending.name;
  delete pendingSignUpUser[email];

  return { message: "Signup successful", user: { name, email } };
};

//sign in - step1
export const singInService = async (data: signInInput) => {
  const { email, password } = data;

  //handle email not found
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  //handle wrong password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  //send otp
  const otp = generateOtp();
  pendingLogin[email] = { email, password, otp };
  await sendEmail(email, `Your verification code is: ${otp}`);

  //return
  return {
    email: email,
    message: "Verification code sent to the email from login",
  };
};

//sign in - step2
export const signInServiceVerify = async (data: signInVerify) => {
  const { email, otp } = data;
  const pendingLoginState = pendingLogin[email];
  if (!pendingLoginState) throw new Error("No pending signup found");
  if (pendingLoginState.otp !== otp) throw new Error("Invalid OTP");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("User not found");

  //generate token
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  delete pendingLogin[email];

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
