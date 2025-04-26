-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "backgroundCircleImage" TEXT,
ADD COLUMN     "manufacturingDescription" JSONB,
ADD COLUMN     "manufacturingSubtitle" JSONB,
ADD COLUMN     "manufacturingTitle" JSONB,
ADD COLUMN     "technicalDescription" JSONB,
ADD COLUMN     "technicalSubtitle" JSONB,
ADD COLUMN     "technicalTitle" JSONB;
