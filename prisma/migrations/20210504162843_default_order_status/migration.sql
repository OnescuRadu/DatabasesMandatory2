-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('Pending', 'Confirmed', 'Sent', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending';
