-- AlterTable
ALTER TABLE "TB_ROUTES" ALTER COLUMN "duration_estimated" SET DATA TYPE TEXT,
ALTER COLUMN "departure_time" DROP DEFAULT;
