"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Post } from "./PostCard";
import ActivePostCard from "./ActivePostCard";
import { heapSort } from "@/lib/heapSort";

export interface DashboardCardProps {
    posts: Post[];
    username: string;
}

export default function DashboardCard({ posts, username }: DashboardCardProps) {
    const [dashboardContent, setDashboardContent] = useState("my posts");
    heapSort(posts, "createdAt");

    return (
        <div className="grid grid-flow-col grid-rows-6 bg-gray-50 w-full max-w-6xl h-160 mx-auto my-15 tracking-wider rounded-lg">
            <div className="row-span-full w-70 border flex flex-col bg-white gap-1 px-3 py-2 drop-shadow-md rounded-lg">
                <h1 className="text-center py-8 mb-5 text-3xl bg-primary rounded-lg text-white font-bold">Hi, {username}</h1>
                <div className="h-full flex flex-col mt-10">
                    <Button className="h-20 text-2xl bg-white text-black border border-gray-300 hover:bg-gray-200 transition-colors" onClick={() => setDashboardContent("my posts")}>
                        My Posts
                    </Button>
                </div>
            </div>

            <h1 className="col-span-6 row-span-1 flex items-center justify-center text-4xl  bg-primary text-white font-bold tracking-wider drop-shadow-md rounded-lg">My Posts</h1>
            <div className="col-span-6 row-span-5 bg-white drop-shadow-md rounded-lg mt-5">      
                {dashboardContent === "my posts" &&
                    (<ScrollArea className="h-full w-full rounded-md py-5">      
                        <div className="flex flex-col gap-2">
                            {posts.map((post) => (
                                <div key={post.id} className="my-1">
                                    {<ActivePostCard
                                        id={post.id}
                                        pet={post.pet} />}
                                </div>
                            ))}
                        </div>  
                        <ScrollBar />
                    </ScrollArea>)}
            </div>
        </div>
    )
}