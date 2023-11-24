/*
  Warnings:

  - You are about to alter the column `kakaoId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `kakaoId` INTEGER NULL;
