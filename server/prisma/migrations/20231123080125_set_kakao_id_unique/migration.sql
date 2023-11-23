/*
  Warnings:

  - A unique constraint covering the columns `[kakaoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_kakaoId_key` ON `User`(`kakaoId`);
