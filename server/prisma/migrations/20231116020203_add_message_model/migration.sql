/*
  Warnings:

  - You are about to drop the `PostTemp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `PostTemp`;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `deliveryPotId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_deliveryPotId_fkey` FOREIGN KEY (`deliveryPotId`) REFERENCES `DeliveryPot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
