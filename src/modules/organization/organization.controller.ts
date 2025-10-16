import { Request, Response } from "express";
import * as OrgService from "./organization.services";

// create organization
export const createOrganization = async (req: Request, res: Response) => {
  try {
    const org = await OrgService.createOrganization(req.body);
    res.status(201).json({ success: true, data: org });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all organizations
export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const orgs = await OrgService.getAllOrganizations();
    res.json({ success: true, data: orgs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update organization
export const updateOrganization = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const org = await OrgService.updateOrganization(id, req.body);
    res.json({ success: true, data: org });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete organization
export const deleteOrganization = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await OrgService.deleteOrganization(id);
    res.json({ success: true, message: "Organization deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
