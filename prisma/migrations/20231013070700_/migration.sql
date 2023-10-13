/*
  Warnings:

  - You are about to drop the column `type` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `dept` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,facultyId,programId,batch,semester]` on the table `section` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facultyId` to the `section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faId` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_userId_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_userId_fkey";

-- DropIndex
DROP INDEX "section_courseId_userId_key";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "marking" ALTER COLUMN "totalMarksObtained" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "questionMarking" ALTER COLUMN "marksObtained" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "section" DROP COLUMN "userId",
ADD COLUMN     "facultyId" TEXT NOT NULL,
ADD COLUMN     "programId" TEXT;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "userId",
ADD COLUMN     "faId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dept_name_key" ON "dept"("name");

-- CreateIndex
CREATE UNIQUE INDEX "section_courseId_facultyId_programId_batch_semester_key" ON "section"("courseId", "facultyId", "programId", "batch", "semester");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_faId_fkey" FOREIGN KEY ("faId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
