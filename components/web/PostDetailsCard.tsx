import Image from "next/image";
import { CollapsibleContent, Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Sex, Species, Status } from "@/generated/prisma/enums";

export interface PostDetails {
    contactEmail: string;
    pet: {
        id: number;
        name: string;
        sex: Sex;
        species: Species;
        dateLastSeen: Date;
        status: Status;
        description: string | null;

        location: {
            city: string;
            state: string;
            zipcode: string;
        };

        image: {
            imgUrl: string;
            imgAltText: string;
        } | null;
    } | null;
}

// Used to display post details on the Post Details Page
export default function PostDetailsCard({ pet, contactEmail }: PostDetails) {

    const date = pet?.dateLastSeen.toLocaleDateString();
    const details = [
        { label: "Status: ", value: pet?.status },
        { label: "Date Last Seen: ", value: date },
        { label: "Location Last Seen: ", value: `${pet?.location.city}, ${pet?.location.state} ${pet?.location.zipcode}` },
        { label: "Pet Name: ", value: pet?.name },
        { label: "Pet ID: ", value: pet?.id },
        { label: "Species: ", value: pet?.species },
    ]

    return (
        <div className="grid grid-row-2 w-full max-w-6xl mx-auto text-base lg:text-2xl tracking-wider font-bold text-nowrap">
            <div className="flex flex-col md:flex-row bg-white rounded-md shadow-lg ">
                <div className="h-70 sm:h-120 lg:h-150 shrink-0 md:aspect-2/3 rounded-md bg-grey-200 m-3">
                    <Image
                        src={pet?.image?.imgUrl ?? "https://res.cloudinary.com/l0ozosb1/image/upload/v1789613502/no_image.avif"}
                        width={500}
                        height={500}
                        style={{ objectFit: "fill" }}
                        alt={pet?.image?.imgAltText ?? "This is a lost-pet image"}
                        className="h-70 sm:h-120 w-full md:aspect-2/3 lg:h-150 object-cover rounded-md"
                    />
                </div>

                <div className="w-full h-150 p-4">
                    <div className="grid grid-cols-2 h-80">
                        <div className="grid grid-row-6 items-center">
                            {details.map((item) => (
                                <p key={item.label} className="border-b-2"> {item.label}</p>
                            ))}
                        </div>

                        <div className="grid grid-row-6 text-gray-600 items-center">
                            {details.map((item) => (
                                <p key={item.label} className="border-b-2">{item.value}</p>
                            ))}
                        </div>
                    </div>

                    <p className="font-bold mt-2">Description: <span className="text-base tracking-normal text-gray-600 text-wrap">{pet?.description ? pet.description : "N/A"}</span></p>
                </div>
            </div>

            <Collapsible>
                <CollapsibleTrigger className="w-full bg-primary text-primary-foreground hover:bg-primary/80 rounded-md h-15 text-2xl">Contact Owner</CollapsibleTrigger>
                <CollapsibleContent>
                    <p className="bg-white text-center p-5 rounded-b-md">Contact Information: <span className="text-gray-600">{contactEmail}</span></p>
                </CollapsibleContent>
            </Collapsible>
        </div>

    )
}