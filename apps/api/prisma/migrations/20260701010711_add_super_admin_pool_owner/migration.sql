/*
  Warnings:

  - Added the required column `ownerId` to the `Pool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pool` ADD COLUMN `ownerId` INTEGER NOT NULL,
    MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'CLOSED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'PARTICIPANT') NOT NULL DEFAULT 'PARTICIPANT';

-- CreateIndex
CREATE INDEX `Pool_ownerId_idx` ON `Pool`(`ownerId`);

-- AddForeignKey
ALTER TABLE `Pool` ADD CONSTRAINT `Pool_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
