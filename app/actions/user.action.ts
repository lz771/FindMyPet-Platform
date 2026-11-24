"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getAuthenticatedUser() {
    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated) throw new Error("Unauthenticated!");

    const dbUser = await prisma.user.findUnique({
        where: { clerkID: userId },
    });

    if (!dbUser) throw new Error("User not found in the database");
    return dbUser;
}