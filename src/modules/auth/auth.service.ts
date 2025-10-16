import { prisma } from "../../config/db";
import { generateOtp } from "../../utils/generateOtp";
import { pendingUser, signUpInput, signUpVerify } from "./auth.types";
import bcrypt from "bcrypt";
// @ts-ignore
import { sendEmail } from "../../utils/sendEmail";

//temp memory for use pending user
let pendingUsers: Record<string,pendingUser> = {};

//sign up - step1
export const signUpService = async (data: signUpInput) => {

  const { name, email, password, role } = data;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already exists");

  const otp = generateOtp();
  const hashedPassword = await bcrypt.hash(password, 10);

  pendingUsers[email] = { name, email, password: hashedPassword, role, otp };

  await sendEmail(email, `Your verification code is: ${otp}`);
  return { email, message: "Verification code sent to the email" };

};


//sign up - step2
export const signUpServiceVerify = async(data:signUpVerify)=>{
  const {email, otp} = data;
  const pending = pendingUsers[email];
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
  delete pendingUsers[email];

  return { message: "Signup successful", user: {name, email} };
};