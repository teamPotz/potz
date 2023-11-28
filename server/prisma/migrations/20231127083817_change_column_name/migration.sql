/*
  Warnings:

  - You are about to drop the column `userId` on the `Deposit` table. All the data in the column will be lost.
  - Added the required column `depositorId` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Deposit` DROP FOREIGN KEY `Deposit_userId_fkey`;

-- AlterTable
ALTER TABLE `Deposit` DROP COLUMN `userId`,
    ADD COLUMN `depositorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_depositorId_fkey` FOREIGN KEY (`depositorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
