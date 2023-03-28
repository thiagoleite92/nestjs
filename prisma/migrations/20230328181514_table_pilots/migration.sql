/*
  Warnings:

  - The values [PILOT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `user_id` to the `TB_FLIGHTS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'CLIENT');
ALTER TABLE "TB_USERS" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "TB_USERS" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "TB_USERS" ALTER COLUMN "role" SET DEFAULT 'CLIENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "TB_FLIGHTS" DROP CONSTRAINT "TB_FLIGHTS_pilot_id_fkey";

-- AlterTable
ALTER TABLE "TB_FLIGHTS" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TB_PILOTS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "CNP" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TB_PILOTS_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TB_FLIGHTS" ADD CONSTRAINT "TB_FLIGHTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "TB_USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TB_FLIGHTS" ADD CONSTRAINT "TB_FLIGHTS_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "TB_PILOTS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
