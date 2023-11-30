/*
  Warnings:

  - You are about to drop the `_DeliveryPotToDeliveryPotStatus` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[potId,status]` on the table `DeliveryPotStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `potId` to the `DeliveryPotStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_DeliveryPotToDeliveryPotStatus` DROP FOREIGN KEY `_DeliveryPotToDeliveryPotStatus_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DeliveryPotToDeliveryPotStatus` DROP FOREIGN KEY `_DeliveryPotToDeliveryPotStatus_B_fkey`;

-- AlterTable
ALTER TABLE `DeliveryPotStatus` ADD COLUMN `potId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_DeliveryPotToDeliveryPotStatus`;

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryPotStatus_potId_status_key` ON `DeliveryPotStatus`(`potId`, `status`);

-- AddForeignKey
ALTER TABLE `DeliveryPotStatus` ADD CONSTRAINT `DeliveryPotStatus_potId_fkey` FOREIGN KEY (`potId`) REFERENCES `DeliveryPot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
