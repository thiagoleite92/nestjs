/*
  Warnings:

  - Made the column `isAvailable` on table `TB_ROUTES` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TB_ROUTES" ALTER COLUMN "isAvailable" SET NOT NULL;
