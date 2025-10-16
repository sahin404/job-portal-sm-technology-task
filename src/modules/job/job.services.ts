import { PrismaClient } from "@prisma/client";
import { IJob } from "./job.types";

const prisma = new PrismaClient();

// get all jobs
export const getAllJobs = async () => {
  return await prisma.job.findMany({
    include: {
      employer: true,
      applications: true,
    },
  });
};

// create a new job
// export const createJob = async (data: IJob) => {
//   return await prisma.job.create({
//     data
//   });
// };

export const createJob = async (data: IJob) => {
  const jobsCount = await prisma.job.count({
    where: { employerId: data.employerId },
  });

  if (jobsCount >= 3) {
    throw new Error(
      "You have reached 3 free job posts. Please pay $2 per additional job."
    );
  }

  //Create job
  const job = await prisma.job.create({ data });
  return job;
};

// update job
export const updateJob = async (id: number, data: Partial<IJob>) => {
  return await prisma.job.update({
    where: { id },
    data,
  });
};

// delete job
export const deleteJob = async (id: number) => {
  return await prisma.job.delete({
    where: { id },
  });
};

// Filter / search jobs
export const filterJobs = async (filters: {
  title?: string;
  location?: string;
}) => {
  const where: any = {};

  if (filters.title)
    where.title = { contains: filters.title, mode: "insensitive" };
  if (filters.location) where.location = filters.location;

  return await prisma.job.findMany({
    where,
    include: {
      employer: true,
      applications: true,
    },
  });
};
