import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Sex, Species, Status } from "@/generated/prisma/enums";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export interface Post {
    id: number;
    pet: {
        id: number;
        name: string;
        sex: Sex;
        species: Species;
        dateLastSeen: Date;
        status: Status;

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

export default function ActivePostCard({ id, pet }: Post) {
    return (
        <div className="w-full max-w-lg mx-auto flex flex-row bg-white rounded-md shadow-lg text-base text-nowrap">
            <div className="relative h-60 w-1/2 shrink-0 rounded-l-md rounded-tr-none bg-gray-200">
                <Image
                    src={pet?.image?.imgUrl ?? "https://res.cloudinary.com/l0ozosb1/image/upload/v1789613502/no_image.avif"}
                    width={500}
                    height={500}
                    style={{ objectFit: "fill" }}
                    alt={pet?.image?.imgAltText ?? "This is a lost-pet image"}
                    className="w-full h-60 object-cover rounded-l-md rounded-tr-none"
                />
                <p className="absolute right-0 bottom-0 text-gray-400 text-sm font-bold bg-amber-50 rounded-l-xs px-1">ID: {pet?.id}</p>
            </div>

            <div className="w-full p-4 items-center border-l-2">
                <div className="grid grid-cols-2 items-center space-x-5">
                    <h1 className="text-2xl text-nowrap font-bold">{pet?.name}</h1>

                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="ml-auto -translate-y-1 rounded-md">...</Button>} />
                        <DropdownMenuContent>                    
                                <DropdownMenuItem>
                                    <Link href={`/dashboard/edit-post/${id}`}>Edit</Link> 
                                </DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>                       
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className=" text-gray-600 space-y-3 pt-3 border-t">
                    <p>{pet?.status} {pet?.sex} {pet?.species}</p>
                    <p>📍 {pet?.location.city}, {pet?.location.state} {pet?.location.zipcode}</p>
                    <p>🗓 {pet?.dateLastSeen.toLocaleDateString()}</p>
                </div>

                <div className="grid grid-cols-1 pt-5 border-t">
                    <Link className={buttonVariants({ size: "lg" })} href={`/post-details/${id}`}>View More</Link>
                </div>
            </div>
        </div>
    )
}