/*
  Warnings:

  - Added the required column `displayOrder` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayOrder` to the `CommunityType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `displayOrder` INTEGER NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CommunityType` ADD COLUMN `displayOrder` INTEGER NOT NULL;
