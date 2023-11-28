/*
  Warnings:

  - You are about to drop the column `depositorId` on the `Deposit` table. All the data in the column will be lost.
  - Added the required column `depositor` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Deposit` DROP FOREIGN KEY `Deposit_depositorId_fkey`;

-- AlterTable
ALTER TABLE `Deposit` DROP COLUMN `depositorId`,
    ADD COLUMN `depositor` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
