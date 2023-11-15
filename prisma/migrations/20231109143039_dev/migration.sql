/*
  Warnings:

  - You are about to drop the column `createdById` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `responsibleId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_createdById_fkey`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `createdById`,
    DROP COLUMN `responsibleId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
