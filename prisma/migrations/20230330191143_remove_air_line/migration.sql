/*
  Warnings:

  - You are about to drop the `TB_AIRLINES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TB_FLIGHTS_AIRLINES` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TB_FLIGHTS_AIRLINES" DROP CONSTRAINT "TB_FLIGHTS_AIRLINES_airline_id_fkey";

-- DropForeignKey
ALTER TABLE "TB_FLIGHTS_AIRLINES" DROP CONSTRAINT "TB_FLIGHTS_AIRLINES_flight_id_fkey";

-- DropTable
DROP TABLE "TB_AIRLINES";

-- DropTable
DROP TABLE "TB_FLIGHTS_AIRLINES";
