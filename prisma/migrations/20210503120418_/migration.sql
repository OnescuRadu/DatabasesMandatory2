/*
  Warnings:

  - A unique constraint covering the columns `[cvr]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Seller.cvr_unique` ON `Seller`(`cvr`);
