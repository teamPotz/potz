-- DropForeignKey
ALTER TABLE `_ParticipantsRelation` DROP FOREIGN KEY `_ParticipantsRelation_A_fkey`;

-- CreateTable
CREATE TABLE `_ParticipantsRelationHistory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ParticipantsRelationHistory_AB_unique`(`A`, `B`),
    INDEX `_ParticipantsRelationHistory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ParticipantsRelation` ADD CONSTRAINT `_ParticipantsRelation_A_fkey` FOREIGN KEY (`A`) REFERENCES `DeliveryPot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParticipantsRelationHistory` ADD CONSTRAINT `_ParticipantsRelationHistory_A_fkey` FOREIGN KEY (`A`) REFERENCES `DeliveryPotHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParticipantsRelationHistory` ADD CONSTRAINT `_ParticipantsRelationHistory_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
