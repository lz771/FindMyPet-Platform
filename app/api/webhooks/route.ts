import { prisma } from '@/lib/prisma'
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

// This file is a webhook handler that handles events send from Clerk, including user.created, user.updated, and user.deleted events
// With the Clerk webhook, the app now able to sync Clerk data to PostgreSQL database
export async function POST(req: NextRequest) {
  let evt: WebhookEvent;

  // Verify the incoming request and store the verified Clerk data
  try {
    evt = await verifyWebhook(req);
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return new Response('Error verifying webhook', { status: 400 });
  }

  // Do something with payload or the event

  const eventType = evt.type;
  const { id } = evt.data;

  // Save the user to the PostgreSQL database if this is a user.created event
  if (eventType === "user.created") {
    const { username } = evt.data;

    if (username && id) {
      try {
        const createUser = await prisma.user.create({
          data: {
            clerkID: id,
            username,
          }
        });
      } catch (error) {
        console.log("Error: Failed to create user in the database:", error);
        return new Response("Error: Failed to create user in the database", { status: 500 });
      }
    } else {
      console.log("Error: Missing Clerk user ID or username");
      return new Response("Error: Missing Clerk user ID or username", { status: 500 });
    }
  }

  // Update the user in the PostgreSQL database if this is a user.updated event
  if (eventType === "user.updated") {
    const { username } = evt.data;
    const dbUser = await prisma.user.findUnique({
      where: { clerkID: id },
    });

    if (!dbUser) {
      console.log("Error: User not found in the database");
      return new Response("Error: User not found in the database", { status: 500 });
    }

    try {
      if (username !== null && dbUser.username !== username) {
        const updateUser = await prisma.user.update({
          where: { clerkID: id },
          data: { username },
        });
      }
    } catch (error) {
      console.log("Error: Failed to update user in the database:", error);
      return new Response("Error: Failed to update user in the database", { status: 500 });
    }
  }

  // Delete the user in the PostgreSQL database if this is a user.deleted event
  if (eventType === "user.deleted") {
    const dbUser = await prisma.user.findUnique({
      where: { clerkID: id },
    });

    try {
      if (dbUser) {
        const deletedUser = await prisma.user.delete({
          where: { id: dbUser.id }
        });
      }
    } catch (error) {
      console.log("Error: Failed to delete user in the database:", error);
      return new Response("Error: Failed to delete user in the database", { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 })
}