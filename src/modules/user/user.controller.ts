import { Request, Response } from "express";
import { deleteUserServices, getAllUsersServices, updateUserServices } from "./user.services";

// Get All User
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersServices();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update specific user
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const updatedUser = await updateUserServices(id, data);
    res.json({ success: true, data: updatedUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }   
};

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteUserServices(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
