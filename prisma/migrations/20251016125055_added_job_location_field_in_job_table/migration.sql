/*
  Warnings:

  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobLocation" AS ENUM ('ONSITE', 'REMOTE');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "location" "JobLocation" NOT NULL;
