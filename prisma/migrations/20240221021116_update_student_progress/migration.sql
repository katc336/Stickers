/*
  Warnings:

  - Added the required column `combineObjectiveId` to the `LearningObjective` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineObjectiveId` to the `StudentProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LearningObjective" ADD COLUMN     "combineObjectiveId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProgress" ADD COLUMN     "combineObjectiveId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CombinedObjective" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "CombinedObjective_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LearningObjective" ADD CONSTRAINT "LearningObjective_combineObjectiveId_fkey" FOREIGN KEY ("combineObjectiveId") REFERENCES "CombinedObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_combineObjectiveId_fkey" FOREIGN KEY ("combineObjectiveId") REFERENCES "CombinedObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
