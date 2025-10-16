import { Router } from "express";
import { createJob, deleteJob, filterJobs, getAllJobs, updateJob } from "./job.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { isAdmin, isEmployer } from "../../middlewares/role.middleware";
import { validateCreateJob } from "./job.validation";

const jobRouter = Router();

//Job CRUD
jobRouter.get("/", authenticate, getAllJobs); //admin, employer, employee
jobRouter.get("/search", authenticate, filterJobs); // admin, employer, employee
jobRouter.post("/", authenticate, validateCreateJob, isEmployer, createJob); // employer
jobRouter.put("/:id", authenticate, isEmployer, updateJob); //employer
jobRouter.delete("/:id", authenticate, isAdmin, deleteJob); //admin

export default jobRouter;
