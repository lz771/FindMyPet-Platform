import { auth } from "@clerk/nextjs/server"

export default async function ReportPetPage() {

  // Redirect to the sign-in page if the user is not authenticated
  await auth.protect()
  
  return (
    <div>
      <h1>Report Lost Pet Form</h1>
    </div>
  )
}
