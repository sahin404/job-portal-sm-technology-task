import { Router } from "express";
import { deleteUser, getAllUsers, updateUser } from "./user.controller";
import { isAdmin } from "../../middlewares/role.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const userRouter = Router();

// User CRUD
userRouter.get("/", authenticate, isAdmin, getAllUsers); //only admin
userRouter.put("/:id", authenticate, updateUser); // user itself
userRouter.delete("/:id", authenticate, isAdmin, deleteUser); //only admin

export default userRouter;
