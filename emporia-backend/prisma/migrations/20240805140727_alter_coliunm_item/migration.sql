/*
  Warnings:

  - You are about to alter the column `valor` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "valor" SET DATA TYPE DOUBLE PRECISION;
