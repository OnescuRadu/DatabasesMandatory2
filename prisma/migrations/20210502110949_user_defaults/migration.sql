-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('User', 'Manager', 'Admin') NOT NULL DEFAULT 'User',
    MODIFY `verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;
