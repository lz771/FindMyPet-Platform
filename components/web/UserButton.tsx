"use client"
import Link from "next/link"
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useClerk, UserAvatar, useUser } from "@clerk/nextjs";
import { LogOutIcon, UserIcon } from "lucide-react";

export default function UserButon() {
    const { signOut } = useClerk();
    const { user } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="link" className="text-white text-lg font-semibold link-hover-effect"><UserAvatar />Hi, {user?.username}</Button>} />
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <UserIcon />
                    <Link href="/dashboard" className="text-nowrap">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <LogOutIcon />
                    <Link href="/" onClick={() => signOut()}>Log Out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}