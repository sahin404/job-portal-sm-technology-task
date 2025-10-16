import { Request, Response } from "express";
import * as JobService from "./job.services";

// get all jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.json({ success: true, data: jobs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// create a job
export const createJob = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const job = await JobService.createJob(data);
    res.status(201).json({ success: true, data: job });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update a job
export const updateJob = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const job = await JobService.updateJob(id, data);
    res.json({ success: true, data: job });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete a job
export const deleteJob = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await JobService.deleteJob(id);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// filter / search jobs
export const filterJobs = async (req: Request, res: Response) => {
  const filters = {
    title: req.query.title as string,
    location: req.query.location as string
  };
  try {
    const jobs = await JobService.filterJobs(filters);
    res.json({ success: true, data: jobs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
