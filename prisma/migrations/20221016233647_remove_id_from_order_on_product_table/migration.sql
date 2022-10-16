/*
  Warnings:

  - The primary key for the `OrderOnProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderOnProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderOnProduct" DROP CONSTRAINT "OrderOnProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrderOnProduct_pkey" PRIMARY KEY ("orderId", "productId");
