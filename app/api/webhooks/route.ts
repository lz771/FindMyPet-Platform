import { prisma } from '@/lib/prisma'
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

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
  if (evt.type === "user.created") {
    const { username } = evt.data;

    try {
      const newUser = await prisma.user.create({
        data: {
          clerkID: id,
          username,
        }
      });
    } catch (error) {
      console.log("Error: Failed to create user in the database:", error);
      return new Response("Error: Failed to create user in the database", { status: 500 });
    }
  }

  // Update the user in the PostgreSQL database if this is a user.updated event
  if (evt.type === "user.updated") {
    const { username } = evt.data;
    const dbUser = await prisma.user.findUnique({
      where: { clerkID: id },
    });

    if (!dbUser) {
      console.log("Error: User not found in the database");
      return new Response("Error: User not found in the database", { status: 500 });
    }

    try {
      if (dbUser.username !== username) {
        const updatedUser = await prisma.user.update({
          where: { clerkID: id },
          data: { username: username },
        });
      }
    } catch (error) {
      console.log("Error: Failed to update user in the database:", error);
      return new Response("Error: Failed to update user in the database", { status: 500 });
    }
  }

  // Delete the user in the PostgreSQL database if this is a user.deleted event
  if (evt.type === "user.deleted") {
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