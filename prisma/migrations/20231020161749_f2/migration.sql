/*
  Warnings:

  - You are about to drop the column `studentsFailed` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `studentsPassed` on the `report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deptId,name]` on the table `program` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentsAboveRequiredPercentage` to the `questionReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coAttainmentLevel` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questionReport" ADD COLUMN     "studentsAboveRequiredPercentage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "studentsFailed",
DROP COLUMN "studentsPassed",
ADD COLUMN     "coAttainmentLevel" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "studentsAboveRequiredPercentage" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "program_deptId_name_key" ON "program"("deptId", "name");
