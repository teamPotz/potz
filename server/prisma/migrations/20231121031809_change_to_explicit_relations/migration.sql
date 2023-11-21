/*
  Warnings:

  - You are about to drop the `_CommunityToCommunityType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommunityToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CommunityToCommunityType` DROP FOREIGN KEY `_CommunityToCommunityType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CommunityToCommunityType` DROP FOREIGN KEY `_CommunityToCommunityType_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CommunityToUser` DROP FOREIGN KEY `_CommunityToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CommunityToUser` DROP FOREIGN KEY `_CommunityToUser_B_fkey`;

-- DropTable
DROP TABLE `_CommunityToCommunityType`;

-- DropTable
DROP TABLE `_CommunityToUser`;

-- CreateTable
CREATE TABLE `CommunitiesOnUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `communityId` INTEGER NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CommunitiesOnUsers_userId_communityId_key`(`userId`, `communityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityTypesOnCommunities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `communityTypeId` INTEGER NOT NULL,
    `communityId` INTEGER NOT NULL,

    UNIQUE INDEX `CommunityTypesOnCommunities_communityTypeId_communityId_key`(`communityTypeId`, `communityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommunitiesOnUsers` ADD CONSTRAINT `CommunitiesOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunitiesOnUsers` ADD CONSTRAINT `CommunitiesOnUsers_communityId_fkey` FOREIGN KEY (`communityId`) REFERENCES `Community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityTypesOnCommunities` ADD CONSTRAINT `CommunityTypesOnCommunities_communityTypeId_fkey` FOREIGN KEY (`communityTypeId`) REFERENCES `CommunityType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityTypesOnCommunities` ADD CONSTRAINT `CommunityTypesOnCommunities_communityId_fkey` FOREIGN KEY (`communityId`) REFERENCES `Community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
