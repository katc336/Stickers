/*
  Warnings:

  - You are about to drop the column `studentCode` on the `Parent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentCode]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentCode` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "studentCode",
ADD COLUMN     "parentCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "parentCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_parentCode_key" ON "Student"("parentCode");
