-- AlterTable
ALTER TABLE "lost_pets" ALTER COLUMN "description" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "username" DROP DEFAULT;
