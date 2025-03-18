/*
  Warnings:

  - A unique constraint covering the columns `[type,isAvailableForBooking]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAvailableForBooking` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isAvailableForBooking" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_type_isAvailableForBooking_key" ON "vehicle"("type", "isAvailableForBooking");
