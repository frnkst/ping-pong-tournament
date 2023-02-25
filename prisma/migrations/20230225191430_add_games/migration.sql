/*
  Warnings:

  - You are about to drop the column `playerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tournamentId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player1Id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player2Id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `player1Id` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2Id` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scorePlayer1` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scorePlayer2` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "playerId",
DROP COLUMN "score",
ADD COLUMN     "player1Id" TEXT NOT NULL,
ADD COLUMN     "player2Id" TEXT NOT NULL,
ADD COLUMN     "scorePlayer1" INTEGER NOT NULL,
ADD COLUMN     "scorePlayer2" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_tournamentId_key" ON "Game"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_player1Id_key" ON "Game"("player1Id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_player2Id_key" ON "Game"("player2Id");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
