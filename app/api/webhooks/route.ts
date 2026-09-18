import { prisma } from '@/lib/prisma'
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  let evt: WebhookEvent

  // Verify the incoming request and store the verified Clerk data
  try {
    evt = await verifyWebhook(req)
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }

  // 500 error send from server side
  // Do something with payload
  // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  // console.log('Webhook payload:', evt.data)
  const eventType = evt.type
  const { id } = evt.data //get userID from event data

  // Save the user to PostgreSQL database if this is a user.created event
  if (evt.type === 'user.created') {
    const { username, first_name } = evt.data
    const name = username ? username : first_name
    try {
      const newUser = await prisma.user.create({
        data:{
          clerkID: id,
          username: name,
        }
      });
    } catch (err) {

    }

  }




  return new Response('Webhook received', { status: 200 })

}