import { Router } from "express";
import { deleteUser, getAllUsers, updateUser } from "./user.controller";

const userRouter = Router();

// User CRUD
userRouter.get("/", getAllUsers); //only admin
userRouter.put("/:id", updateUser); // user itself
userRouter.delete("/:id", deleteUser); //only admin

export default userRouter;
