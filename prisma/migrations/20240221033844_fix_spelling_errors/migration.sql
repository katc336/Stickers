/*
  Warnings:

  - You are about to drop the column `combineObjectiveId` on the `LearningObjective` table. All the data in the column will be lost.
  - You are about to drop the column `combineObjectiveId` on the `StudentProgress` table. All the data in the column will be lost.
  - Added the required column `combinedObjectiveId` to the `LearningObjective` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combinedObjectiveId` to the `StudentProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LearningObjective" DROP CONSTRAINT "LearningObjective_combineObjectiveId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgress" DROP CONSTRAINT "StudentProgress_combineObjectiveId_fkey";

-- AlterTable
ALTER TABLE "LearningObjective" DROP COLUMN "combineObjectiveId",
ADD COLUMN     "combinedObjectiveId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProgress" DROP COLUMN "combineObjectiveId",
ADD COLUMN     "combinedObjectiveId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LearningObjective" ADD CONSTRAINT "LearningObjective_combinedObjectiveId_fkey" FOREIGN KEY ("combinedObjectiveId") REFERENCES "CombinedObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_combinedObjectiveId_fkey" FOREIGN KEY ("combinedObjectiveId") REFERENCES "CombinedObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
