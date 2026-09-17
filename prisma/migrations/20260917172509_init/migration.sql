-- CreateEnum
CREATE TYPE "Species" AS ENUM ('Cat', 'Dog', 'Bird', 'Other');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female', 'Unknown');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Lost', 'Reunited');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "clerkID" TEXT,
    "city" VARCHAR(100),
    "username" VARCHAR(100) NOT NULL DEFAULT 'Unknown User',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "contact_email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_at" TIMESTAMP(3) NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "lost_pets" (
    "lost_pet_id" SERIAL NOT NULL,
    "petName" VARCHAR(100) NOT NULL,
    "species" "Species" NOT NULL,
    "sex" "Sex" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Lost',
    "date_last_seen" DATE NOT NULL,
    "description" VARCHAR(500) DEFAULT 'None',
    "postID" INTEGER NOT NULL,
    "locationID" INTEGER NOT NULL,

    CONSTRAINT "lost_pets_pkey" PRIMARY KEY ("lost_pet_id")
);

-- CreateTable
CREATE TABLE "images" (
    "imageID" SERIAL NOT NULL,
    "cloudinary_img_id" TEXT,
    "img_url" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/l0ozosb1/image/upload/v1789613502/no_image.avif',
    "img_alt_text" TEXT NOT NULL DEFAULT 'A lost-pet image',
    "petID" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("imageID")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "zipcode" VARCHAR(100) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkID_key" ON "users"("clerkID");

-- CreateIndex
CREATE INDEX "posts_userID_idx" ON "posts"("userID");

-- CreateIndex
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at");

-- CreateIndex
CREATE INDEX "posts_last_modified_at_idx" ON "posts"("last_modified_at");

-- CreateIndex
CREATE UNIQUE INDEX "lost_pets_postID_key" ON "lost_pets"("postID");

-- CreateIndex
CREATE INDEX "lost_pets_locationID_idx" ON "lost_pets"("locationID");

-- CreateIndex
CREATE INDEX "lost_pets_petName_idx" ON "lost_pets"("petName");

-- CreateIndex
CREATE UNIQUE INDEX "images_petID_key" ON "images"("petID");

-- CreateIndex
CREATE INDEX "locations_city_idx" ON "locations"("city");

-- CreateIndex
CREATE INDEX "locations_state_idx" ON "locations"("state");

-- CreateIndex
CREATE INDEX "locations_zipcode_idx" ON "locations"("zipcode");

-- CreateIndex
CREATE UNIQUE INDEX "locations_city_state_zipcode_key" ON "locations"("city", "state", "zipcode");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lost_pets" ADD CONSTRAINT "lost_pets_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lost_pets" ADD CONSTRAINT "lost_pets_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_petID_fkey" FOREIGN KEY ("petID") REFERENCES "lost_pets"("lost_pet_id") ON DELETE CASCADE ON UPDATE CASCADE;
