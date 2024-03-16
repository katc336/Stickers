/*
  Warnings:

  - You are about to drop the column `code` on the `Parent` table. All the data in the column will be lost.
  - Added the required column `studentCode` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Parent_code_key";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "code",
ADD COLUMN     "studentCode" TEXT NOT NULL;
