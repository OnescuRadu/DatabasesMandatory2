/*
  Warnings:

  - Added the required column `url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductImage` ADD COLUMN     `url` VARCHAR(191) NOT NULL;
