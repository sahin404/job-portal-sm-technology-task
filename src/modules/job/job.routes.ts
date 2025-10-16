import { Router } from "express";
import { createJob, deleteJob, filterJobs, getAllJobs, updateJob } from "./job.controller";

const jobRouter = Router();

//Job CRUD
jobRouter.get("/", getAllJobs); //admin, employer, employee
jobRouter.get("/search", filterJobs); // admin, employer, employee
jobRouter.post("/", createJob); // employer
jobRouter.put("/:id", updateJob); //employer
jobRouter.delete("/:id", deleteJob); //admin

export default jobRouter;
