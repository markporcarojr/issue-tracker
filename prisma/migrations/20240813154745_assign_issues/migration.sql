-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `asssignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_asssignedToUserId_fkey` FOREIGN KEY (`asssignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
