import { PrismaClient } from "@prisma/client";
import { IOrganization } from "./organization.types";

const prisma = new PrismaClient();

// Create organization
export const createOrganization = async (data: IOrganization) => {
  return await prisma.organization.create({
    data: {
      name: data.name,
      ownerId: data.ownerId,
      members: { connect: data.memberIds?.map(id => ({ id })) || [] }
    },
    include: { 
        owner: true, 
        members: true 
    }
  });
};

// get all organizations
export const getAllOrganizations = async () => {
  return await prisma.organization.findMany({
    include: { 
        owner: true, 
        members: true 
    }
  });
};

// Update organization
export const updateOrganization = async (id: number, data: Partial<IOrganization>) => {
  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.memberIds) {
    updateData.members = { set: data.memberIds.map(id => ({ id })) };
  }

  return await prisma.organization.update({
    where: { id },
    data: updateData,
    include: { 
        owner: true, 
        members: true 
    }
  });
};

// delete organization
export const deleteOrganization = async (id: number) => {
  return await prisma.organization.delete({
    where: { id }
  });
};
