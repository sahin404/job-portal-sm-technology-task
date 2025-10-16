import { PrismaClient } from "@prisma/client";
import { IUser } from "./user.types";

const prisma = new PrismaClient();

// get all users
export const getAllUsersServices = async () => {
  return await prisma.user.findMany({
    include: { profile: true }
  });
};

// update user profile
export const updateUserServices = async (id: number, data: Partial<IUser>) => {
  return await prisma.user.update({
    where: { id },
    data
  });
};

// delete user
export const deleteUserServices = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  });
};