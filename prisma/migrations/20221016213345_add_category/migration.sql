/*
  Warnings:

  - Added the required column `categroyId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categroyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Categroy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categroy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categroyId_fkey" FOREIGN KEY ("categroyId") REFERENCES "Categroy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
