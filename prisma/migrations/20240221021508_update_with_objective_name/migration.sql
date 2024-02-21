/*
  Warnings:

  - Added the required column `objectiveName` to the `CombinedObjective` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CombinedObjective" ADD COLUMN     "objectiveName" TEXT NOT NULL;
