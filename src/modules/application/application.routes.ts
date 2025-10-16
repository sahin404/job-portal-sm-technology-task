import { Router } from "express";
import { applyForJob, deleteApplication, getAllApplications} from "./application.controller";
import { isAdmin, isEmployee, isEmployer } from "../../middlewares/role.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const applicationRouter = Router();

//Application CRUD
applicationRouter.post("/", authenticate, isEmployee, applyForJob); // Create an application: Only Employee
applicationRouter.get("/", authenticate, isAdmin, isEmployer, getAllApplications); // Get All application: Admin & Employer
applicationRouter.delete("/:id", authenticate, isAdmin, deleteApplication); // Delete: Only Admin


export default applicationRouter;
