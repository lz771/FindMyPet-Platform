import { auth } from '@clerk/nextjs/server'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

  // 1. Should be dynamic route, based on the post id
  // 2. Need to implement the logic of access the edit page(implement this after setting up the database):
      // Problem: A sign-in user but want to edit the post that is not belong to them
      // Solution: Get post id, check if the post belongs to the user, if not, pop up a warning message

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  await auth.protect()
  
  return (
    <div>
      <h1>This is the Edit Post Page: {id}</h1>
    </div>
  )
}
