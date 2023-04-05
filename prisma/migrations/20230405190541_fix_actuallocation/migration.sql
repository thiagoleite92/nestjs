/*
  Warnings:

  - You are about to drop the column `actuaLocation` on the `TB_USERS` table. All the data in the column will be lost.
  - Made the column `arrival_time` on table `TB_ROUTES` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TB_ROUTES" ALTER COLUMN "arrival_time" SET NOT NULL,
ALTER COLUMN "arrival_time" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TB_USERS" DROP COLUMN "actuaLocation",
ADD COLUMN     "actualLocation" TEXT;
