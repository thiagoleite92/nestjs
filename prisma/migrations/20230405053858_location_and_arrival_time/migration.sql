/*
  Warnings:

  - You are about to drop the column `departure_date` on the `TB_ROUTES` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TB_ROUTES" DROP COLUMN "departure_date",
ADD COLUMN     "arrival_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departure_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TB_USERS" ADD COLUMN     "actuaLocation" TEXT;
