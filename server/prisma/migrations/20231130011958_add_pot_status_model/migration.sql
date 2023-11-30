-- CreateTable
CREATE TABLE `DeliveryPotStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('MENU_REQUEST', 'DEPOSIT_REQUEST', 'PICKUP_REQUEST') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DeliveryPotToDeliveryPotStatus` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DeliveryPotToDeliveryPotStatus_AB_unique`(`A`, `B`),
    INDEX `_DeliveryPotToDeliveryPotStatus_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DeliveryPotToDeliveryPotStatus` ADD CONSTRAINT `_DeliveryPotToDeliveryPotStatus_A_fkey` FOREIGN KEY (`A`) REFERENCES `DeliveryPot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DeliveryPotToDeliveryPotStatus` ADD CONSTRAINT `_DeliveryPotToDeliveryPotStatus_B_fkey` FOREIGN KEY (`B`) REFERENCES `DeliveryPotStatus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
