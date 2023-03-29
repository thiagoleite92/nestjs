/*
  Warnings:

  - You are about to drop the column `CNP` on the `TB_PILOTS` table. All the data in the column will be lost.
  - Added the required column `flight_exp` to the `TB_PILOTS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TB_PILOTS" DROP COLUMN "CNP",
ADD COLUMN     "flight_exp" TEXT NOT NULL;
