/*
  Warnings:

  - The `granulation` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "granulation",
ADD COLUMN     "granulation" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "type",
ADD COLUMN     "type" TEXT[] DEFAULT ARRAY[]::TEXT[];
