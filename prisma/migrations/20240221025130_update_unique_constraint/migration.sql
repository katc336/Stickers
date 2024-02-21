/*
  Warnings:

  - A unique constraint covering the columns `[objectiveName]` on the table `CombinedObjective` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CombinedObjective_objectiveName_key" ON "CombinedObjective"("objectiveName");
