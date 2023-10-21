/*
  Warnings:

  - A unique constraint covering the columns `[name,testId]` on the table `part` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,partId]` on the table `question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId,markingId,partId]` on the table `questionMarking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,courseId]` on the table `test` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "questionMarking_questionId_markingId_key";

-- CreateIndex
CREATE UNIQUE INDEX "part_name_testId_key" ON "part"("name", "testId");

-- CreateIndex
CREATE UNIQUE INDEX "question_name_partId_key" ON "question"("name", "partId");

-- CreateIndex
CREATE UNIQUE INDEX "questionMarking_questionId_markingId_partId_key" ON "questionMarking"("questionId", "markingId", "partId");

-- CreateIndex
CREATE UNIQUE INDEX "test_name_courseId_key" ON "test"("name", "courseId");
