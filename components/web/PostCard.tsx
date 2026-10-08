import Image from "next/image";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Sex, Species, Status } from "@/generated/prisma/enums";

interface PostCardProps {
    post: {
        id: number;
        createdAt: Date;
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
}

const reportedTime = (createdAt: Date) => {
    const currentDateTime = new Date();

    const sec = Math.floor((currentDateTime.getTime() - createdAt.getTime()) / 1000);
    if (sec < 60) return "just now";

    const min = Math.floor(sec / 60)
    if (min < 60) return `${min} minute${min == 1 ? "" : "s"} ago`;

    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hour${hr == 1 ? "" : "s"} ago`;

    const days = Math.floor(hr / 24);
    if (days < 30) return `${days} day${days == 1 ? "" : "s"} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months == 1 ? "" : "s"} ago`;

    const yr = Math.floor(months / 12);
    return `${yr} year${yr == 1 ? "" : "s"} ago`
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="w-full max-w-lg mx-auto flex flex-row bg-white rounded-md shadow-lg text-base text-nowrap">
            <div className="relative h-70 w-1/2 shrink-0 rounded-l-md 4ounded-tr-none bg-gray-200">
                <Image
                    src={post.pet?.image?.imgUrl ?? ""}
                    width={500}
                    height={500}
                    style={{ objectFit: "fill" }}
                    alt={post.pet?.image?.imgAltText ?? "This is a lost-pet image"}
                    className="w-full h-70 object-cover rounded-l-md rounded-tr-none"
                />
                <p className="absolute right-0 bottom-0 text-gray-400 text-sm font-bold bg-amber-50 rounded-l-xs px-1">ID: {post.pet?.id}</p>
            </div>

            <div className="w-full p-4 items-center border-l-2">
                <div className="grid grid-cols-2 items-center space-x-5">
                    <h1 className="text-2xl text-nowrap font-bold">{post.pet?.name}</h1>
                    <Badge className={`font-bold text-base ml-auto p-2 ${post.pet?.status === "Lost" ? "bg-red-500" : "bg-green-500"}`}>
                        {post.pet?.status}
                    </Badge>
                </div>

                <div className=" text-gray-600 space-y-3 pt-3 pb-3 border-t">
                    <p>{post.pet?.sex} {post.pet?.species}</p>
                    <p>📍 {post.pet?.location.city}, {post.pet?.location.state} {post.pet?.location.zipcode}</p>
                    <p>🗓 {post.pet?.dateLastSeen.toLocaleDateString()}</p>
                    <p>📝 Reported {reportedTime(post.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 pt-4 border-t">
                    <Link className={buttonVariants({ size: "lg" })} href={`/post-details/${post.id}`}>View More</Link>
                </div>
            </div>
        </div>
    )
}