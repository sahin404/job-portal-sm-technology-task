import { Request, Response } from "express";
import { applyForJobService, deleteApplicationService, getAllApplicationsService} from "./application.services";

// create an application for a job
export const applyForJob = async (req: Request, res: Response) => {
  const data = { 
    jobId: req.body.jobId,
    applicantId: req.body.applicantId
  };
  try {
    const application = await applyForJobService(data);
    res.status(201).json({ success: true, data: application });
  } 
  catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// get all applications
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await getAllApplicationsService();
    res.json({ success: true, data: applications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete application
export const deleteApplication = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteApplicationService(id);
    res.json({ success: true, message: "Application deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
