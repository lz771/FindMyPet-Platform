import { auth } from "@clerk/nextjs/server"

/*
  1. Render the page(active posts) based on the user ID
*/


export default async function DashboardPage() {

  // Redirect to the sign-in page if the user is not authenticated
  await auth.protect()

  return (
    <div>
      <h1>This is the Dashboard Page</h1>
    </div>
  )
}
