"use server";

import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma'
import { createPostSchema } from '@/lib/validations/schemas';
import { auth } from "@clerk/nextjs/server"
import { Sex, Species } from '@/generated/prisma/enums';
import { revalidatePath } from 'next/cache';
import { heapSort } from '@/lib/heapSort';
import { Post } from '@/components/web/PostCard';

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
            };
        }

        // Users can create a maximum of five posts
        const posts = await prisma.post.findMany({
            where: { userID: dbUser.id }
        })

        if (posts.length > 5) {
            return {
                errors: {},
                message: "Sorry, you can create at most five posts in the FindMyPet Platform",
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
        const dateLastSeen = new Date(rawData.dateLastSeen);
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
        };
    }
}

export async function fetchPostsByClerkId(clerkID: string): Promise<{ posts: Post[], username: string }> {

    // Fetch user information from database based on their clerk id
    const dbUser = await prisma.user.findUnique({
        where: { clerkID },
    });
    
    if (!dbUser) throw new Error("User not found in the database");

    // Fetch all posts created by the user
    const posts = await prisma.post.findMany({
        where: { userID: dbUser.id },
        select: {
            id: true,
            createdAt: true,
            lastModifiedAt: true,
            pet: {
                select: {
                    id: true,
                    name: true,
                    sex: true,
                    species: true,
                    dateLastSeen: true,
                    status: true,

                    location: {
                        select: {
                            city: true,
                            state: true,
                            zipcode: true,
                        },
                    },

                    image: {
                        select: {
                            imgUrl: true,
                            imgAltText: true,
                        }
                    },
                },
            },
        },
    });

    heapSort(posts, "createdAt"); // Sort posts

    return { posts, username: dbUser.username };
}

export async function deletePost(postID: number) {
    
    // Verify authentication
    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated) throw new Error("Unauthenticated!");

    // Check if the clerk id has a mapped user in the database
    const dbUser = await prisma.user.findUnique({
        where: { clerkID: userId },
    });
    if (!dbUser) throw new Error("User not found in the database");

    // Check if the post belongs to the user
    const post = await prisma.post.findFirst({
        where: { userID: dbUser.id,},
    }); 
    if (!post) throw new Error("Sorry, this post is not yours. You can only delete your own posts.");

    // Delete the post
    await prisma.post.delete({
        where: { id: postID},
    })
}

export async function updatePost(formData: FormData) {

}

// search and filter posts in lost-pet gallery(need change)
export async function searchPost(formData: FormData) {

}