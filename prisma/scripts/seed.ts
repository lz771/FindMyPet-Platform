import { prisma } from "@/lib/prisma";

async function main() {

    // Fetch data from "Lost Animal" API
    const response = await fetch("https://data.kingcounty.gov/resource/4f2m-6nv7.json?$query=SELECT%0A%20%20%60impound_no%60%2C%0A%20%20%60animal_name%60%2C%0A%20%20%60animal_type%60%2C%0A%20%20%60animal_gender%60%2C%0A%20%20%60date%60%2C%0A%20%20%60obfuscated_address%60%2C%0A%20%20%60city%60%2C%0A%20%20%60state%60%2C%0A%20%20%60zip%60%2C%0A%20%20%60image%60%2C%0A%20%20%60image_alt_text%60%2C%0A%20%20%60memo%60");

    if (!response.ok) {
        throw new Error("Error: Failed to fetch data from API");
    }

    const lostPets = await response.json();

    for (const lostPet of lostPets) {
        // Get lost pet values
        const impoundNo = lostPet.impound_no;
        const contactEmail = "sampleEmail@findMyPet.com";
        const userId = 4; // Sample user ID
        const city = lostPet.city?.trim() || "Unknown";
        const state = "WA";
        const zipcode = lostPet.zip?.trim() || "Unknown";
        const name = lostPet.animal_name?.trim() || "Unknown";
        const species = ["Cat", "Dog", "Bird"].includes(lostPet.animal_type?.trim()) ? lostPet.animal_type?.trim() : "Other";
        const sex = lostPet.animal_gender?.trim();
        const dateLastSeen = new Date(lostPet.date);
        const imgUrl = lostPet.image?.url?.trim() || undefined;
        const imgAltText = lostPet.image_alt_text?.trim() || undefined;
        const getDescription = lostPet.memo?.match(/Description:\s*(.*?)<\/p>/i);
        const description = getDescription?.[1]?.trim() || undefined;

        // Import data into database
        try {
            await prisma.$transaction(async (tx) => {

                // Create Post
                const post = await tx.post.create({
                    data: {
                        contactEmail,
                        userID: userId,
                    }
                })


                let location, existedLocation;
                // If city is not provided, look for a location with same zipcode
                if (city === "Unknown" && zipcode !== "Unknown") {
                    existedLocation = await tx.location.findFirst({
                        where: {
                            zipcode,
                        }
                    })
                } else {
                    // Look for a location data in database same as the current location data
                    existedLocation = await tx.location.findFirst({
                        where: {
                            city,
                            state,
                            zipcode,
                        }
                    })
                }

                // Create location if no location data found in database; Otherwise, use the existing one
                if (!existedLocation) {
                    location = await tx.location.create({
                        data: {
                            city,
                            state,
                            zipcode,
                        }
                    })
                } else location = existedLocation;

                // Create Pet (postID, locationID)
                const pet = await tx.pet.create({
                    data: {
                        name,
                        species,
                        sex,
                        dateLastSeen,
                        postID: post.id,
                        locationID: location.id,
                        description,
                    }
                })

                // Create Image (petID)
                await tx.image.create({
                    data: {
                        imgUrl,
                        imgAltText,
                        petID: pet.id,
                    }
                })
            })
        } catch (error) {
            console.error(`Error: Failed to store data ${impoundNo} into database: `, error);
        }
    }
    console.log("Completed to load data into database");
}

main()
    .catch(error => {
        console.log(error);
    }).finally(() => {
        prisma.$disconnect();
    });