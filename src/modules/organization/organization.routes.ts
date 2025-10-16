import { Router } from "express";
import { createOrganization, deleteOrganization, getAllOrganizations, updateOrganization } from "./organization.controller";

const organizationRouter = Router();

// Organization CRUD
organizationRouter.get("/", getAllOrganizations); // Admin, employer, employee
organizationRouter.post("/", createOrganization); // only employer
organizationRouter.put("/:id", updateOrganization); // only employer
organizationRouter.delete("/:id", deleteOrganization); // only Admin

export default organizationRouter;
