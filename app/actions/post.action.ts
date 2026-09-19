"use server";

import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma'

export async function createPost(formData: FormData) {
    const imgFile = formData.get("image") as File;

    // upload image to Cloudinary
    if (imgFile) {
        const arrayBuffer = await imgFile.arrayBuffer(); //change the file to arrayBuffer
        const buffer = Buffer.from(arrayBuffer); // Convert it into Node.js Buffer, so that we can use Cloudinary upload stream to upload image to Cloudinary

         // result has the secure_url for image uploaded to Cloudinary, and public_id for that image in Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "image", folder: "projectFolder" }, (error, results) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(results);
                }
            }).end(buffer);
        })
    }
}




export async function updatePost(formData: FormData) {

}

// for search and filter posts in lost-pet gallery
export async function searchPost(formData: FormData) {

}