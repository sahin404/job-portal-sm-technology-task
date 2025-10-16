import { Router } from "express";
import { applyForJob, deleteApplication, getAllApplications} from "./application.controller";

const applicationRouter = Router();

//Application CRUD
applicationRouter.post("/", applyForJob); // Create an application: Only Employee
applicationRouter.get("/", getAllApplications); // Get All application: Admin & Employer
applicationRouter.delete("/:id", deleteApplication); // Delete: Only Admin


export default applicationRouter;
