import { prisma } from "@/lib/prisma";

// Update post creation time to date last seen
async function updateCreatedTime() {

    // Fetch all pet data
    const pets = await prisma.pet.findMany({
        where: {},
        select: {
            dateLastSeen: true,
            postID: true,
        },
    })

    // Fetch all post data
    const posts = await prisma.post.findMany({
        where: {},
        select: {
            id: true,
        },
    })

    let idx = 0;
    for (const post of posts) { // Loop for every post
        const pet = pets[idx];

        // Check which post has the pet
        const matchedPost = await prisma.post.findFirst({
            where: { id: pet.postID },
        })

        // No matched post 
        if (!matchedPost) {
            console.log(`No matched post found for pet ${pet.postID}`);
            break;
        }

        // Has a matched post: update post creation time to pet's date last seen
        try {
            const result = await prisma.post.update({
                where: { id: matchedPost.id },
                data: {
                    createdAt: pet.dateLastSeen,
                },
            });

            idx++;
            console.log(`${idx}: Updated post ${result.id} successfully`);
        } catch (error) {
            console.error(`Error: Failed to update post ${matchedPost.id}: `, error);
        }
    }
}

updateCreatedTime()
    .catch(error => {
        console.log(error);
    }).finally(() => {
        prisma.$disconnect();
    });