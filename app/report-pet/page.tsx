import CreatePostForm from "@/components/web/CreatePostForm";
import { auth } from "@clerk/nextjs/server"

export default async function ReportPetPage() {

  // Redirect to the sign-in page if the user is not authenticated
  await auth.protect();

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1 className="customized-h1 mt-10">Report Lost Pet Form</h1>
      <p>Submit the form to create a lot pet post on the Lost Pet Gallery</p>
      <CreatePostForm />
    </div>
  )
}
