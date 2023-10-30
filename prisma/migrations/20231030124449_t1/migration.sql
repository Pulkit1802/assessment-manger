-- CreateTable
CREATE TABLE "attainments" (
    "id" TEXT NOT NULL,
    "reqPercentage" DOUBLE PRECISION NOT NULL,
    "attainmentValue" DOUBLE PRECISION NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "attainments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attainments" ADD CONSTRAINT "attainments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
