-- DropTable
DROP TABLE IF EXISTS `Invitation`;

-- DropIndex
DROP INDEX `Pool_inviteCode_key` ON `Pool`;

-- AlterTable
ALTER TABLE `Pool` DROP COLUMN `inviteCode`;
