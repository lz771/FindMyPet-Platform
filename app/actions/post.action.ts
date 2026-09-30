"use server";

import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma'
import { createPostSchema } from '@/lib/validations/schemas';
import { auth } from "@clerk/nextjs/server"
import { Sex, Species } from '@/generated/prisma/enums';
import { revalidatePath } from 'next/cache';

export async function createPost(initialState: any, formData: FormData) {

    // Verify authentication
    const { isAuthenticated, userId } = await auth()
    if (!isAuthenticated) {
        throw new Error("Unauthenticated!");
    };

    const rawData = {
        petName: formData.get("petName") as string,
        species: formData.get("species") as Species,
        sex: formData.get("sex") as Sex,
        dateLastSeen: formData.get("dateLastSeen") as string,
        email: formData.get("email") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipcode: formData.get("zipcode") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as File,
    };


    const validatedFields = createPostSchema.safeParse(rawData);

    // Return if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Error: Fix input field errors before submitting",
            inputs: rawData,
        }
    }


    console.log(validatedFields);


    // Store form data to PostgreSQL database

    try {
        // Check if the clerk user id mapped to a user record in PosgreSQL database
        const dbUser = await prisma.user.findUnique({
            where: { clerkID: userId }
        })

        if (!dbUser) {
            console.log("Error: User not found in the database");
            return {
                errors: {},
                message: "Error: Something went wrong, please contact us for details",
                inputs: rawData,
            };
        }

        // Store post data
        const post = await prisma.post.create({
            data: {
                contactEmail: rawData.email,
                userID: dbUser.id,
            }
        })

        // Store location data (location data should be unique in the database)
        let location;
        const existedLocation = await prisma.location.findFirst({
            where: {
                city: rawData.city,
                state: rawData.state,
                zipcode: rawData.zipcode,
            }
        })

        if (!existedLocation) {
            location = await prisma.location.create({
                data: {
                    city: rawData.city,
                    state: rawData.state,
                    zipcode: rawData.zipcode,
                }
            }) 
        } else location = existedLocation;

        // Store pet data
        const dateLastSeen = new Date(`${rawData.dateLastSeen}T00:00:00.000Z`);
        const pet = await prisma.pet.create({
            data: {
                name: rawData.petName,
                species: rawData.species,
                sex: rawData.sex,
                dateLastSeen,
                description: rawData.description,
                postID: post.id,
                locationID: location.id,
            }
        })

        // Upload image to Cloudinary (Check if the user has uploaded a pet photo)
        const imgFile = rawData.image;

        if (imgFile && imgFile.size > 0) {
            const arrayBuffer = await imgFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // result has the secure_url and public_id for the image uploaded to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: "image", folder: "projectFolder" }, (error, results) => {
                    if (error) {
                        return reject(error);
                    } else {
                        resolve(results);
                    }
                }).end(buffer);
            })

            // Store image's secure_url and public_id as image data
            await prisma.image.create({
                data: {
                    cloudinaryImgID: (result as { public_id: string }).public_id,
                    imgUrl: (result as { secure_url: string }).secure_url,
                    petID: pet.id,
                }
            })
        } else {
            // The photo wasn't uploaded
            await prisma.image.create({
                data: {
                    cloudinaryImgID: "no Image ID",
                    petID: pet.id,
                }
            })
        }

        revalidatePath("/lost-pet-gallery");
        return {
            errors: {},
            message: "Form is submitted sccessfully. A corresponding Lost pet post is created and display on Lost Pet Gallery",
        }

    } catch (error) {
        console.error("Failed to create post:", error);
        return {
            error: "Failed to create post",
            message: "Error: Something went wrong, please try it later",
            inputs: rawData,
        };
    }
}




export async function updatePost(formData: FormData) {

}

// for search and filter posts in lost-pet gallery
export async function searchPost(formData: FormData) {

}