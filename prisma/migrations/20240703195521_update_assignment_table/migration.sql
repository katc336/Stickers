/*
  Warnings:

  - You are about to drop the column `objectivetId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentCode]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentCode]` on the table `StudentAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lessonId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectiveId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Made the column `studentCode` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `content` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_objectivetId_fkey";

-- DropIndex
DROP INDEX "Student_username_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "objectivetId",
ADD COLUMN     "dueDate" TEXT,
ADD COLUMN     "lessonId" INTEGER NOT NULL,
ADD COLUMN     "objectiveId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "password",
DROP COLUMN "username",
ALTER COLUMN "studentCode" SET NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "task",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Parent_parentCode_key" ON "Parent"("parentCode");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAccount_studentCode_key" ON "StudentAccount"("studentCode");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "LearningObjective"("id") ON DELETE CASCADE ON UPDATE CASCADE;
