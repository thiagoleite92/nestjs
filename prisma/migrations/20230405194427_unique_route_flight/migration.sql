/*
  Warnings:

  - A unique constraint covering the columns `[route_id]` on the table `TB_FLIGHTS` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TB_FLIGHTS_route_id_key" ON "TB_FLIGHTS"("route_id");
