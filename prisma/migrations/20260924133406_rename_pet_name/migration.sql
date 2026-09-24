/*
  Warnings:

  - You are about to drop the column `petName` on the `lost_pets` table. All the data in the column will be lost.
  - Made the column `cloudinary_img_id` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `lost_pets` table without a default value. This is not possible if the table is not empty.
  - Made the column `clerkID` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "lost_pets_petName_idx";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "cloudinary_img_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "lost_pets" DROP COLUMN "petName",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "clerkID" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE INDEX "lost_pets_name_idx" ON "lost_pets"("name");
