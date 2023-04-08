/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TB_FLIGHTS` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TB_FLIGHTS` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TB_ROUTES` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TB_ROUTES` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TB_USERS` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TB_USERS` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TB_FLIGHTS" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TB_ROUTES" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TB_USERS" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);
