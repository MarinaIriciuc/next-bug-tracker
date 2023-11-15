/*
  Warnings:

  - Made the column `startDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Project` MODIFY `startDate` VARCHAR(191) NOT NULL,
    MODIFY `endDate` VARCHAR(191) NOT NULL;
