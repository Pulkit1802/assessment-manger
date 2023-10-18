/*
  Warnings:

  - Added the required column `partId` to the `questionMarking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalParts` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questionMarking" ADD COLUMN     "partId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "test" ADD COLUMN     "totalParts" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "questionMarking" ADD CONSTRAINT "questionMarking_partId_fkey" FOREIGN KEY ("partId") REFERENCES "part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
