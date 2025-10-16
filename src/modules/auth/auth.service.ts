import { prisma } from "../../config/db";
import { generateOtp } from "../../utils/generateOtp";
import { signUpInput } from "./auth.types";
import bcrypt from "bcrypt";
// @ts-ignore
import { sendEmail } from "../../utils/sendEmail";

let pendingUsers: Record<string,signUpInput> = {};

export const signUpService = async (data: signUpInput) => {
  //'data' is contain the all signup related data from client side
  const { name, email, password, role } = data;

  // Check User Already Existance
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already exists");

  const otp = generateOtp();
  const hashedPassword = await bcrypt.hash(password, 10);

  pendingUsers[email] = { name, email, password: hashedPassword, otp };

  await sendEmail(email, `Your verification code is: ${otp}`);
  return { message: "Verification code sent to the email" };

};
