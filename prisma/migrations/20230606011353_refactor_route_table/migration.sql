/*
  Warnings:

  - You are about to drop the column `arrival_time` on the `TB_ROUTES` table. All the data in the column will be lost.
  - You are about to drop the column `departure_time` on the `TB_ROUTES` table. All the data in the column will be lost.
  - Added the required column `arrival_date` to the `TB_ROUTES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_date` to the `TB_ROUTES` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TB_ROUTES" DROP COLUMN "arrival_time",
DROP COLUMN "departure_time",
ADD COLUMN     "arrival_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departure_date" TIMESTAMP(3) NOT NULL;
