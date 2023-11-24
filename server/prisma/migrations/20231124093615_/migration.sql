/*
  Warnings:

  - You are about to drop the column `socketId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_socketId_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `socketId`;
