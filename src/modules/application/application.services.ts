import { PrismaClient } from "@prisma/client";
import { IApplication } from "./application.types";

const prisma = new PrismaClient();

// create an application for a job
export const applyForJobService = async (data: IApplication) => {

  // check if already applied
  const exists = await prisma.application.findFirst({
    where: { 
        jobId: data.jobId, 
        applicantId: data.applicantId 
    }
  });

  if (exists) throw new Error("Already applied for this job");

  return await prisma.application.create({
    data
  });

};

// get all applications
export const getAllApplicationsService = async () => {
  return await prisma.application.findMany({
    include: { 
        job: true, 
        applicant: true 
    }
  });
};


// delete application
export const deleteApplicationService = async (id: number) => {
  return await prisma.application.delete({
    where: { id }
  });
};
