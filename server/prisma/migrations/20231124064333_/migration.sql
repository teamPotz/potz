/*
  Warnings:

  - You are about to alter the column `kakaoId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[kakaoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `kakaoId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_kakaoId_key` ON `User`(`kakaoId`);
