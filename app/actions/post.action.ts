"use server";

import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma'
import { createPostSchema, editPostSchema } from '@/lib/validations/schemas';
import { auth } from "@clerk/nextjs/server"
import { Sex, Species, Status } from '@/generated/prisma/enums';
import { revalidatePath } from 'next/cache';
import { heapSort } from '@/lib/heapSort';
import { Post } from '@/components/web/PostCard';
import { PostDetails } from '@/components/web/PostDetailsCard';
import { getAuthenticatedUser } from './user.action';

export async function createPost(initialState: any, formData: FormData) {
    // Verify authentication
    const dbUser = await getAuthenticatedUser();

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
            message: "Please fill out the form correctly before submitting",
            success: false,
        }
    }

    const posts = await prisma.post.findMany({
        where: { userID: dbUser.id }
    })

    // Users can create a maximum of five posts
    if (posts.length >= 5) {
        return {
            errors: {},
            message: "Sorry, you can create at most five posts in the FindMyPet Platform",
            success: false,
        };
    }

    // Used to check whether the submitted location already exists in the datebase
    let location;
    const existingLocation = await prisma.location.findFirst({
        where: {
            city: rawData.city.trim(),
            state: rawData.state,
            zipcode: rawData.zipcode,
        }
    })

    // Store form data to database
    try {
        await prisma.$transaction(async (tx) => {
            // Store post data
            const post = await tx.post.create({
                data: {
                    contactEmail: rawData.email.trim(),
                    userID: dbUser.id,
                }
            })

            // Store location data
            if (!existingLocation) {
                location = await tx.location.create({
                    data: {
                        city: rawData.city.trim(),
                        state: rawData.state,
                        zipcode: rawData.zipcode,
                    }
                })
            } else location = existingLocation;

            // Store pet data
            const dateLastSeen = new Date(rawData.dateLastSeen);
            const pet = await tx.pet.create({
                data: {
                    name: rawData.petName.trim(),
                    species: rawData.species,
                    sex: rawData.sex,
                    dateLastSeen,
                    description: rawData.description,
                    postID: post.id,
                    locationID: location.id,
                }
            })

            // Upload image to Cloudinary 
            const imgFile = rawData.image;

            if (imgFile && imgFile.size > 0) { // Upload image if the user has selected a pet photo
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
                await tx.image.create({
                    data: {
                        cloudinaryImgID: (result as { public_id: string }).public_id,
                        imgUrl: (result as { secure_url: string }).secure_url,
                        petID: pet.id,
                    }
                })
            } else {
                await tx.image.create({
                    data: { petID: pet.id, }
                })
            }
        })

        revalidatePath("/lost-pet-gallery");
        return {
            errors: {},
            message: "A corresponding lost-pet post is created and displayed in Lost Pet Gallery",
            success: true,
        }
    } catch (error) {
        console.log("Failed to create post:", error);
        return {
            errors: {},
            message: "Failed to create post, please try it later",
            success: false,
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

export async function fetchPostByClerkAndPostIds(clerkID: string, id: number): Promise<{ post: PostDetails }> {
    // Fetch the matching db user by Clerk ID
    const dbUser = await prisma.user.findUnique({
        where: { clerkID },
    });
    if (!dbUser) throw new Error("User not found in the database");

    // Fetch the matching post by user id and post id
    const post = await prisma.post.findUnique({
        where: {
            id,
            userID: dbUser.id
        },
        select: {
            id: true,
            contactEmail: true,
            pet: {
                select: {
                    id: true,
                    name: true,
                    sex: true,
                    species: true,
                    dateLastSeen: true,
                    status: true,
                    description: true,

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
    if (!post) throw new Error(`No post found for Clerk ID ${clerkID} and post ID ${id}`);

    return { post };
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
        where: { userID: dbUser.id, },
    });
    if (!post) throw new Error("Sorry, this post is not yours. You can only delete your own posts.");

    // Delete the post
    await prisma.post.delete({
        where: { id: postID },
    })
}

export async function updatePost(initialState: any, formData: FormData) {
    let updateResult;
    try {
        // Verify authentication
        const { isAuthenticated, userId } = await auth();
        if (!isAuthenticated) throw new Error("Unauthenticated!");

        // Get form data
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
            status: formData.get("status") as Status,
        };
        const postID = Number(formData.get("postID"));

        const validatedFields = editPostSchema.safeParse(rawData);

        // Return if the form data is invalid
        if (!validatedFields.success) {
            console.log("Invalid form data");
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Please fix the input field errors before submitting again.",
            }
        }

        // Check if the clerk user id is mapped to a user record in database
        const dbUser = await prisma.user.findUnique({
            where: { clerkID: userId },
        });
        if (!dbUser) throw new Error("User not found in the database");

        // Check if the post belongs to the db user
        const post = await prisma.post.findFirst({
            where: {
                id: postID,
                userID: dbUser.id,
            },
        });
        if (!post) throw new Error("Sorry, this post is not yours. You can only update your own posts.");

        // Update Process
        const imgFile = rawData.image;
        const isImageUploaded = imgFile && imgFile.size > 0;
        let imgUrl: string, cloudinaryImgID: string;

        // 1. Upload pet photo to Cloudinary
        if (isImageUploaded) {
            const arrayBuffer = await imgFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: "image", folder: "projectFolder" }, (error, results) => {
                    if (error) {
                        return reject(error);
                    } else {
                        resolve(results);
                    }
                }).end(buffer);
            })

            cloudinaryImgID = (result as { public_id: string }).public_id;
            imgUrl = (result as { secure_url: string }).secure_url;
        }

        // 2. Update the post, location, pet, image records in the database
        updateResult = await prisma.$transaction(async (tx) => {
            // Update post record
            const updatePost = await tx.post.update({
                where: { id: post.id },
                data: {
                    contactEmail: rawData.email,
                    lastModifiedAt: new Date(),
                },
            });

            // Update location record
            let location;
            const existedLocation = await tx.location.findFirst({
                where: {
                    city: rawData.city,
                    state: rawData.state,
                    zipcode: rawData.zipcode,
                }
            })

            if (!existedLocation) {
                location = await tx.location.create({
                    data: {
                        city: rawData.city,
                        state: rawData.state,
                        zipcode: rawData.zipcode,
                    }
                })
            } else location = existedLocation;

            // Update pet record
            const dateLastSeen = new Date(rawData.dateLastSeen);
            const updatePet = await tx.pet.update({
                where: { postID: updatePost.id },
                data: {
                    name: rawData.petName,
                    species: rawData.species,
                    status: rawData.status,
                    sex: rawData.sex,
                    dateLastSeen,
                    description: rawData.description,
                    locationID: location.id,
                },
            });

            // Update image record
            let oldCloudinaryImgID;
            if (isImageUploaded) {
                // Get the old image's public id so it can be deleted from Cloudinary
                const oldImage = await tx.image.findFirst({
                    where: { petID: updatePet.id }
                });
                oldCloudinaryImgID = oldImage?.cloudinaryImgID;

                await tx.image.update({
                    where: { petID: updatePet.id },
                    data: {
                        cloudinaryImgID,
                        imgUrl,
                    },
                });
            }
            return { oldCloudinaryImgID };
        });

        // 3. If the user previously uploaded a pet photo before and now updates it, delete the old one from Cloudinary
        if (updateResult?.oldCloudinaryImgID) {
            await cloudinary.uploader
                .destroy(updateResult.oldCloudinaryImgID)
                .then(result => console.log(`Image deletion result: ${result}`));
        }

        console.log(`Post successfully updated`);

        return {
            success: true,
            errors: {},
            message: "Updates have been saved. Redirecting to dashboard...",
        }

    } catch (error) {
        console.log("Failed to update post information: ", error);

        // Delete the newly uploaded image from Cloudinary
        if (updateResult?.oldCloudinaryImgID) {
            await cloudinary.uploader
                .destroy(updateResult.oldCloudinaryImgID)
                .then(result => console.log(result));
        }

        return {
            success: false,
            errors: {},
            message: "Failed to update post information. Please try again later.",
        }
    }
}

// search and filter posts in lost-pet gallery(need change)
export async function searchPost(formData: FormData) {

}