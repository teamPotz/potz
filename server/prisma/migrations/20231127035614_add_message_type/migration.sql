/*
  Warnings:

  - You are about to alter the column `content` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN `type` ENUM('SYSTEM', 'TEXT', 'IMAGE', 'ORDER', 'ORDER_CONFIRM', 'DEPOSIT', 'DEPOSIT_CONFIRM') NOT NULL DEFAULT 'TEXT',
    MODIFY `content` JSON NOT NULL;
