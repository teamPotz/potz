/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DeliveryFee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DeliveryFee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DeliveryFee` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `imageUrl` VARCHAR(191) NULL;
