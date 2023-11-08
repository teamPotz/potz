/*
  Warnings:

  - A unique constraint covering the columns `[userId,deliveryPotId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Order_userId_deliveryPotId_key` ON `Order`(`userId`, `deliveryPotId`);
