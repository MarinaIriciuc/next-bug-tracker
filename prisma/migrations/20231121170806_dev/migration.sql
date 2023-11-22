/*
  Warnings:

  - You are about to alter the column `columnId` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `columnId` ENUM('todo', 'in_progress', 'done') NOT NULL DEFAULT 'todo';
