/*
  Warnings:

  - You are about to drop the column `deptId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cordinatorId` to the `program` table without a default value. This is not possible if the table is not empty.
  - Made the column `programId` on table `section` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `markUploadDeadline` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_deptId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_programId_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_courseId_fkey";

-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_programId_fkey";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "deptId",
DROP COLUMN "programId",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "program" ADD COLUMN     "cordinatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "report" ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "section" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "programId" SET NOT NULL;

-- AlterTable
ALTER TABLE "test" ADD COLUMN     "markUploadDeadline" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_CoursesOfferedInProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesOfferedInProgram_AB_unique" ON "_CoursesOfferedInProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesOfferedInProgram_B_index" ON "_CoursesOfferedInProgram"("B");

-- CreateIndex
CREATE UNIQUE INDEX "course_code_key" ON "course"("code");

-- AddForeignKey
ALTER TABLE "program" ADD CONSTRAINT "program_cordinatorId_fkey" FOREIGN KEY ("cordinatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesOfferedInProgram" ADD CONSTRAINT "_CoursesOfferedInProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesOfferedInProgram" ADD CONSTRAINT "_CoursesOfferedInProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
