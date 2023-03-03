/*
  Warnings:

  - You are about to drop the column `avatar` on the `Player` table. All the data in the column will be lost.
  - Added the required column `description` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;
