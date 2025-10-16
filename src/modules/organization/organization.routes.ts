import { Router } from "express";
import { createOrganization, deleteOrganization, getAllOrganizations, updateOrganization } from "./organization.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { isAdmin, isEmployer } from "../../middlewares/role.middleware";

const organizationRouter = Router();

// Organization CRUD
organizationRouter.get("/", authenticate, getAllOrganizations); // Admin, employer, employee
organizationRouter.post("/",authenticate, isEmployer, createOrganization); // only employer
organizationRouter.put("/:id", authenticate, isEmployer, updateOrganization); // only employer
organizationRouter.delete("/:id", authenticate, isAdmin, deleteOrganization); // only Admin

export default organizationRouter;
