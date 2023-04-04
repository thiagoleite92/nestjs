/*
  Warnings:

  - The `flight_status` column on the `TB_FLIGHTS` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('BOOKED', 'CANCELED', 'DONE');

-- AlterTable
ALTER TABLE "TB_FLIGHTS" DROP COLUMN "flight_status",
ADD COLUMN     "flight_status" "FlightStatus" NOT NULL DEFAULT 'BOOKED';

-- DropEnum
DROP TYPE "FlighStatus";
