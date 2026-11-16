import { fetchPostByClerkAndPostIds } from '@/app/actions/post.action';
import EditPostForm from '@/components/web/EditPostForm';
import { PostDetails } from '@/components/web/PostDetailsCard';
import { auth } from '@clerk/nextjs/server'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { isAuthenticated, userId, redirectToSignIn } = await auth();

  // Redirect to the sign-in page if the user is not authenticated
  if (!isAuthenticated) return redirectToSignIn();

  // Get the post by post id & Clerk user id
  let pet: PostDetails["pet"];
  let contactEmail: PostDetails["contactEmail"];
  try {
    const result = await fetchPostByClerkAndPostIds(userId, Number(id));
    pet = result.post.pet;
    contactEmail = result.post.contactEmail;
  } catch (error) {
    console.log("Error: Failed to fetch post by Clerk Id and post Id: ", error);
    return <h1 className="text-red-500">Error: Failed to fetch post information, contact us for details</h1>;
  }

  return (
    <div>
      <EditPostForm
        id={Number(id)}
        pet={pet}
        contactEmail={contactEmail}
      />
    </div>
  )
}
