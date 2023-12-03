/*
  Warnings:

  - The values [POST,REQUEST] on the enum `Notification_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_NotificationToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_NotificationToUser` DROP FOREIGN KEY `_NotificationToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_NotificationToUser` DROP FOREIGN KEY `_NotificationToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `type` ENUM('NEW_POST', 'NEW_REQUEST') NOT NULL;

-- DropTable
DROP TABLE `_NotificationToUser`;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
