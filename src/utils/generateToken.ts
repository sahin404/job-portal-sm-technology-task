import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return token;
};