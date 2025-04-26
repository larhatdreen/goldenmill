-- AlterTable
ALTER TABLE "Product" 
ALTER COLUMN "application" SET DATA TYPE TEXT[] USING ARRAY[application],
ALTER COLUMN "granulation" SET DATA TYPE TEXT[] USING ARRAY[granulation],
ALTER COLUMN "type" SET DATA TYPE TEXT[] USING ARRAY[type]; 