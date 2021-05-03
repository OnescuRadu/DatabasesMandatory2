-- AlterTable
ALTER TABLE `Category` MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Seller` ADD COLUMN     `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `SellerToProducts` MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;
