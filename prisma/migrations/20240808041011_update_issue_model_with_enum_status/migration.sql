/*
  Warnings:

  - You are about to drop the column `content` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `content`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    MODIFY `title` VARCHAR(255) NOT NULL;
