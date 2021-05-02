-- AlterTable
ALTER TABLE `Address` MODIFY `floor` VARCHAR(191),
    MODIFY `door` VARCHAR(191);

-- AlterTable
ALTER TABLE `PersonalData` MODIFY `phoneNumber` VARCHAR(191),
    MODIFY `addressId` INTEGER;

-- AlterTable
ALTER TABLE `Product` MODIFY `descriptionId` INTEGER;

-- AlterTable
ALTER TABLE `ProductRating` MODIFY `review` VARCHAR(191);

-- AlterTable
ALTER TABLE `SellerToProducts` MODIFY `salePrice` INTEGER;

-- CreateTable
CREATE TABLE `PriceHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `oldPrice` INTEGER NOT NULL,
    `newPrice` INTEGER NOT NULL,
    `oldSalePrice` INTEGER NOT NULL,
    `newSalePrice` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PriceHistory` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
