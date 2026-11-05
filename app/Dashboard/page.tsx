import { auth } from "@clerk/nextjs/server"
import { fetchPostsByClerkId } from "../actions/post.action";
import { Post } from "@/components/web/PostCard";
import DashboardCard from "@/components/web/DashboardCard";

// Display user's posts, and manage posts
export default async function DashboardPage() {
  const { isAuthenticated, userId, redirectToSignIn } = await auth();

  // Redirect to the sign-in page if the user is not authenticated
  if (!isAuthenticated) return redirectToSignIn();

  // Fetch user's posts from PostgreSQL database using Clerk ID
  let posts: Post[];
  let username: string;

  try {
    const result = await fetchPostsByClerkId(userId);
    posts = result.posts;
    username = result.username;
  } catch (error) {
    console.log("Error: Failed to fetch posts by Clerk Id:", error);
    return <h1 className="text-red-500">Error: Failed to fetch posts, contact us for details</h1>;
  }

  return (
    <div className="w-full h-full py-5 mx-auto">
      <DashboardCard
        posts={posts}
        username={username} />
    </div>
  )
}
