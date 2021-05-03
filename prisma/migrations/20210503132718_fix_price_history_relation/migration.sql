/*
  Warnings:

  - You are about to drop the column `productId` on the `PriceHistory` table. All the data in the column will be lost.
  - Added the required column `sellerProductId` to the `PriceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PriceHistory` DROP FOREIGN KEY `PriceHistory_ibfk_1`;

-- AlterTable
ALTER TABLE `PriceHistory` DROP COLUMN `productId`,
    ADD COLUMN     `sellerProductId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `approved` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `PriceHistory` ADD FOREIGN KEY (`sellerProductId`) REFERENCES `SellerToProducts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
