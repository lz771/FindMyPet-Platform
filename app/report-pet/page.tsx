import CreatePostForm from "@/components/web/CreatePostForm";
import { auth } from "@clerk/nextjs/server"

export default async function ReportPetPage() {

  // Redirect to the sign-in page if the user is not authenticated
  await auth.protect();

  return (
      <CreatePostForm />
  )
}
